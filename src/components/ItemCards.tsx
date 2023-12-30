
// Export default ItemCards;

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ItemCards({ items }) { // Accept items as a prop
  if (!items || items.length === 0) {
    return <div>No items to display</div>;
  }

  return (
    <Row xs={1} md={3} className="g-4">
      {items.map((item) => (
        <Col key={item.id}>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={item.media} /> {/* Assuming 'media' is the image URL */}
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>
                {item.description} {/* Assuming 'description' is part of your item */}
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default ItemCards;
