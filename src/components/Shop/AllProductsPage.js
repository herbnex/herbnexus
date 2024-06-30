import React, { useState } from 'react';
import { Row, Col, Card, Button, Container, Dropdown } from 'react-bootstrap';
import { useProduct } from './ProductContext';
import { FaTh, FaThList } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import './AllProductsPage.css';

const AllProductsPage = () => {
  const { allProducts, addToCart } = useProduct();
  const history = useHistory();

  // Get unique categories
  const categories = ['All', ...new Set(allProducts.map(product => product.category))];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [view, setView] = useState('grid');

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleViewToggle = (viewType) => {
    setView(viewType);
  };

  const filteredProducts = selectedCategory === 'All' ? allProducts : allProducts.filter(product => product.category === selectedCategory);

  return (
    <Container className="all-products-page-container">
      <div className="category-tabs">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="header">
        <div className="header-left">
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
              color={view === 'grid' ? '#39CABB' : '#ccc'}
              onClick={() => handleViewToggle('grid')}
              className="view-icon"
            />
            <FaThList
              size={24}
              color={view === 'list' ? '#39CABB' : '#ccc'}
              onClick={() => handleViewToggle('list')}
              className="view-icon"
            />
          </div>
        </div>
      </div>
      <Row className={`product-grid ${view}`}>
        {filteredProducts.map(product => (
          <Col key={product.id} xs={6} sm={4} md={3} className={`product-card ${view}`}>
            <Card className="mb-4 prod">
              <Row noGutters>
                <Col md={view === 'list' ? 4 : 12}>
                  <Card.Img
                    variant="top"
                    src={product.image}
                    onClick={() => history.push(`/shop/product/${product.id}`)}
                  />
                </Col>
                <Col md={view === 'list' ? 8 : 12}>
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                      <span className="text-muted text-decoration-line-through">
                        ${product.price}
                      </span>{' '}
                      ${product.discountPrice}
                    </Card.Text>
                    {view === 'list' && (
                      <Card.Text className="product-description">
                        This is a brief description of the product to give users more context
                        about what it is and its benefits.
                      </Card.Text>
                    )}
                    <Button variant="primary" onClick={() => addToCart(product)}>
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AllProductsPage;
