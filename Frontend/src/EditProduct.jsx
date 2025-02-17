import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUpdateProductMutation } from "./lib/api"
import { toast } from "sonner"
import { useNavigate } from "react-router";
import { useState } from "react"

function EditProduct(props) {
    const navigate = useNavigate()
    const [updateProduct, { isSuccess, isError, error }] = useUpdateProductMutation()

    const [name, setName] = useState(props.name)
    const [description, setDescription] = useState(props.description)
    const [price, setPrice] = useState(props.price)
    const [image, setImage] = useState(props.image)
    const [categoryId, setCategoryId] = useState(props.category)
    const [stock, setStock] = useState(props.stock)
    const id = props.id


    const handleEditClick = async (e) => {
        e.preventDefault()
        try {
            const result = await updateProduct({
                id: id,
                body: { name, description, price, image, categoryId, stock }
            })
            
            if (result.error) {
                toast.error("Failed to update product: " + result.error.message);
            } else {
                toast.success("Product updated successfully");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (error) {
            toast.error("Failed to update product: " + error.message);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button>Edit</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit product</DialogTitle>
                    <DialogDescription>
                        Make changes to selected product here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="productname" className="text-right">
                            Product Name
                        </Label>
                        <Input
                            id="productname"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            defaultValue={props.name}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                            Price
                        </Label>
                        <Input
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            defaultValue={props.price}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Input
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            defaultValue={props.description}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stock" className="text-right">
                            Stock
                        </Label>
                        <Input
                            id="stock"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            defaultValue={props.stock}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">
                            Image URL
                        </Label>
                        <Input
                            id="image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            defaultValue={props.image}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="categoryId" className="text-right">
                            Category ID
                        </Label>
                        <Input
                            id="categoryId"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            defaultValue={props.category}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleEditClick}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    );
}

export default EditProduct;