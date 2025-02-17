import AdminProductCard from "./AdminProductCard";

function AdminProductCards(props) {
    return (  
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-8 pl-4">
                {
                    props.products.map((product) => (
                        <AdminProductCard
                            key={product._id}
                            id={product._id}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                            description={product.description}
                            category={product.categoryId}
                            stock={product.stock}
                        />
                    ))
                }
    
            </div>
     );
}

export default AdminProductCards;