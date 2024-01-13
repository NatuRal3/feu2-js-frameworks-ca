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
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTotal() {
      const cartItems: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
      const totalCost = await calculateTotal(cartItems);
      setTotal(totalCost);
    }

    fetchTotal();
  }, []);

  function handleCheckoutClick() {
    navigate("/checkout");
  }

  return (
    <div>
      <ViewCart />
      <h3>Total Cost: KR {total.toFixed(2)}</h3>
      <Button onClick={handleCheckoutClick} variant="primary">
        To Checkout
      </Button>
    </div>
  );
}

export default Cart;
