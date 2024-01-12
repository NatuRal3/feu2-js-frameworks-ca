import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { decreaseItemQuantity, removeFromCart, addToCart } from "../tools/cartHandler";
import { getItem } from "../services/apiEngine";

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
  counter: number;
};

function ViewCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [itemDetails, setItemDetails] = useState<{ [key: string]: Item }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedItems = localStorage.getItem("cart");
    if (storedItems) {
      const parsedItems: CartItem[] = JSON.parse(storedItems);
      setCartItems(parsedItems);
      fetchItemDetails(parsedItems);
    }
  }, []);

  const fetchItemDetails = async (cartItems: CartItem[]) => {
    try {
      const details = await Promise.all(cartItems.map((cartItem) => getItem(cartItem.id)));
      const itemDetails = details.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {});
      setItemDetails(itemDetails);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  function handleAddToCart(item: Item) {
    addToCart(item);
    // Check if the item is already in the cart and update the counter
    const isItemInCart = cartItems.some((cartItem) => cartItem.id === item.id);
    if (isItemInCart) {
      const updatedItems = cartItems.map((cartItem) => {
        if (cartItem.id === item.id) {
          return { ...cartItem, counter: cartItem.counter + 1 };
        }
        return cartItem;
      });
      setCartItems(updatedItems);
    } else {
      // Add new item to the cart
      setCartItems([...cartItems, { id: item.id, counter: 1 }]);
    }
    // No need to update local storage here as addToCart already does it
  }

  function handleDecreaseQuantityClick(cartItem: CartItem) {
    decreaseItemQuantity(cartItem.id);
    const updatedItems = cartItems
      .map((item) => {
        if (item.id === cartItem.id) {
          return { ...item, counter: item.counter - 1 };
        }
        return item;
      })
      .filter((item) => item.counter > 0);
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  }

  function handleRemoveClick(cartItem: CartItem) {
    removeFromCart(cartItem.id);
    setCartItems(cartItems.filter((item) => item.id !== cartItem.id));
  }

  function handleViewClick(id: string) {
    navigate(`/product/${id}`);
  }

  if (!cartItems || cartItems.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
    <Row xs={1} md={3} className="g-4">
      {cartItems.map((cartItem) => {
        const item = itemDetails[cartItem.id];
        return (
          <Col key={cartItem.id}>
            <Card style={{ width: "45rem" }}>
              {item && (
                <>
                  <Card.Body>
                    <div className="flex space-evenly">
                      <Card.Title>{item.title}</Card.Title>

                      <Card.Text>In cart {cartItem.counter}</Card.Text>
                      <Card.Text>Price {item.price}Kr</Card.Text>
                      <Card.Text>Amount {(cartItem.counter * item.price).toFixed(2)}Kr</Card.Text>
                    </div>

                    <div className="flex space-evenly " style={{ width: "20rem" }}>
                      <Button onClick={() => handleAddToCart(item)} variant="primary">
                        +
                      </Button>

                      <Button
                        onClick={() => handleDecreaseQuantityClick(cartItem)}
                        variant="secondary"
                      >
                        -
                      </Button>
                      <Button onClick={() => handleRemoveClick(cartItem)} variant="danger">
                        Remove
                      </Button>
                      <Button onClick={() => handleViewClick(cartItem.id)} variant="primary">
                        View
                      </Button>
                    </div>
                  </Card.Body>
                </>
              )}
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

export default ViewCart;
