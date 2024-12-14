import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";

function Navigation(props) {
  return (
    <nav className="flex items-center justify-between py-8 px-12">
      <div className="flex gap-x-16">
        <a className="font-semibold text-3xl" href="/">
          Mebius
        </a>
        <div className="flex items-center gap-4">
          <a href="/">Home</a>
          <a href="/shop">Shop</a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {!props.name && (
          <div className="flex items-center gap-4">
            <Link
              to="/sign-in"
              className="text-primary px-2 py-1 rounded-md hover:bg-slate-200 hover:border border-slate-400"
            >
              Sign In
            </Link>
            <Link to="/sign-up" className=" text-primary bg-slate-800 px-2 py-1 rounded-md text-white hover:bg-black">
              Sign Up
            </Link>
          </div>
        )}
        {props.name &&
          (
            <div className="flex gap-6">
              <div className="flex items-center gap-1">
                <a href="/cart" className="flex items-center gap-4 relative">
                  <div className="flex items-center gap-2">
                    <p className="text-lg">{props.cartCount}</p>
                    <ShoppingCart />
                    Cart
                  </div>
                </a>
              </div>
              <div className="flex items-center gap-2">
                <p>Hi, {props.name}</p>
              </div>
            </div>
          )
        }
      </div>
    </nav>
  );
}

export default Navigation;