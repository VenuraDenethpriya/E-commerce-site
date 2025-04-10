import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useCallback } from "react";

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const BASE_URL = import.meta.env.VITE_BASE_URL;

const CheckoutForm = ({ orderId }) => {
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch(`${BASE_URL}api/payments/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId }),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, [orderId]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutForm;

// import { loadStripe } from "@stripe/stripe-js";
// import {
//   EmbeddedCheckout,
//   EmbeddedCheckoutProvider,
// } from "@stripe/react-stripe-js";
// import { useCallback } from "react";

// const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
// const BASE_URL = import.meta.env.VITE_BASE_URL;
// const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

// const CheckoutForm = ({ orderId }) => {
//   const fetchClientSecret = useCallback(() => {
//     if (!orderId) {
//       throw new Error("Missing orderId");
//     }

//     return fetch(`${BASE_URL}/api/payments/create-checkout-session`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ orderId }),
//     })
//       .then(async (res) => {
//         if (!res.ok) {
//           const text = await res.text();
//           throw new Error(`Server error: ${res.status} - ${text}`);
//         }

//         const data = await res.json();
//         if (!data.clientSecret) {
//           throw new Error("Missing clientSecret in response");
//         }
//         return data.clientSecret;
//       })
//       .catch((error) => {
//         console.error("Stripe fetchClientSecret error:", error.message);
//         throw error;
//       });
//   }, [orderId]);

//   const options = { fetchClientSecret };

//   return (
//     <div id="checkout">
//       <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
//         <EmbeddedCheckout />
//       </EmbeddedCheckoutProvider>
//     </div>
//   );
// };

// export default CheckoutForm;
