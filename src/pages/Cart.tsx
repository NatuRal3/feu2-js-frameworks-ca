// List of items
// Button to checout - > Checkout success checkout.tsx

import React, { useState, useEffect } from "react";
import ViewCart from "../components/ViewCart";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { calculateTotal } from "../tools/totalPriceCalculator";

type CartItem = {
  id: string;
  counter: number;
};

function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedItems = localStorage.getItem("cart");
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    async function updateTotal() {
      const totalCost = await calculateTotal(cartItems);
      setTotal(totalCost);
    }

    updateTotal();
  }, [cartItems]);

  function handleCheckoutClick() {
    navigate("/checkout", { state: { cartItems, total } });
  }

  return (
    <div className="flex column center-items cart-cont">
      <ViewCart cartItems={cartItems} setCartItems={setCartItems} />
      <div className="column center-items cart-sum">
        <h3>Total: {total.toFixed(2)} KR</h3>
        <Button onClick={handleCheckoutClick} variant="primary">
          To Checkout
        </Button>
      </div>
    </div>
  );
}

export default Cart;
