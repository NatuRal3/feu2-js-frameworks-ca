import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import campaignPriceCalculator from "../tools/campaignPriceCalculator";
import { addToCart } from "../tools/cartHandler";

type Item = {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  discountedPrice: number;
  price: number;
};

type ItemCardsProps = {
  items: Item[];
};

function ItemCards({ items }: ItemCardsProps) {
  const navigate = useNavigate();
  if (!items || items.length === 0) {
    return <div>No items to display</div>;
  }

  function handleViewClick(id: string) {
    navigate(`/product/${id}`);
  }

  return (
    <Row xs={1} md={3} className="g-4">
      {items.map((item) => (
        <Col key={item.id}>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={item.imageUrl} />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
              <Card.Text>
                {item.discountedPrice < item.price ? (
                  <div className="flex coloumn space-evenly">
                    <p className="price-old">{item.price}kr</p>{" "}
                    <div className="flex coloumn">
                      <p className="price-discount">{item.discountedPrice}kr</p>
                      <div className="discount-percent">
                        {campaignPriceCalculator(item.price, item.discountedPrice)}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex center-items ">
                    <p>{item.discountedPrice} kr</p>
                  </div>
                )}
              </Card.Text>
              <div className="flex space-evenly">
                <Button onClick={() => handleViewClick(item.id)} variant="primary">
                  View
                </Button>
                <Button onClick={() => addToCart(item)} variant="primary">
                  Add to Cart
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default ItemCards;
