import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ product, handleAddToCart, handleShowProductDetail }) => (
  <Card className="mb-4">
    <Card.Img
      variant="top"
      src={product.image}
      onClick={() => handleShowProductDetail(product)}
    />
    <Card.Body>
      <Card.Title>{product.name}</Card.Title>
      <Card.Text>
        <span className="text-muted text-decoration-line-through">
          ${product.price}
        </span>{' '}
        ${product.discountPrice}
      </Card.Text>
      <Card.Text>
        Rating: {product.rating} ({product.reviews.length} reviews)
      </Card.Text>
      <Button variant="primary" onClick={() => handleAddToCart(product)}>
        Add to Cart
      </Button>
    </Card.Body>
  </Card>
);

export default ProductCard;
