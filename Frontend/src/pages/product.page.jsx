
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useGetProductQuery, useGetProductsQuery } from "@/lib/api"
import { addToBuy } from "@/lib/features/buySlice"
import { addToCart } from "@/lib/features/cartSlice"
import ProductCards from "@/ProductCards"
import ProductSkeleton from "@/ProductSkeleton"
import { useUser } from "@clerk/clerk-react"
import { useDispatch } from "react-redux"
import { Link, useNavigate, useParams } from "react-router"

const ProductView = () => {
    const {isSignedIn} = useUser()
    const { data: products } = useGetProductsQuery()
    const { id } = useParams()
    const { data: product, isLoading, isError, error } = useGetProductQuery(id)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleClick = (e) => {
        if (!isSignedIn) {
            navigate("/sign-in")
        }
        dispatch(addToCart({
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description,
            stock: product.stock

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
            stock: product.stock
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
        <main>
            <div className="container mx-auto px-4 py-8 bg-slate-50 rounded-xl">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <img
                            src={product.image || "/placeholder.png"}
                            alt={product.name}
                            className="rounded-lg object-cover w-full h-[500px]"
                        />
                    </div>
                    <div>
                        <div className="text-black text-xs font-semibold p-1 rounded-full z-50">
                            {
                                product.stock > 0 ? (
                                    null
                                ) : (
                                    <Label className="text-red-500 text-sm">Out of Stock</Label>
                                )
                            }
                        </div>
                        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                        <Badge variant="secondary" className="mb-4">
                            ${product.price.toFixed(2)}
                        </Badge>
                        <p className="text-gray-600 mb-6 text-justify">{product.description}</p>
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
            </div>
            <div className="sm:px-12 pt-8 px-4">
                <div className="flex">
                    <h2 className="sm:text-3xl font-semibold text-md">Recommended Products</h2>
                </div>
                <Separator className="mt-2" />
            </div>
            <div className="px-12">
                <ProductCards products={products} />
            </div>
        </main>
    )
}

export default ProductView

