import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
import './EditorsPicks.css';

const EditorsPicks = ({ products, handleAddToCart, handleShowProductDetail }) => {
  return (
    <div className="editors-picks-container">
      <Row className="mb-4">
        
        <Col md={6} className="d-flex flex-column justify-content-center">
          <h5>Editors' Picks</h5>
          <h2>Back-to-school savings</h2>
          <p>Shop these unique finds</p>
        </Col>
        <Col md={6} className="editors-picks-images">
          <div className="editors-picks-grid">
            {products.slice(0, 3).map(pick => (
              <div key={pick.id} className="editors-pick-item small">
                <ProductCard 
                  product={pick} 
                  handleAddToCart={handleAddToCart} 
                  handleShowProductDetail={handleShowProductDetail} 
                />
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <div className="editors-picks-grid">
            {products.slice(3, 6).map(pick => (
              <div key={pick.id} className="editors-pick-item small">
                <ProductCard 
                  product={pick} 
                  handleAddToCart={handleAddToCart} 
                  handleShowProductDetail={handleShowProductDetail} 
                />
              </div>
            ))}
          </div>
        </Col>
        <Col md={6} className="d-flex flex-column justify-content-center">
          <p>We've got all the supplies you're searching for! From the classroom to the student room, find A+ items for under $50.</p>
        </Col>
      </Row>
    </div>
  );
};

export default EditorsPicks;
