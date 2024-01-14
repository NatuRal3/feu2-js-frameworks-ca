//Header
//Nav
//Cart with counter and button to view content

//Footer
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaShoppingCart } from "react-icons/fa";

type CartItem = {
  id: string;
  title: string;
  counter: number;
};

function Header() {
  const [cartItemCount, setCartItemCount] = useState(0);

  const updateCartItemCount = () => {
    const cartJson = localStorage.getItem("cart");
    // Ensure cart is declared as an array of CartItem
    const cart: CartItem[] = cartJson ? JSON.parse(cartJson) : [];
    const itemCount = cart.reduce((total: number, item: CartItem) => total + item.counter, 0);
    setCartItemCount(itemCount);
  };

  // Effect to update the cart item count
  useEffect(() => {
    updateCartItemCount();
    // Adding an event listener to update the cart count when local storage changes
    window.addEventListener("storage", updateCartItemCount);

    // Cleanup
    return () => {
      window.removeEventListener("storage", updateCartItemCount);
    };
  }, []);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/home">SHOP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">HOME</Nav.Link>
            <Nav.Link href="/contact">CONTACT</Nav.Link>
            <Nav.Link href="/cart">
              <FaShoppingCart />
              {cartItemCount > 0 && <span className="cart-counter">{cartItemCount}</span>}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function Footer() {
  return <footer>SHOP © all rights reserved</footer>;
}

function Layout() {
  return (
    <div className="layout-container">
      <Header />
      <div className="main-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
