import React from 'react';
import { Modal, Button, Image, ListGroup } from 'react-bootstrap';

const ProductDetailModal = ({ show, onHide, product, onAddToCart }) => {
  if (!product) return null;

  const { image, name, price, rating, reviews } = product;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image src={image} fluid />
        <p>Price: ${price}</p>
        <p>Rating: {rating} stars</p>
        <h4>Reviews:</h4>
        <ListGroup>
          {reviews.map((review, index) => (
            <ListGroup.Item key={index}>
              <strong>{review.user}</strong> ({review.date})
              <p>{review.comment}</p>
              <p>Rating: {review.rating}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={() => onAddToCart(product)}>Add to Cart</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetailModal;
