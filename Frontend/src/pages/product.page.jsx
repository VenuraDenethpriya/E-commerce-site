
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useGetProductQuery } from "@/lib/api"
import { addToBuy } from "@/lib/features/BuySlice"
import { addToCart } from "@/lib/features/cartSlice"
import ProductSkeleton from "@/ProductSkeleton"
import { useDispatch } from "react-redux"
import { Link, useParams } from "react-router"

const ProductView = () => {
    const { id } = useParams()
    const { data: product, isLoading, isError, error } = useGetProductQuery(id)
    const dispatch = useDispatch()

    const handleClick = (e) => {
        dispatch(addToCart({
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description,
        })
        )
    }

    const handleBuyClick = (e) => {
        dispatch(addToBuy({
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description,
        }))
    }

    if (isLoading) return <ProductSkeleton />

    if (isError)
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500">Error: {error?.message || "Something went wrong"}</p>
            </div>
        )

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="rounded-lg object-cover w-full h-[500px]"
                    />
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                    <Badge variant="secondary" className="mb-4">
                        ${product.price.toFixed(2)}
                    </Badge>
                    <p className="text-gray-600 mb-6">{product.description}</p>
                    <div className="mt-1 py-4 gap-2 flex">
                        <div>
                            <Button variant="outline" className="border-2 border-black hover:bg-black hover:text-white" onClick={handleClick}>Add to Cart</Button>
                        </div>
                        <Link to='shop/cart/checkout'>
                            <Button className="hover:scale-110 transition-transform duration-100 ease-in-out" onClick={handleBuyClick}>Buy Now</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ProductView

