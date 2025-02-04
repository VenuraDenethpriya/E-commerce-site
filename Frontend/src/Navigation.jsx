import { ShoppingCart } from "lucide-react";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

function Navigation() {
  const save = useSelector((state) => state.save.value);
  const cart = useSelector((state) => state.cart.value);

  const getCartQuantity = () => {
    let count = 0;
    cart.forEach((item) => {
      count += item.quantity;
    });
    return count;
  };

  return (
    <nav className="flex items-center justify-between py-4 px-8 sm:px-12">
      <div className="flex items-center gap-x-8 sm:gap-x-16">
        <Link to="/" className="font-semibold text-2xl sm:text-3xl">
          Mebius
        </Link>
        <div className="hidden sm:flex items-center gap-4">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
        </div>
      </div>
      <div className="flex items-center gap-4 sm:gap-8">
        <SignedOut>
          <div className="flex items-center gap-4">
            <Link
              to="/sign-in"
              className="text-primary px-2 py-1 rounded-md hover:bg-slate-200 hover:border border-slate-400"
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className="text-primary bg-slate-800 px-2 py-1 rounded-md text-white hover:bg-black"
            >
              Sign Up
            </Link>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-4">
            {/* Heart Icon (like button) */}
            {save.length === 0 ? (
              <Link to="/likeproducts">
                <IoMdHeartEmpty className="text-2xl hover:text-red-500" />
              </Link>
            ) : (
              <Link to="/likeproducts">
                <FaHeart className="text-red-400 text-2xl hover:text-red-500" />
              </Link>
            )}

            {/* Shopping Cart Icon */}
            <Link to="/shop/cart" className="relative flex items-center gap-4">
              <div className="flex items-center gap-2">
                <ShoppingCart />
                {cart.length > 0 && (
                  <sup>
                    <p className="absolute sm:right-0 bottom-0 bg-black text-white rounded-full py-2 px-1 right-1">
                      {getCartQuantity()}
                    </p>
                  </sup>
                )}
              </div>
            </Link>

            {/* User Button */}
            <div className="flex items-center gap-2">
              <UserButton />
            </div>
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}

export default Navigation;
