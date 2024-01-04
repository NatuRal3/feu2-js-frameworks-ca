
// Export default ItemCards;

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';

function ItemCards({ items }) { // Accept items as a prop
 const navigate = useNavigate();
 console.log (items)
    if (!items || items.length === 0) {
    return <div>No items to display</div>;
  }

  function handleViewClick(id){
  
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
