// ADD
// REMOVE
//SUCCESS
import React from "react";

type Item = {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  discountedPrice: number;
  price: number;
};

type CartItem = {
  id: string;
  title: string;
  counter: number;
};

export function addToCart(item: Item) {
  // Retrieve current local storage
  const cartJson = localStorage.getItem("cart");
  let cart: CartItem[] = cartJson ? JSON.parse(cartJson) : [];

  // Is item in cart
  const itemInCartCheck = cart.findIndex((cartItem: CartItem) => cartItem.id === item.id);
  if (itemInCartCheck > -1) {
    // If item exist
    cart[itemInCartCheck].counter++;
  } else {
    // Add new entry
    cart.push({ id: item.id, title: item.title, counter: 1 });
  }

  // Update cart
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function removeFromCart() {}
