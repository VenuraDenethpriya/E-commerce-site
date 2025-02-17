import { useSelector, useDispatch } from "react-redux"
//import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react"
import { Link } from "react-router"
import { decrementQuantity, incrementQuantity, removeItem } from "@/lib/features/cartSlice"



function CartPage() {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.value)



  const handleIncrement = (product) => {
    dispatch(incrementQuantity(product))
  }

  const handleDecrement = (product) => {
    dispatch(decrementQuantity(product))
  }

  const handleRemove = (product) => {
    dispatch(removeItem(product))
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  const handleCheckout = () => {
    console.log("Proceeding to checkout with items:", cartItems)
    // Here you would typically integrate with a payment gateway or navigate to a checkout page
  }
  return (
    <main>
        <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.product._id} className="flex items-center space-x-4 border-b pb-4">
             {/* <Image
                src={item.product.image || "/placeholder.svg"}
                alt={item.product.name}
                width={80}
                height={80}
                className="rounded-md"
              />*/}
              <div className="flex-grow">
                <h2 className="font-semibold">{item.product.name}</h2>
                <p className="text-gray-600">${item.product.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDecrement(item.product)}
                  disabled={item.quantity === 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button variant="outline" size="icon" onClick={() => handleIncrement(item.product)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="destructive" size="icon" onClick={() => handleRemove(item.product)} >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <div className="flex justify-between items-center pt-4">
            <span className="font-semibold">Total:</span>
            <span className="font-bold text-xl">${calculateTotal()}</span>
          </div>
          <Link to="/shop/cart/checkout"><Button className="w-full mt-4" onClick={handleCheckout}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Proceed to Checkout
          </Button></Link>
          
        </div>
      )}
    </div>
    </main>
  )
    
}

export default CartPage

