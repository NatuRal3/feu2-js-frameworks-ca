import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getItem } from "../services/apiEngine";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

type Item = {
  id: string;
  title: string;
  price: number;
};

type CartItem = {
  id: string;
  counter: number;
};

function Checkout() {
  const location = useLocation();
  const { cartItems } = location.state || { cartItems: [] };
  const [itemDetails, setItemDetails] = useState<{ [key: string]: Item }>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length) {
      fetchItemDetails(cartItems);
      // Del localstorage after landing at checkout
      localStorage.removeItem("cart");
    }
  }, [cartItems]);

  const fetchItemDetails = async (cartItems: CartItem[]) => {
    try {
      const details = await Promise.all(cartItems.map((cartItem) => getItem(cartItem.id)));
      const items = details.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {});
      setItemDetails(items);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  function handleHomeClick() {
    navigate("/home");
  }

  return (
    <>
      <div className="flex column items-center checkout-summary">
        <h1>SUCCESS!</h1>
        <h2>Your order has been placed!</h2>
        <p>We will send you a confirmation email shortly</p>
        <h3>Order summary</h3>
        <ul>
          {cartItems.map((cartItem: CartItem, index: number) => {
            const item = itemDetails[cartItem.id];
            const itemTotal = item ? (item.price * cartItem.counter).toFixed(2) : "Loading...";
            return (
              <li key={index}>
                {cartItem.counter}x {item?.title || "Loading..."} - Price: {item?.price.toFixed(2)}
                Kr - Total: {itemTotal}Kr
              </li>
            );
          })}
        </ul>
        <div>
          Total Price:{" "}
          {Object.values(itemDetails)
            .reduce((total, item) => {
              const cartItem = cartItems.find((ci: CartItem) => ci.id === item.id);
              return total + item.price * (cartItem ? cartItem.counter : 0);
            }, 0)
            .toFixed(2)}
          Kr
        </div>
        <Button onClick={handleHomeClick} variant="primary">
          Back to the home page
        </Button>
      </div>
    </>
  );
}

export default Checkout;
