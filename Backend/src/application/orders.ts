import { NextFunction, Request, Response } from "express";
import ValidationError from "../domain/errors/validation-error";
import Order from "../infrastructure/schemas/Order";
import { getAuth } from "@clerk/express";
import NotFoundError from "../domain/errors/not-found-error";
import Address from "../infrastructure/schemas/Address";
import { OrderDTO } from "../domain/dto/order";
import Product from "../infrastructure/schemas/Product";



export const createOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = OrderDTO.safeParse(req.body);
        if (!result.success) {
            console.error("Zod validation error:", result.error.format());
            throw new ValidationError("Invalid order data");
        }

        const { userId } = getAuth(req);
        const address = await Address.create({
            ...result.data.ShippingAddress,
        })

        const items = await Promise.all(
            result.data.items.map(async (item) => {
              const product = await Product.findById(item.product._id);
              console.log(product);
      
              return {
                ...item,
                product: { ...item.product, stripePriceId: product?.stripePriceId },
              };
            })
          );
      
          console.log(items);

        const newOrder = await Order.create({
            userId,
            //items: result.data.items,
            items: items,
            addressId: address._id,
        });
        res.status(201).json({ orderId: newOrder._id });
    } catch (error) {
        next(error);
    }
};

export const getOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id;
        const order = await Order.findById(id).populate({
            path: "addressId",
            model: "Address",
        }).populate({
            path: "items"
        })
        if (!order) {
            throw new NotFoundError("Order not found");
        }
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};

export const getOrdersByUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userId } = getAuth(req);
        console.log("Fetching orders for user:", userId);
        const orders = await Order.find({ userId }).populate({
            path: "addressId",
            model: "Address",
        });
        if (!orders) {
            throw new NotFoundError("No orders found for this user");
        }
        res.status(200).json(orders);

    } catch (error) {
        next(error);
    }
}

export const getOrders = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const orders = await Order.find().populate({
            path: "addressId",
            model: "Address"
        });
        if (!orders) {
            throw new NotFoundError("No orders found");
        }
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }

}

export const updateOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
        try {
            const id = req.params.id;
            const order = await Order.findByIdAndUpdate(id, req.body);

            if (!order) {
                throw new NotFoundError("Order not found");
            }
            res.status(200).send();
            return;
        } catch (error) {
            next(error);
        }
    }