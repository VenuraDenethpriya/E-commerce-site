import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ProductCards from "@/ProductCards";
import { useSelector } from "react-redux";
import { Link } from "react-router";

function LikeProducts() {
    const save = useSelector((state) => state.save.value)
    return (
        <main className="px-12 py-8">
            <h2 className="text-2xl font-semibold">Your Faverite Products</h2>
            <Separator className="mt-2" />
            <div className="flex items-center gap-8">
                {
                    save.length === 0 &&
                    <div>
                        <p className="text-lg pb-6 pt-6 text-gray-600">
                            You haven't liked any products yet.
                        </p>

                        <Link to='/shop'><Button>Countinu Shoping</Button></Link>
                        
                    </div>

                }
                <ProductCards products={save} />
            </div>
        </main>


    );
}

export default LikeProducts;