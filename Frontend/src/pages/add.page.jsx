import AddProductsForm from "@/components/AddProductsForm";

function AddProductPage() {
    return ( 
        <section className="w-full min-h-screen p-8">
        <h1 className="text-2xl font-semibold pb-4">Add New Product</h1>
        <AddProductsForm/>
        </section>
     );
}

export default AddProductPage;