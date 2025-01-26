import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/home.page.jsx";
import SignInPage from "./pages/sign-in.page.jsx";
import SignUpPage from "./pages/sign-up.page.jsx";
import { store } from "@/lib/store";
import { Provider } from "react-redux";
import { ClerkProvider } from "@clerk/clerk-react";
import CartPage from "./pages/cart.page";
import RootLayout from "./layouts/root.layout";
import ShopPage from "./pages/shop.page";
import Accountpage from "./pages/account.page";
import PurchasePage from "./pages/parchase.page";
import LikeProducts from "./pages/like.page";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById("root")).render(

  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Provider store={store}>
        <BrowserRouter>
        <Routes>
          <Route element={<RootLayout/>}>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/cart" element={<CartPage />} />
            <Route path="/account" element={<Accountpage />} />
            <Route path="/shop/cart/purchase" element={<PurchasePage />} />
            <Route path="/likeproducts" element={<LikeProducts />} />
          </Route>
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
      </Routes>
        </BrowserRouter>
      </Provider>
    </ClerkProvider>
  </StrictMode>
);