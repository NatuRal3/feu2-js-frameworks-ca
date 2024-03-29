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

const emitCartChange = () => {
  window.dispatchEvent(new Event("storage"));
};

// ADD TO CART HANDLER
export function addToCart(item: Item) {
  const cartJson = localStorage.getItem("cart");
  let cart: CartItem[] = cartJson ? JSON.parse(cartJson) : [];

  const itemInCartCheck = cart.findIndex((cartItem: CartItem) => cartItem.id === item.id);
  if (itemInCartCheck > -1) {
    cart[itemInCartCheck].counter++;
  } else {
    cart.push({ id: item.id, title: item.title, counter: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  emitCartChange();
}

// DECREASE FROM CART HANDLER
export function decreaseItemQuantity(itemId: string) {
  const cartJson = localStorage.getItem("cart");
  let cart: CartItem[] = cartJson ? JSON.parse(cartJson) : [];

  const itemIndex = cart.findIndex((cartItem) => cartItem.id === itemId);
  if (itemIndex > -1) {
    if (cart[itemIndex].counter > 1) {
      cart[itemIndex].counter--;
    } else {
      cart.splice(itemIndex, 1);
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  emitCartChange();
}

// REMOVE ALL INSTANCES OF ITEM HANDLER
export function removeFromCart(itemId: string) {
  const cartJson = localStorage.getItem("cart");
  let cart: CartItem[] = cartJson ? JSON.parse(cartJson) : [];

  cart = cart.filter((cartItem) => cartItem.id !== itemId);

  localStorage.setItem("cart", JSON.stringify(cart));
  emitCartChange();
}
