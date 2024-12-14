import Hero from "@/Hero";
import Products from "@/Products";
import Navigation from "@/Navigation";

function HomePage() {
    const name = ""
  const cartCount = 3

  return (
    <div>
      <Navigation name={name} cartCount={cartCount} />
      <Hero />
      <Products/>
    </div>
  )
}

export default HomePage;