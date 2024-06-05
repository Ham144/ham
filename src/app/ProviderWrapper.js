
import { CartContext } from "./components/CartContext";

export default function GlobalProvider({ children }) {
    return (
        <CartContext>
            {children}
        </CartContext>
    )
}