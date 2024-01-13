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

export function decreaseItemQuantity(itemId: string) {
  // Retrieve the current cart
  const cartJson = localStorage.getItem("cart");
  let cart: CartItem[] = cartJson ? JSON.parse(cartJson) : [];

  // Find the item
  const itemIndex = cart.findIndex((cartItem) => cartItem.id === itemId);
  if (itemIndex > -1) {
    // Decrease counter or remove if it's 1
    if (cart[itemIndex].counter > 1) {
      cart[itemIndex].counter--;
    } else {
      cart.splice(itemIndex, 1);
    }
  }

  // Update the cart in local storage
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function removeFromCart(itemId: string) {
  // Retrieve the current cart
  const cartJson = localStorage.getItem("cart");
  let cart: CartItem[] = cartJson ? JSON.parse(cartJson) : [];

  // Remove the item with the specified ID
  cart = cart.filter((cartItem) => cartItem.id !== itemId);

  // Update the cart in local storage
  localStorage.setItem("cart", JSON.stringify(cart));
}
