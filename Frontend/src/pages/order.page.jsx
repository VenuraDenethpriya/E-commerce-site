import { useGetOrdersByUserQuery } from "@/lib/api"
import { useAuth, useUser } from "@clerk/clerk-react"
import { Loader2, Package, ShoppingBag } from "lucide-react"

function OrderPage() {
  const { isLoaded, isSignedIn, user } = useUser()
  const { userId } = useAuth()
  const { data: orders, isLoading, isError } = useGetOrdersByUserQuery(userId)

  if (!isSignedIn) {
    return (
      <div className="flex justify-center h-screen">
        <p className="text-lg pb-6 pt-12 text-gray-600">
          Please sign in to view your orders.
        </p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Error loading orders. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="sm:text-3xl text-xl sm:pl-0 pl-4 font-bold mb-8">Your Orders</h1>
      {orders && orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Order #{order._id.slice(-6)}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${order.orderStatus === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.orderStatus === "PROCESSING"
                        ? "bg-violet-200 text-violet-900"
                        : order.orderStatus === "CONFIRMED"
                          ? "bg-green-100 text-green-800"
                          : order.orderStatus === "SHIPPED"
                            ? "bg-blue-100 text-blue-800"
                            : order.orderStatus === "DELIVERED"
                              ? "bg-blue-800 text-blue-100"
                              : ""
                    }`}
                >
                  {order.orderStatus}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Shipping Details</h3>
                  <p>{order.addressId.name}</p>
                  <p>Phone: {order.addressId.phoneNumber}</p>
                  <p>{order.addressId.address}</p>
                  <p>
                    {order.addressId.city}
                  </p>
                  <p>
                    {order.addressId.state}
                  </p>
                  <p>
                    {order.addressId.zipCode}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Order Details</h3>
                  <div className="bg-gray-50 rounded-md p-3 mb-2">
                    <h4 className="font-medium mb-2 flex items-center">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Items:
                    </h4>
                    {order.items.length > 0 ? (
                      order.items.map((item, index) => (
                        <div key={index} className="text-sm mb-2 flex justify-between items-center">
                          <div className="flex items-center">
                            <img
                              src={item.product.image || "/placeholder.svg"}
                              alt={item.product.name}
                              className="w-12 h-12 object-cover rounded-md mr-4"
                            />
                            <span className="font-medium">{item.product.name}</span>
                          </div>
                          <div>
                            <span className="bg-gray-200 px-2 py-1 rounded-full text-xs">Qty: {item.quantity}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No items in this order</p>
                    )}
                  </div>
                  <p className="font-medium">
                    Total Price: $
                    {order.items.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)}
                  </p>
                  <p className="mt-2">
                    <span className="font-medium">Payment Status:</span> <span className={order.paymentStatus == 'paid' ? "" : "bg-red-200 text-red-900 rounded-full px-1"}>{order.paymentStatus}</span> 
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No orders found</h2>
          <p className="text-gray-500">You haven't placed any orders yet.</p>
        </div>
      )}
    </div>
  )
}

export default OrderPage

