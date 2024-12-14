
import Navigation from "./Navigation"
import Hero from "./Hero"
import Products from "./Products"

function App() {
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

export default App
