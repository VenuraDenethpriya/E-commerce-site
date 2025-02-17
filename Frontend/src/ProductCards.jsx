import ProductCard from "./ProductCard";

function ProductCards(props) {
    return ( 
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
            {
                props.products.map((product) => (
                    <ProductCard
                        key={product._id}
                        _id={product._id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                        description={product.description}
                        stock={product.stock}
                    />
                ))
            }

        </div>
     );
}

export default ProductCards;