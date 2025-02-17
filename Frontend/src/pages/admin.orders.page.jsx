"use client"

import { useState } from "react"
import { useGetOrdersQuery, useUpdateOrderMutation } from "@/lib/api"
import { Loader2, ShoppingBag, DollarSign, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

function AdminOrderPage() {
  const { data: orders, isLoading, isError, error } = useGetOrdersQuery()
  const [updateOrderStatus] = useUpdateOrderMutation()
  const [isUpdating, setIsUpdating] = useState(false)

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
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    )
  }

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const result = await updateOrderStatus({ id: id, body: { orderStatus: newStatus } })
      if (result.error) {
        toast.error("Failed to update order status: " + result.error.message);
      }
      else {
        toast.success("Order status updated successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      toast.error("Failed to update order status " + error.message);
    }
  }

  return (
    <section className="w-full min-h-screen px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Order #{order._id.slice(-6)}</h2>
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-medium mr-2 ${order.orderStatus === "PENDING"
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
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem  onClick={() => handleStatusUpdate(order._id, "CONFIRMED")}>
                      Confirmed
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusUpdate(order._id, "PROCESSING")}>
                      Processing
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusUpdate(order._id, "SHIPPED")}>
                      Shipped
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusUpdate(order._id, "DELIVERED")}>
                      Delivered
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${order.paymentStatus === "PENDING"
                      ? "bg-red-100 text-red-800"
                      : order.paymentStatus === "PAID"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                >
                  {order.paymentStatus}
                </span>
              </div>
            </div>
            <p className="text-gray-600 mb-4">User ID: {order.userId}</p>
            <div className="bg-gray-50 rounded-md p-4 mb-4">
              <h3 className="font-medium mb-2 flex items-center">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Order Items:
              </h3>
              {order.items.map((item) => (
                <div key={item._id} className="flex justify-between items-center mb-2 p-2 bg-white rounded-md">
                  <div className="flex items-center">
                    <img
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-md mr-4"
                    />
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {item.product.price}
                    </p>
                    <p className="text-sm">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <p className="font-medium">Total Items: {order.items.length}</p>
              <p className="font-medium">
                Total Price: $
                {order.items.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
      {isUpdating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-white" />
        </div>
      )}
    </section>
  )
}

export default AdminOrderPage

