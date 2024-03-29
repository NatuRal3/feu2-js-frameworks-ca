import React, { useEffect, useState } from "react";
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

type ViewCartProps = {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

function ViewCart({ cartItems, setCartItems }: ViewCartProps) {
  const [itemDetails, setItemDetails] = useState<{ [key: string]: Item }>({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchItemDetails(cartItems);
  }, [cartItems]);

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
      setCartItems([...cartItems, { id: item.id, counter: 1 }]);
    }
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
    const updatedItems = cartItems.filter((item) => item.id !== cartItem.id);
    setCartItems(updatedItems);
  }

  function handleViewClick(id: string) {
    navigate(`/product/${id}`);
  }

  if (!cartItems || cartItems.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
    <Row xs={1} md={3} className="g-4 flex column">
      {cartItems.map((cartItem) => {
        const item = itemDetails[cartItem.id];
        return (
          <Col key={cartItem.id}>
            <Card className="cards-w">
              {item && (
                <>
                  <Card.Body>
                    <div className="flex frow space-evenly">
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>In cart {cartItem.counter}</Card.Text>
                      <Card.Text>Price {item.price}Kr</Card.Text>
                      <Card.Text>Amount {(cartItem.counter * item.price).toFixed(2)}Kr</Card.Text>
                    </div>

                    <div className="flex space-evenly">
                      <div>
                        <Button onClick={() => handleAddToCart(item)} variant="primary">
                          +
                        </Button>

                        <Button
                          onClick={() => handleDecreaseQuantityClick(cartItem)}
                          variant="secondary"
                        >
                          -
                        </Button>
                      </div>
                      <div>
                        <Button onClick={() => handleViewClick(cartItem.id)} variant="primary">
                          View
                        </Button>
                        <Button onClick={() => handleRemoveClick(cartItem)} variant="danger">
                          Remove
                        </Button>
                      </div>
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
