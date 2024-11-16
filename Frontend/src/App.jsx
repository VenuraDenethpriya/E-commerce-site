import Hero from "./Hero"
import Navigation from "./Navigation"
import Products from "./Products";

function App() {
  const name = "";
  const cardCount = 0;

  return (
    <>
      <Navigation name={name} cardCount={cardCount}/>
      <Hero/>
      <Products/>
    </>
  )
}

export default App