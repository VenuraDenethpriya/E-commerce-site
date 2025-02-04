import { Button } from "@/components/ui/button";
import { useGetOrderQuery } from "@/lib/api";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router";

function CompletePage() {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("orderId");
    const cart = useSelector((state) => state.cart.value);

    console.log(searchParams)
    const { data, isLoading} = useGetOrderQuery(orderId);

    if(isLoading){
        return (
            <main>
                <p>Loading....</p>
            </main>
        )
    }
    return (
        <>
            <h1>Order Successfully Placed</h1>
            <div>
                {
                    data.items.map((item, index) => {
                        return (
                            <div key={index}>
                                <p>{item.product.name}</p>
                                <p>{item.product.price}</p>
                                <p>{item.quantity}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <p>Order ID: {data._id}</p>
                <p>Order Status: {data.paymentStatus}</p>
                {data.addressId && (
                    <>
                        <p>Shipping Name: {data.addressId?.name || 'N/A'}</p>
                        <p>Shipping Phone Number: {data.addressId?.phoneNumber || 'N/A'}</p>
                        <p>Shipping Address:</p>
                        <p>{data.addressId?.address || 'N/A'}</p>
                        <p>{data.addressId?.city || 'N/A'}</p>
                        <p>{data.addressId?.state || 'N/A'}</p>
                        <p>{data.addressId?.zipCode || 'N/A'}</p>
                    </>
                )}
            </div>
            <div>
                <p>Total: {data.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)}</p>
            </div>
            <Button><Link to="/shop">Continue Shoping</Link></Button>

        </>

    );
}

export default CompletePage;