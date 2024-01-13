import { getItem } from "../services/apiEngine";

type CartItem = {
  id: string;
  counter: number;
};

export async function calculateTotal(cartItems: CartItem[]): Promise<number> {
  const itemDetails = await Promise.all(cartItems.map((cartItem) => getItem(cartItem.id)));

  const totalCost = itemDetails.reduce((sum, item, index) => {
    const quantity = cartItems[index].counter;
    return sum + item.price * quantity;
  }, 0);

  return totalCost;
}
