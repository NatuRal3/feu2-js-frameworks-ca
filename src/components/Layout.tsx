//Header
    //Nav
    //Cart with counter and button to view content

//Footer
import React from "react";
import { BrowserRouter, Routes, Route, Link, Outlet  } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaShoppingCart } from "react-icons/fa";

function Header (){
    return(
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/home">SHOP</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
              <Nav.Link href="/cart"><FaShoppingCart/></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

function Footer() {
    return <footer>WE LOVE FEET</footer>;
  }

  function Layout() {
    return (
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    );
  }

  export default Layout;