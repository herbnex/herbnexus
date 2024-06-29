import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Form, ListGroup, Dropdown } from 'react-bootstrap';
import { useProduct } from './ProductContext';
import { FaTh, FaThList } from 'react-icons/fa';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const { allProducts, addToCart } = useProduct();
  const product = allProducts.find((p) => p.id === parseInt(id));

  const categories = ['All', ...new Set(allProducts.map(product => product.category))];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [view, setView] = useState('grid');

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    history.push(`/shop/category/${category}`);
  };

  const handleViewToggle = (viewType) => {
    setView(viewType);
  };

  const filteredProducts = selectedCategory === 'All' ? allProducts : allProducts.filter(product => product.category === selectedCategory);

  if (!product) return <div>Product not found.</div>;

  const { image, additionalImages = [], name, price, rating, reviews = [], colors = [], designOptions = [], demandText, saleEndDate } = product;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Container className="product-page-container">
      <div className="category-tabs">
        {categories.map((cat, index) => (
          <button
            key={index}
            className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => handleCategorySelect(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="header">
        <div className="sort-options">
          <span className="sort-label">Sort by:</span>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Featured
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#">Price: Low to High</Dropdown.Item>
              <Dropdown.Item href="#">Price: High to Low</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="header-right">
          <div className="item-count">
            {filteredProducts.length} items
          </div>
          <div className="view-toggle">
            <FaTh
              size={24}
              color={view === 'grid' ? '#a42f37' : '#ccc'}
              onClick={() => handleViewToggle('grid')}
              className="view-icon"
            />
            <FaThList
              size={24}
              color={view === 'list' ? '#a42f37' : '#ccc'}
              onClick={() => handleViewToggle('list')}
              className="view-icon"
            />
          </div>
        </div>
      </div>
      <Row>
        <Col md={6}>
          <Image src={image} fluid />
          <Row className="mt-3">
            {additionalImages.map((img, idx) => (
              <Col key={idx} xs={3}>
                <Image src={img} thumbnail />
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={6}>
          <h2>{name}</h2>
          <p>CA${price}</p>
          <p><strong>{rating}</strong> stars ({reviews.length} reviews)</p>
          <Form.Group>
            <Form.Label>Color</Form.Label>
            <Form.Control as="select">
              {colors.map((color, idx) => (
                <option key={idx} value={color}>{color}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Design Option</Form.Label>
            <Form.Control as="select">
              {designOptions.map((option, idx) => (
                <option key={idx} value={option}>{option}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Add your personalization</Form.Label>
            <Form.Control type="text" placeholder="Enter personalization" />
          </Form.Group>
          <Button className="mt-4" onClick={handleAddToCart}>Add to basket</Button>
          <p className="mt-3">In demand. {demandText}</p>
          <p className="mt-1">Sale ends on {saleEndDate}</p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={12}>
          <h3>Reviews</h3>
          <ListGroup>
            {reviews.map((review, idx) => (
              <ListGroup.Item key={idx}>
                <strong>{review.user}</strong> ({review.date})
                <p>{review.comment}</p>
                <p>Rating: {review.rating}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
