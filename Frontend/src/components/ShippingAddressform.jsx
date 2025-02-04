import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import { useCreateOrderMutation } from "@/lib/api";

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

const ShippingAddressform = ({ cart, buy}) => {
    const [createOrder, { isLoading, isError, data }] = useCreateOrderMutation();
    const form = useForm({
        resolver: zodResolver(formSchema),

    });
    const navigate = useNavigate();


    function handleSubmit(values) {
        createOrder({
            items: cart || buy,
            ShippingAddress: {
                name: values.name,
                phoneNumber: values.phoneNumber,
                address: values.address,
                city: values.city,
                state: values.state,
                zipCode: values.zipCode,
            }
        });
        navigate('/shop/payments');
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} >

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
                        <Button type="submit">Proceed to Payment</Button>
                    </div>

                </form>
            </Form>
        </div>
    );
}

export default ShippingAddressform;