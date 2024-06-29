import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import './CategoryList.css';

const categories = [
  { name: 'Back-to-School Savings', image: 'https://via.placeholder.com/100' },
  { name: 'Birthday Gifts', image: 'https://via.placeholder.com/100' },
  { name: 'Wedding Gifts', image: 'https://via.placeholder.com/100' },
  { name: 'Home Gifts', image: 'https://via.placeholder.com/100' },
  { name: 'Garden & Floral Gifts', image: 'https://via.placeholder.com/100' },

];

const CategoryList = () => {
  return (
    <div className="category-list-container">
      <Row className="category-section">
        {categories.map((category, index) => (
          <Col key={index} xs={6} sm={4} md={2} className="category-item">
            <Card className="text-center category-card">
              <Card.Img variant="top" src={category.image} className="category-image" />
              <Card.Body>
                <div className="card-title-container">
                  <Card.Title className="card-title">{category.name}</Card.Title>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CategoryList;
