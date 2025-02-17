
import { useState } from "react";
import { Separator } from "./components/ui/separator";
import ProductCards from "./ProductCards";
import Tab from "./Tab";
import SortBy from "./SortBy";
import { useGetCategoriesQuery, useGetProductsQuery } from "./lib/api.js";
import { Skeleton } from "./components/ui/skeleton";

function Products() {
  const { data: products, isLoading: isProductLoading, isError: isProductsError, error: productsError } = useGetProductsQuery()
  const { data: categories, isLoading: isCategoryLoading, isError: isCategoriesError, error: categoriesError } = useGetCategoriesQuery()


  const [selectedCategoryId, setSelectedCategoryId] = useState("ALL");

  const filteredProducts =
    selectedCategoryId === "ALL"
      ? products
      : products.filter((product) => product.categoryId === selectedCategoryId);


  const [productOrder, setProductOrder] =  useState("");
  
  const productList = filteredProducts ? [...filteredProducts].sort((a, b) => 
    productOrder === "ascending" ? a.price - b.price : b.price - a.price
  ) : [];

  const handleTabClick = (_id) => {
    setSelectedCategoryId(_id)
  }

  const handleSortChange = (event) => {
   setProductOrder(event.target.value)
   }

  /*useEffect(() => {
    getProducts().then((data) => {
      setProducts(data)
    }).catch((error) => {
      setProductsError({ isError: true, message: error.message })
    }).finally(() => {
      setIsProductLoading(false)
    })
  }, [])

  useEffect(() => {
    getCategory().then((data) => {
      setCategories(data)
    }).catch((error) => {
      setCategoriesError({ isError: true, message: error.message })
    }).finally(() => {
      setIsCategoryLoading(false)
    })
  }, [])
*/
  if (isCategoryLoading || isProductLoading) {
    return (
      <section className="p-12">
        <div className="flex justify-between">
          <h2 className="sm:text-4xl font-semibold text-md">Our Top Products</h2>
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
      </section>
    );
  }

  if (isProductsError || isCategoriesError) {
    return (
      <section className="p-12">
        <div className="flex justify-between">
          <h2 className="sm:text-4xl font-semibold text-md">Our Top Products</h2>
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
      </section>
    );
  }
  return (
    <section className="p-12">
      <div className="flex justify-between">
        <h2 className="sm:text-4xl font-semibold text-sm">Our Top Products</h2>
        <SortBy
        handleSortChange={handleSortChange}
        />
      </div>
      <Separator className="mt-2" />
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
      <ProductCards products={productList} />
    </section>
  );
}

export default Products;