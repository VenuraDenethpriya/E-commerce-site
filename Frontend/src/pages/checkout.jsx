import ShippingAddressform from "@/components/ShippingAddressform"
import { useUser } from "@clerk/clerk-react"
import { useSelector } from "react-redux"
import { Link, Navigate } from "react-router"

function CheckoutPage() {
  const { isLLoaded: isAuthLoaded, isSignedIn, user } = useUser()
  const cart = useSelector((state) => state.cart.value)
  const buy = useSelector((state) => state.buy.value)
    
  console.log(buy)
  if(!isSignedIn){
    return <Navigate to="/sign-in"/>
  } 
 
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h2 className="text-4xl font-bold mb-8 text-center">Checkout</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Order Details</h3>
          <div className="space-y-4">
            {
              buy !=0 ? <div>{buy.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">${item.product.price}</p>
                </div>
              ))
              }</div> : <div>{cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">LKR {item.product.price}</p>
                </div>
              ))
              }</div>
            }
            
            

          </div>
          <div className="mt-4 pt-2 border-t">
            <p className="text-xl font-bold text-right">
              Total: $
              {(
                buy && buy.length > 0
                  ? buy.reduce((total, item) => total + item.product.price * item.quantity, 0)
                  : cart && cart.length > 0
                    ? cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
                    : 0
              )}
            </p>
          </div>

        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Shipping Details</h3>
          <ShippingAddressform cart={cart} buy={buy} />
        </div>
      </div>
    </main>
  )
}

export default CheckoutPage

