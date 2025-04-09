import { Link } from "react-router";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import EditProduct from "./EditProduct";
import { useDeleteProductMutation } from "./lib/api";
import { toast } from "sonner";

function AdminProductCard(props) {
    const [deleteProduct] = useDeleteProductMutation()


    const handleDeleteClick = async (e) => {
        e.preventDefault();
        try {
            const id = props.id;
            const result = await deleteProduct(id);

            if (result.error) {
                toast.error("Failed to delete product, error: " + result.error);
            } else {
                toast.success("Product deleted successfully");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (err) {
            console.log(err);
            toast.error("Failed to delete product");
        }
    }
    return (

        <Card className="w-fit cursor-pointer">
            <div className="flex justify-between">
                <div className="h-60 bg-card rounded-lg relative justify-center">
                    <img src={props.image} alt="ProductImage" className="block" />
                </div>

            </div>
            <div className="flex justify-between items-center mt-4 px-4">
                <div>
                    <h2 className="font-bold tex-2xl">{props.name}</h2>
                    <span className="font-semibold">LKR {props.price}</span>
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
                <p className="text-sm line-clamp-3">
                    {props.description}
                </p>
                <p>Stock: 
                    <span className="text-sm">
                         {
                            props.stock != 0 ? <span className="ml-2">Qty {props.stock}</span> : <span className="text-red-500">Out of Stock</span>
                        }
                    </span>
                </p>
                <div className="mt-1 py-4 gap-2 flex">
                    <div>
                        <Button variant="outline" className="border-2 border-black hover:bg-black hover:text-white" >
                            <EditProduct
                                name={props.name}
                                price={props.price}
                                description={props.description}
                                image={props.image}
                                category={props.category}
                                id={props.id}
                                stock={props.stock}
                            />
                        </Button>
                    </div>
                    <Link to='shop/cart/checkout'>
                        <Button variant="destructive" onClick={handleDeleteClick}>Delete</Button>
                    </Link>
                </div>
            </div>
        </Card>
    );
}

export default AdminProductCard;