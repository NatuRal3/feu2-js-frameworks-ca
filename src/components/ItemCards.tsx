
// Export default ItemCards;
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';


type Item = {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
};

type ItemCardsProps = {
  items: Item[]; // items is an array of Item objects
};

function ItemCards({ items }: ItemCardsProps) {
  const navigate = useNavigate();
 console.log (items)
    if (!items || items.length === 0) {
    return <div>No items to display</div>;
  }

  function handleViewClick(id:string){
  
    navigate(`/product/${id}`)
  }
  function handleCartClick(id:string){

  }

  return (
    <Row xs={1} md={3} className="g-4">
      {items.map((item) => (
        <Col key={item.id}>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={item.imageUrl} /> {/* Assuming 'media' is the image URL */}
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>
                {item.description} {/* Assuming 'description' is part of your item */}
              </Card.Text>
              <Button onClick={()=> handleViewClick(item.id)} variant="primary">View</Button>
              <Button onClick={()=> handleCartClick(item.id)} variant="primary">Add to Cart</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default ItemCards;
