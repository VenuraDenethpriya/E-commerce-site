import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import { useCreateOrderMutation, useGetProductsQuery, useUpdateProductMutation } from "@/lib/api";
import { toast } from "sonner";


const formSchema = z.object({
    name: z.string().min(2).max(50),
    phoneNumber: z.string().refine((value) => {
        return /^[0-9]{10}$/.test(value);
    }, {
        message: "Invalid phone number",
    }),
    address: z.string().min(2).max(50),
    city: z.string().min(2).max(50),
    state: z.string().min(2).max(50),
    zipCode: z.string().min(2).max(50),
})

const ShippingAddressform = ({ cart, buy }) => {
    const [updateProduct] = useUpdateProductMutation();

    const [createOrder, { isLoading, isError, data }] = useCreateOrderMutation();
    const form = useForm({
        resolver: zodResolver(formSchema),

    });
    const navigate = useNavigate();


    async function handleSubmit(values) {
        try {
            const orderItems = buy?.length !=0 ? buy : cart;

        for (const item of orderItems) {
            await updateProduct({
                id : item.product._id,
                body: { stock:(item.product.stock - item.quantity)  }
            })

        }
        const response = await createOrder({
            items: orderItems,
            ShippingAddress: {
                name: values.name,
                phoneNumber: values.phoneNumber,
                address: values.address,
                city: values.city,
                state: values.state,
                zipCode: values.zipCode,
            }
        }).unwrap();
        console.log(response);
        toast.success("Checkout successful");
        navigate(`/shop/payments?orderId=${response.orderId}`);
        } catch (error) {
            toast.error("check out failed" + error.message);
        }
        
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>

                    <div className="grid grid-cols-2 gap-8 ">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your name" {...field} />
                                    </FormControl>
                                    {/*<FormDescription>
                                    Enter your name
                                </FormDescription>*/}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="0771234567" {...field} />
                                    </FormControl>
                                    {/*<FormDescription>
                                    Enter your name
                                </FormDescription>*/}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your address" {...field} />
                                    </FormControl>
                                    {/*<FormDescription>
                                    Enter your name
                                </FormDescription>*/}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your city" {...field} />
                                    </FormControl>
                                    {/*<FormDescription>
                                    Enter your name
                                </FormDescription>*/}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your state" {...field} />
                                    </FormControl>
                                    {/*<FormDescription>
                                    Enter your name
                                </FormDescription>*/}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="zipCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Zip Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your zip code" {...field} />
                                    </FormControl>
                                    {/*<FormDescription>
                                    Enter your name
                                </FormDescription>*/}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mt-4">
                        <Button type="submit">Place Order</Button>
                    </div>

                </form>
            </Form>
        </div>
    );
}

export default ShippingAddressform;