import { ShoppingCart } from "lucide-react";

function Navigation(props){
    return(
        <nav className="flex items-center justify-between p-8 mx-16">
            <div className="flex gap-x-16">
                <a href="" className="font-semibold text-3xl">Mebius</a>
                    
                <div className="flex items-center gap-4">
                    <a  className="" href="">Home</a>
                    <a href="">Shop</a>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div>
                    <a href="" className="flex items-center gap-4 relative">
                        <p className="text-lg">{props.cardCount}</p>
                        <div className="flex items-center gap-2">
                            <ShoppingCart />
                            Cart
                        </div>
                    </a>
                </div>
                    {
                        props.name == "" ? 
                        <div>
                            <div className="font-medium pl-8">
                                <a className="pr-4" href="">Sign In</a>
                                <a href="">Sign Up</a>
                            </div>
                        </div> 
                        : <p><b>Hi</b>,{props.name}</p>
                    }
            </div>
        </nav>
    );
}
export default Navigation