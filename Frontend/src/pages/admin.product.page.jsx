import AdminProductCards from "@/AdminProductCards";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProductsQuery } from "@/lib/api";
import { useUser } from "@clerk/clerk-react";
import { Link, Navigate } from "react-router";
import { toast } from "sonner";

function AdminProductPage() {
    const { isLoaded, isSignedIn, user } = useUser();
    const { data: products, isLoading: isProductLoading, isError: isProductsError } = useGetProductsQuery();


    if (!isLoaded || isProductLoading) {
        return (
            <div className="w-full min-h-screen p-4">
                <div className="flex py-4 pr-4 justify-between">
                    <h1 className="text-2xl font-bold pl-6">All Products</h1>
                    <Link to="/admin/addproducts">
                        <button className="bg-slate-200 text-lg px-1 rounded-full">+ Add Products</button>
                    </Link>
                </div>
                <div className="grid grid-cols-4 gap-4 pt-4">
                    {
                        Array(4)
                            .fill(1)
                            .map((_, index) => {
                                return (
                                    <Skeleton
                                        key={index}
                                        className="h-96 bg-gray-200 rounded-lg p-4 relative justify-center"
                                    />
                                );
                            })
                    }
                </div>
            </div>
        );
    }

    if (!isSignedIn) {
        return <Navigate to="/sign-in" />;
    }


    if (user?.publicMetadata?.role !== "admin") {
        toast.error("You are not authorized to access this page.");
        return <Navigate to="/" />;
    }

    return (
        <section className="w-full min-h-screen px-4 pb-8">
            <div className="flex py-4 pr-4 justify-between">
                <h1 className="text-2xl font-bold pl-6">All Products</h1>
                <Link to="/admin/addproducts">
                    <button className="bg-slate-200 text-lg px-1 rounded-full">+ Add Products</button>
                </Link>
            </div>
            {isProductsError ? (
                <div className="text-center text-red-500">Error loading products</div>
            ) : (
                <div>
                    <AdminProductCards products={products} />
                </div>
            )}
        </section>
    );
}

export default AdminProductPage;