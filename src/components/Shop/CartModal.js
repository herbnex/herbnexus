import React from 'react';
import { Modal, ListGroup, Button, Form } from 'react-bootstrap';

const CartModal = ({ show, onHide, cart, onRemoveFromCart, onPlaceOrder }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Checkout</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <ListGroup className="mb-3">
        {cart.map((item, index) => (
          <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
            {item.name} - ${item.discountPrice}
            <Button variant="outline-danger" size="sm" onClick={() => onRemoveFromCart(item.id)}>Remove</Button>
          </ListGroup.Item>
        ))}
        <ListGroup.Item>
          <strong>Total: ${cart.reduce((total, item) => total + item.discountPrice, 0).toFixed(2)}</strong>
        </ListGroup.Item>
      </ListGroup>
      <Form onSubmit={onPlaceOrder}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" required />
        </Form.Group>
        <Form.Group controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Enter your address" required />
        </Form.Group>
        <Form.Group controlId="formCard">
          <Form.Label>Credit Card</Form.Label>
          <Form.Control type="text" placeholder="Enter your credit card number" required />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Place Order
        </Button>
      </Form>
    </Modal.Body>
  </Modal>
);

export default CartModal;
