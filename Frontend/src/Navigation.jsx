import { ShoppingCart } from "lucide-react";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5"; // Import menu icons
import { Button } from "./components/ui/button";

function Navigation() {
  const save = useSelector((state) => state.save.value);
  const cart = useSelector((state) => state.cart.value);
  const { isLoaded, isSignedIn, user } = useUser();

  const getCartQuantity = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (user?.publicMetadata?.role !== "admin") {
    return (
      <nav className="flex items-center justify-between py-4 px-8 sm:px-12">
        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-x-8 sm:gap-x-16">
            <Link to="/" className="font-semibold text-2xl sm:text-3xl">
            TechNest
            </Link>
            <div className="hidden sm:flex items-center gap-4">
              <Link to="/">Home</Link>
              <Link to="/shop">Shop</Link>
              <Link to="/orders">My Orders</Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="sm:hidden flex items-center gap-4">
          <button onClick={toggleMenu} className="text-2xl">
            {isMenuOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`sm:hidden absolute top-10 left-0 w-full bg-white shadow-md py-4 px-8 flex flex-col items-start space-y-4 transition-all duration-300 z-50 ${isMenuOpen ? "block" : "hidden"
            }`}
        >
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/shop" onClick={toggleMenu}>Shop</Link>
          <Link to="/orders" onClick={toggleMenu}>My Orders</Link>
        </div>

        {/* Auth & Cart Section */}
        <div className="flex items-center gap-4 sm:gap-8">
          <SignedOut>
            <div className="flex items-center gap-4">
              <Link to="/sign-in" className="text-primary px-2 py-1 rounded-md hover:bg-slate-200 hover:border border-slate-400">
                Sign In
              </Link>
              <Link to="/sign-up" className="text-primary bg-slate-800 px-2 py-1 rounded-md text-white hover:bg-black">
                Sign Up
              </Link>
            </div>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-4">
              {save.length === 0 ? (
                <Link to="/likeproducts">
                  <IoMdHeartEmpty className="text-2xl hover:text-red-500" />
                </Link>
              ) : (
                <Link to="/likeproducts">
                  <FaHeart className="text-red-400 text-2xl hover:text-red-500" />
                </Link>
              )}
              <Link to="/shop/cart" className="relative flex items-center gap-4">
                <ShoppingCart />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white rounded-full px-2 text-xs">
                    {getCartQuantity()}
                  </span>
                )}
              </Link>
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </nav>
    );
  }

  return (
    <nav className="flex items-center justify-between py-4 px-8 sm:px-12">
      <div className="flex items-center gap-x-8 sm:gap-x-16">
        <Link to="/" className="font-semibold text-2xl sm:text-3xl">
          TechNest
        </Link>
        <div className="hidden sm:flex items-center gap-4">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
        </div>
      </div>
      <div className="flex items-center gap-4 sm:gap-8">
        <SignedOut>
          <div className="flex items-center gap-4">
            <Link to="/sign-in" className="text-primary px-2 py-1 rounded-md hover:bg-slate-200 hover:border border-slate-400">
              Sign In
            </Link>
            <Link to="/sign-up" className="text-primary bg-slate-800 px-2 py-1 rounded-md text-white hover:bg-black">
              Sign Up
            </Link>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-4">
            <Link className="hidden md:block" to="/admin"><Button variant="outline" size="sm">Admin</Button></Link>
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}

export default Navigation;
