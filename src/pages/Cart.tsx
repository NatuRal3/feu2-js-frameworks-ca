// List of items
// Button to checout - > Checkout success checkout.tsx

import React, { useState, useEffect } from "react";
import ViewCart from "../components/ViewCart";
import { getItem } from "../services/apiEngine";
import Button from "react-bootstrap/esm/Button";

type CartItem = {
  id: string;
  counter: number;
};

function Cart() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function calculateTotal() {
      const cartItems: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
      const itemDetails = await Promise.all(cartItems.map((cartItem) => getItem(cartItem.id)));

      const totalCost = itemDetails.reduce((sum, item, index) => {
        const quantity = cartItems[index].counter;
        return sum + item.price * quantity;
      }, 0);

      setTotal(totalCost);
    }

    calculateTotal();
  }, []);

  function handleCheckoutClick() {}

  return (
    <div>
      <ViewCart />
      <h3>Total Cost: KR {total.toFixed(2)}</h3>
      <Button onClick={() => handleCheckoutClick()} variant="primary">
        CHECKOUT
      </Button>
    </div>
  );
}

export default Cart;
