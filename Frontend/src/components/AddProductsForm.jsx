import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateProductMutation } from "@/lib/api";
import { useNavigate } from "react-router";
import { toast } from "sonner";


const formSchema = z.object({
    productname: z.string().min(2).max(50),
    price: z.string().min(1).refine(value => !isNaN(Number(value)), {
        message: "Price must be a valid number",
    }).transform(value => parseInt(value, 10)),
    description: z.string().min(2),
    image: z.string().min(2).max(500),
    categoryId: z.string().min(2).max(100),
    stock: z.string().min(1).refine(value => !isNaN(Number(value)), {
        message: "Stock must be a valid number",
    }).transform(value => parseInt(value, 10)),
});


const AddProductsForm = () => {
    const [createProduct, { isSuccess, isError }] = useCreateProductMutation();
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(formSchema),
    })

    async function handleSubmit(values) {
        try {
            const result = await createProduct({
                name: values.productname,
                price: values.price,
                description: values.description,
                image: values.image,
                categoryId: values.categoryId,
                stock: values.stock
            }).unwrap();  // 🔥 THIS is important
    
            toast.success('Product added successfully');
            navigate('/admin');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
    
        } catch (error) {
            console.error(error);
            toast.error('Product not added successfully, please try again');
        }
    }


    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 w-1/2">
                    <FormField
                        control={form.control}
                        name="productname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter product name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter product price" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter product description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Stock</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter product stock" type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter product image url" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter product category" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default AddProductsForm