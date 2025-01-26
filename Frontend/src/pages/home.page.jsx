import Hero from "@/Hero";
import Products from "@/Products";
import Navigation from "@/Navigation";
import { useSelector } from "react-redux";

function HomePage() {

  return (
    <main>
      <Hero />
      <Products />
    </main>
  )
}

export default HomePage;