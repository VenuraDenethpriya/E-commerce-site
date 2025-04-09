import { Button } from "@/components/ui/button"
import { clearBuy } from "@/lib/features/buySlice"
import { clearCart } from "@/lib/features/cartSlice"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { Navigate, useNavigate, useSearchParams } from "react-router"
import { toast } from "sonner"
import CheckoutForm from "./CheckoutForm"

function PaymentPage() {
  const cart = useSelector((state) => state.cart.value)
  const buy = useSelector((state) => state.buy.value)
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams();
  const orderId = searchParams.get("orderId")
  const navigate = useNavigate()

  const totalAmount = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  const totalBuyAmount = buy.reduce((acc, item) => acc + item.product.price * item.quantity , 0)


  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Review Your Order</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-4">
          {
            buy.length != 0 ? <div>{buy.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}</div> : <div>{cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <p className="font-semibold">LKR {(item.product.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}</div>
          }
          
          

        </div>
        <div className="mt-4 pt-2 border-t">
          {
            buy.length > 0 ? (
              <p className="text-xl font-bold text-right">Total: LKR {totalBuyAmount.toFixed(2)}</p>
            ) : <p className="text-xl font-bold text-right">Total: LKR {totalAmount.toFixed(2)}</p>

          }
        </div>
      </div>

      <div className="text-center">
        <Button
          className=" "
          onClick={() => {
            dispatch(clearCart())
            dispatch(clearBuy())
            navigate(`/shop/payments?orderId=${orderId}`)
            //toast.success("Order placed successfully")
          }}
        >
          Proceed to Payment
        </Button>
      </div>
    </main>
  )
}

export default PaymentPage

