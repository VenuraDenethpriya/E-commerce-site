import { useSearchParams } from "react-router"
import CheckoutForm from "./pages/CheckoutForm"

const CheckoutFormWrapper = () => {
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get("orderId")

  return <CheckoutForm orderId={orderId} />
}

export default CheckoutFormWrapper
