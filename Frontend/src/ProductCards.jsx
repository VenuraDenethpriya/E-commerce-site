import ProductCard from "./ProductCard";

function ProductCards(props) {
    return ( 
        <div className="grid sm:grid-cols-4 gap-4 pt-4 grid-cols-1">
            {
                props.products.map((product) => (
                    <ProductCard
                        key={product._id}
                        _id={product._id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                        description={product.description}
                    />
                ))
            }

        </div>
     );
}

export default ProductCards;