import { Skeleton } from "./components/ui/skeleton"


const ProductSkeleton = () => {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="h-[500px] w-full rounded-lg" />
          <div>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/4 mb-4" />
            <Skeleton className="h-24 w-full mb-6" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    )
  }

export default ProductSkeleton