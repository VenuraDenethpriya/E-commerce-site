import { Minus, Plus } from "lucide-react";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { useState } from "react";

function ProductCard(props) {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount(count + 1);
    }

    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    }
    return ( 
        <Card className="w-fit cursor-pointer">
            <div className="h-60 bg-card rounded-lg p-4 relative justify-center">
                <img src={props.image} alt="ProductImage" className="block"/>
            </div>
            <div className="flex justify-between items-center mt-4 px-4">
                <div>
                    <h2 className="font-bold tex-2xl">{props.name}</h2>
                    <span className="font-semibold">${props.price}</span>
                </div>
                <div className="flex text-sm gap-2 cursor-pointer">
                    <div className="bg-slate-100 rounded-lg" onClick={handleDecrement}>
                        <Minus className="w-4"/>
                    </div>
                    <div className="border-2 px-1 rounded-sm">
                        <p>{count}</p>
                    </div>
                    <div className="bg-slate-100 rounded-lg" onClick={handleIncrement}>
                        <Plus className="w-4"/>
                    </div>
                </div>
            </div>
            <div className="px-4 mt-2">
                <p className="text-sm">
                    {props.description}
                </p>
                <div className="mt-1 py-4 gap-2 flex">
                    <div>
                        <Button variant="outline" className="border-2 border-black hover:bg-black hover:text-white">Add to Cart</Button>
                    </div>
                    <div>
                        <Button className="hover:scale-110 transition-transform duration-100 ease-in-out">Buy Now</Button>
                    </div>
                </div>
            </div>
        </Card>
     );
}

export default ProductCard;