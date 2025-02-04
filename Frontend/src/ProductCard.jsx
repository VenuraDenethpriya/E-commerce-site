//import { Minus, Plus } from "lucide-react";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./lib/features/cartSlice";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router";
import { addToSave } from "./lib/features/saveSlice";
import { addToBuy } from "./lib/features/BuySlice";

function ProductCard(props) {
    //const count = useSelector((state) => state.counter.value)
    const save = useSelector((state) => state.save.value)
    const dispatch = useDispatch()


    /*const handleIncrement = () => {
        count(count + 1);
    }

    const handleDecrement = () => {
        if (count > 0) {
            count(count - 1);
        }
    }
    */
    const handleClick = (e) => {
        dispatch(addToCart({
            _id: props._id,
            name: props.name,
            price: props.price,
            image: props.image,
            description: props.description,
        })
        )
    }

    const handleBuyClick = (e) => {
        dispatch(addToBuy({
            _id: props._id,
            name: props.name,
            price: props.price,
            image: props.image,
            description: props.description,
        }))
    }

    const handleSaveClick = (e) => {
        dispatch(addToSave({
            _id: props._id,
            name: props.name,
            price: props.price,
            image: props.image,
            description: props.description,
        })
        )

    }
    return (
        <Card className="w-fit cursor-pointer">
            <div className="flex justify-between">
                <div className="h-60 bg-card rounded-lg p-4 relative justify-center">
                    <img src={props.image} alt="ProductImage" className="block" />
                </div>
                {
                    save.some((item) => item._id === props._id) ? (
                        <div className="p-4">
                            <FaHeart
                                onClick={handleSaveClick}
                                className="text-red-400 text-2xl hover:text-red-500"
                            />
                        </div>
                    ) : (
                        <div className="p-4">
                            <IoMdHeartEmpty
                                onClick={handleSaveClick}
                                className="text-2xl hover:text-red-500"
                            />
                        </div>
                    )
                }

            </div>
            <div className="flex justify-between items-center mt-4 px-4">
                <div>
                    <h2 className="font-bold tex-2xl">{props.name}</h2>
                    <span className="font-semibold">${props.price}</span>
                </div>
                {/*<div className="flex text-sm gap-2 cursor-pointer">
                    <div className="bg-slate-100 rounded-lg" onClick={handleDecrement}>
                        <Minus className="w-4" />
                    </div>
                    <div className="border-2 px-1 rounded-sm">
                        <p>{count}</p>
                    </div>
                    <div className="bg-slate-100 rounded-lg" onClick={handleIncrement}>
                        <Plus className="w-4" />
                    </div>
                </div>*/}
            </div>
            <div className="px-4 mt-2">
                <p className="text-sm">
                    {props.description}
                </p>
                <div className="mt-1 py-4 gap-2 flex">
                    <div>
                        <Button variant="outline" className="border-2 border-black hover:bg-black hover:text-white" onClick={handleClick}>Add to Cart</Button>
                    </div>
                    <Link to= 'shop/cart/checkout'>
                        <Button className="hover:scale-110 transition-transform duration-100 ease-in-out" onClick={handleBuyClick}>Buy Now</Button>
                    </Link>
                </div>
            </div>
        </Card>
    );
}

export default ProductCard;