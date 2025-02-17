import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCategoriesQuery, useGetProductsQuery } from "@/lib/api";
import ProductCards from "@/ProductCards";
import SortBy from "@/SortBy";
import Tab from "@/Tab";
import { useState } from "react";


function ShopPage() {
    const { data: products, isLoading: isProductLoading, isError: isProductsError, error: productsError } = useGetProductsQuery()
    const { data: categories, isLoading: isCategoryLoading, isError: isCategoriesError, error: categoriesError } = useGetCategoriesQuery()

    const [selectedCategoryId, setSelectedCategoryId] = useState("ALL");
    const [productOrder, setProductOrder] = useState("");

    const filteredProducts =
        selectedCategoryId === "ALL"
            ? products
            : products.filter((product) => product.categoryId === selectedCategoryId);

    const productList = filteredProducts ? [...filteredProducts].sort((a, b) =>
        productOrder === "ascending" ? a.price - b.price : b.price - a.price
    ) : [];

    const handleSortChange = (event) => {
        setProductOrder(event.target.value);
    }

    const handleTabClick = (_id) => {
        setSelectedCategoryId(_id)
    }

    if (isProductLoading || isCategoryLoading) {
        return (
            <main className="p-12">
                <div className="flex justify-between">
                    <h2 className="text-4xl font-semibold">Our Products</h2>
                    <SortBy />
                </div>
                <Separator className="mt-2" />
                <div className="mt-4 flex items-center gap-4">
                    {
                        Array(10)
                            .fill(1)
                            .map((_, index) => {
                                return (
                                    <Skeleton
                                        key={index}
                                        className="h-2 bg-gray-200 rounded-lg p-4 relative justify-center"
                                    />
                                );
                            })
                    }
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
            </main>
        );
    }
    if (isProductsError || isCategoriesError) {
        return (
            <main className="p-12">
                <div className="flex justify-between">
                    <h2 className="text-4xl font-semibold">Our Products</h2>
                    <SortBy
                    />
                </div>
                <Separator className="mt-2" />
                <div className="mt-4 flex items-center gap-4">
                    <p className="text-red-500">{categoriesError.message}</p>
                </div>
                <div className="mt-4">
                    <p className="text-red-500">{productsError.message}</p>
                </div>
            </main>
        );
    }
    return (
        <main className="px-12 py-8">
            <div className="flex justify-between">
                <h2 className="sm:text-4xl text-md font-semibold">Our Products</h2>
                <SortBy
                    handleSortChange={handleSortChange}
                 />
            </div>
            <Separator />
            <div className="sm:overflow-x-hidden mt-4 flex items-center gap-4 overflow-x-scroll">
                {
                    [{ _id: "ALL", name: "ALL" }, ...categories].map((category) => (
                        <Tab
                            key={category._id}
                            _id={category._id}
                            selectedCategoryId={selectedCategoryId}
                            name={category.name}
                            onTabClick={handleTabClick}
                        />
                    ))
                }
            </div>
            <div className="mt-4 flex items-center gap-4">
                <ProductCards products={productList} />
            </div>
        </main>
    );
}

export default ShopPage;