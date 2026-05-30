import { Request, Response } from "express";
import util from "util";
import stripe from "../infrastructure/stripe";
import Order from "../infrastructure/schemas/Order";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
const FRONTEND_URL = process.env.FRONTEND_URL as string;

async function fulfillCheckout(sessionId: string) {
  // Set your secret key. Remember to switch to your live secret key in production.
  // See your keys here: https://dashboard.stripe.com/apikeys
  console.log("Fulfilling Checkout Session " + sessionId);

  // TODO: Make this function safe to run multiple times,
  // even concurrently, with the same session ID

  // TODO: Make sure fulfillment hasn't already been
  // peformed for this Checkout Session

  // Retrieve the Checkout Session from the API with line_items expanded
  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });
  console.log(
    util.inspect(checkoutSession, false, null, true /* enable colors */)
  );

  const order = await Order.findById(checkoutSession.metadata?.orderId);
  if (!order) {
    throw new Error("Order not found");
  }

  if (order.paymentStatus !== "PENDING") {
    throw new Error("Payment is not pending");
  }

  if (order.orderStatus !== "PENDING") {
    throw new Error("Order is not pending");
  }

  // // Check the Checkout Session's payment_status property
  // // to determine if fulfillment should be peformed
  // if (checkoutSession.payment_status !== "unpaid") {
  //   // TODO: Perform fulfillment of the line items
  //   // TODO: Record/save fulfillment status for this
  //   // Checkout Session
  //   await Order.findByIdAndUpdate(order._id, {
  //     paymentStatus: "PAID",
  //     orderStatus: "CONFIRMED",
  //   });
  // }
  if (checkoutSession.payment_status === "paid") {
    await Order.findByIdAndUpdate(order._id, {
      paymentStatus: "PAID",
      orderStatus: "CONFIRMED",
    });
  }
}

export const handleWebhook = async (req: Request, res: Response) => {
  const payload = req.body;
  const sig = req.headers["stripe-signature"] as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    console.log("Webhook event received:", event.type);
    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      await fulfillCheckout(event.data.object.id);

      res.status(200).send();
      return;
    }
  } catch (err) {
    // @ts-ignore
    res.status(400).send(`Webhook Error: ${err.message}`);
    console.log(err);
    return;
  }
};

export const createCheckoutSession = async (req: Request, res: Response) => {
  const orderId = req.body.orderId;
  console.log("body", req.body);
  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    line_items: order.items.map((item) => ({
      price: item.product.stripePriceId as string,
      quantity: item.quantity,
    })),
    mode: "payment",
    return_url: `${FRONTEND_URL}/shop/complete?session_id={CHECKOUT_SESSION_ID}`,
    metadata: {
      orderId: req.body.orderId,
    },
  });
  res.send({ clientSecret: session.client_secret });
};

export const retrieveSessionStatus = async (req: Request, res: Response) => {
  const checkoutSession = await stripe.checkout.sessions.retrieve(
    req.query.session_id as string
  );

  const order = await Order.findById(checkoutSession.metadata?.orderId).populate({
    path: "addressId",
    model: "Address"
});
  if (!order) {
    throw new Error("Order not found");
  }

  res.status(200).json({
   _id: order._id,
  paymentStatus: checkoutSession.status,
  customer_email: checkoutSession.customer_details?.email,
  orderStatus: order.orderStatus,
  items: order.items,
  addressId: order.addressId,
  });
};