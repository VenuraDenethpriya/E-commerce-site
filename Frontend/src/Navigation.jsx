import { ShoppingCart } from "lucide-react";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
function Navigation() {
  const save = useSelector((state) => state.save.value)
  const user = ""
  /*const [cart, setCart] = useState([])

  const handleAddToCart = (product) => {
    const foundItem = cart.find((item) => item.product._id === product._id);
    if (foundItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.product._id === product._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
      return;
    }
    setCart([...cart, { product: product, quantity: 1 }]);
  };*/
  const cart = useSelector((state) => state.cart.value);

  const getCartQuantity = () => {
    let count = 0;
    cart.forEach((item) => {
      count += item.quantity;
    });
    return count;
  };

  return (
    <nav className="flex items-center justify-between py-8 px-12">
      <div className="flex gap-x-16">
        <Link to='/' className="font-semibold text-3xl" href="/">
          Mebius
        </Link>
        <div className="flex items-center gap-4">
          <Link to='/'>Home</Link>
          <Link to='/shop'>Shop</Link>
        </div>
      </div>
      <SignedOut>
        <div className="flex items-center gap-4">
          <Link
            to="/sign-in"
            className="text-primary px-2 py-1 mr-4 rounded-md hover:bg-slate-200 hover:border border-slate-400"
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
        <div className="flex items-center">
          <div className="flex gap-4">
            {
              save.length === 0 ? <div>
                <Link to="/likeproducts"><IoMdHeartEmpty className="text-2xl hover:text-red-500" /></Link>
              </div> : <div className=" ">
                <Link to="/likeproducts"><FaHeart className="text-red-400 text-2xl hover:text-red-500" /></Link>
              </div>
            }

            <Link to="/shop/cart" className="flex items-center gap-4 relative">
              <div className="flex items-center gap-2">
                <ShoppingCart />
                {
                  cart.length === 0 ? <div>
                    <sup><p></p></sup>
                  </div> : <sup><p className="absolute right-0 bottom-0 bg-black text-white py-2 px-2 rounded-full">{getCartQuantity()}</p></sup>
                }
                

              </div>
            </Link>
            <div className="flex items-center gap-2">
              <UserButton />
            </div>
          </div>
        </div>
      </SignedIn>

    </nav>
  );
}

export default Navigation;