import Cart from "@/components/cart";
import { api } from "@/trpc/server";

const CartPage = async () => {
    const cart = await api.cart.get.query();

    return (
        <Cart cart={cart} />
    )
}

export default CartPage

export const dynamic = 'force-dynamic'