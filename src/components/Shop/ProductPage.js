import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Form, ListGroup, Tabs, Tab } from 'react-bootstrap';
import { useProduct } from './ProductContext';
import { FaShieldAlt, FaTruck, FaUndo } from 'react-icons/fa';

import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const { allProducts, addToCart } = useProduct();
  const product = allProducts.find((p) => p.id === parseInt(id));

  if (!product) return <div>Product not found.</div>;

  const { image, additionalImages = [], name, price, rating, reviews = [], demandText, saleEndDate, description } = product;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Container className="product-page-container">
      <Row>
        <Col md={6}>
          <Image src={image} fluid className="main-image" />
          <Row className="mt-3 additional-images">
            {additionalImages.map((img, idx) => (
              <Col key={idx} xs={4}>
                <Image src={img} thumbnail />
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={6}>
          <h2 className="product-name">{name}</h2>
          <p className="product-price">CA${price}</p>
          <p className="product-rating"><strong>{rating}</strong> stars ({reviews.length} reviews)</p>
         
          <Form.Group className="mt-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="number" defaultValue={1} min={1} className='quant'/>
          </Form.Group>
          <Button className="mt-4 add-to-cart-button" onClick={handleAddToCart}>Add to cart</Button>
          <p className="mt-3 in-demand-text">In demand. {demandText}</p>
          <p className="mt-1 sale-end-date">Sale ends on {saleEndDate}</p>
          <div className="policy-icons mt-4">
            <div className="policy-icon">
              <FaShieldAlt size={24} />
              <span>Security policy</span>
            </div>
            <div className="policy-icon">
              <FaTruck size={24} />
              <span>Delivery policy</span>
            </div>
            <div className="policy-icon">
              <FaUndo size={24} />
              <span>Return policy</span>
            </div>
          </div>
         
        </Col>
      </Row>
      <Tabs defaultActiveKey="description" id="product-details-tabs" className="mt-4">
        <Tab eventKey="description" title="Description">
          <div className="mt-3" dangerouslySetInnerHTML={{ __html: description }} />
        </Tab>
        <Tab eventKey="ingredients" title="Ingredients">
          <div className="mt-3 ingr">
            <Image src="https://cdn.shopify.com/s/files/1/0701/5592/7811/files/20220815154310-vox45htp-sf.png?v=1716655113" fluid />
          </div>
        </Tab>
        <Tab eventKey="reviews" title="Product reviews">
          <ListGroup className="mt-3">
            {reviews.map((review, idx) => (
              <ListGroup.Item key={idx}>
                <strong>{review.user}</strong> ({review.date})
                <p>{review.comment}</p>
                <p>Rating: {review.rating}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default ProductPage;
