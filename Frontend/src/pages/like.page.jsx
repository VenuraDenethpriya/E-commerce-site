import ProductCards from "@/ProductCards";
import { useSelector } from "react-redux";

function LikeProducts() {
    const save = useSelector((state) => state.save.value)
    return ( 
        <div className="mt-8 ml-12 flex items-center gap-8">
            <ProductCards products={save} />
        </div>
        
     );
}

export default LikeProducts;