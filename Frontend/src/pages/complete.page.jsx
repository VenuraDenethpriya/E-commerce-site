import { Button } from "@/components/ui/button"
import { useGetOrderQuery } from "@/lib/api"
import { Link, useSearchParams } from "react-router"

function CompletePage() {
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get("orderId")
  const { data, isLoading } = useGetOrderQuery(orderId)

  if (isLoading) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading order details...</p>
      </main>
    )
  }

  if (!data) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>Unable to load order details. Please try again later.</p>
      </main>
    )
  }

  const totalAmount = data.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-600">Order Successfully Placed</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <p className="mb-2">
          <span className="font-medium">Order ID:</span> {data._id}
        </p>
        <p className="mb-2">
          <span className="font-medium">Status:</span> {data.paymentStatus}
        </p>
        <p className="mb-2">
          <span className="font-medium">Total Amount:</span> ${totalAmount.toFixed(2)}
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Items Ordered</h2>
        <div className="space-y-4">
          {data.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      {data.addressId && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
          <p className="mb-1">
            <span className="font-medium">Name:</span> {data.addressId.name || "N/A"}
          </p>
          <p className="mb-1">
            <span className="font-medium">Phone:</span> {data.addressId.phoneNumber || "N/A"}
          </p>
          <p className="mb-1">
            <span className="font-medium">Address:</span> {data.addressId.address || "N/A"}
          </p>
          <p className="mb-1">
            {data.addressId.city || "N/A"}, {data.addressId.state || "N/A"} {data.addressId.zipCode || "N/A"}
          </p>
        </div>
      )}

      <div className="text-center">
        <Button asChild className="px-6 py-2">
          <Link to="/shop">Continue Shopping</Link>
        </Button>
      </div>
    </main>
  )
}

export default CompletePage

