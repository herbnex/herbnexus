import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

const CategoryProducts = ({ products, onAddToCart, onShowProductDetail }) => {
  return (
    <Row>
      {products.map((product, index) => (
        <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
          <Card className="product-card">
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>${product.price}</Card.Text>
              <Button variant="primary" onClick={() => onAddToCart(product)}>
                Add to Cart
              </Button>
              <Button variant="link" onClick={() => onShowProductDetail(product)}>
                View Details
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CategoryProducts;
