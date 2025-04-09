import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./lib/features/cartSlice";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { addToSave } from "./lib/features/saveSlice";
import { addToBuy } from "./lib/features/buySlice";
import { useUser } from "@clerk/clerk-react";
import { Label } from "./components/ui/label";

function ProductCard(props) {
    const { isSignedIn } = useUser();
    const save = useSelector((state) => state.save.value);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () => {
        if (!isSignedIn) {
            navigate("/sign-in");
        }
        dispatch(addToCart({
            _id: props._id,
            name: props.name,
            price: props.price,
            image: props.image,
            description: props.description,
            stock: props.stock
        }));
    };

    const handleBuyClick = () => {
        dispatch(addToBuy({
            _id: props._id,
            name: props.name,
            price: props.price,
            image: props.image,
            description: props.description,
            stock: props.stock
        }));
    };

    const handleSaveClick = () => {
        dispatch(addToSave({
            _id: props._id,
            name: props.name,
            price: props.price,
            image: props.image,
            description: props.description,
            stock: props.stock
        }));
    };

    const handleProductClick = (e) => {
        e.preventDefault();
        navigate(`/product/${props._id}`);
    };

    return (
        <Card className="w-fit cursor-pointer relative p-4">
            <div className="absolute top-2 left-2 text-black text-xs font-semibold p-1 rounded-full z-50">
                {
                    props.stock > 0 ? (
                        null
                    ) : (
                        <Label className="text-red-500 text-xs">Out of Stock</Label>
                    )
                }
            </div>
            <div className="absolute top-2 right-2 z-50">
                {save.some((item) => item._id === props._id) ? (
                    <FaHeart
                        onClick={handleSaveClick}
                        className="text-red-400 text-2xl hover:text-red-500 cursor-pointer"
                    />
                ) : (
                    <IoMdHeartEmpty
                        onClick={handleSaveClick}
                        className="text-2xl hover:text-red-500 cursor-pointer"
                    />
                )}
            </div>

            <div className="flex justify-center">
                <div className="md:h-60 h-30 bg-card rounded-lg p-4 relative">
                    <img src={props.image} alt="ProductImage" className="h-full w-full object-contain" onClick={handleProductClick} />
                </div>
            </div>

            <div className="mt-4 px-4" onClick={handleProductClick}>
                <h2 className="font-bold text-xl">{props.name}</h2>
                <span className="font-semibold text-lg">LKR {props.price}</span>
            </div>

            <div className="px-4 mt-2">
                <p className="text-sm text-justify line-clamp-3">{props.description}</p>
                <div className="mt-4 flex gap-2">
                    <Button variant="outline" className="border-2 border-black hover:bg-black hover:text-white" onClick={handleClick}>
                        Add to Cart
                    </Button>
                    <Link to="shop/cart/checkout">
                        <Button className="hover:scale-110 transition-transform duration-500 ease-in-out" onClick={handleBuyClick}>
                            Buy Now
                        </Button>
                    </Link>
                </div>
            </div>
        </Card>
    );
}

export default ProductCard;
