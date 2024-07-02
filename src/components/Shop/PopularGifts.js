import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import './PopularGifts.css';

const PopularGifts = ({ products, onAddToCart, onShowProductDetail }) => {
  return (
    <>
      <h4 className="text-left">Popular gifts right now</h4>
      <Row className="popular-gifts">
        {products.slice(0, 4).map(product => (
          <Col key={product.id} className="product-card">
            <Card className="mb-4">
              <Card.Img
                variant="top"
                src={product.image}
                onClick={() => onShowProductDetail(product)}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  <span className="fw-normal">
                    ${product.price}
                  </span>{' '}
                  {/* ${product.discountPrice} */}
                </Card.Text>
                {/* Render reviews count correctly */}
                {/* <Card.Text>
                  Rating: {product.rating} ({product.reviews.length} reviews)
                </Card.Text> */}
                <Button variant="primary" onClick={() => onAddToCart(product)}>
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default PopularGifts;
