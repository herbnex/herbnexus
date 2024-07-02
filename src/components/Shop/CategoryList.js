import React from 'react';
import { NavLink } from 'react-router-dom';

import { Row, Col, Card } from 'react-bootstrap';
import dh from '../../assets/dh.png'; 
import hb from '../../assets/hb.png'; 
import nh from '../../assets/nh.png'; 
import hh from '../../assets/hh.png'; 
import lh from '../../assets/lh.png'; 
import uth from '../../assets/uth.png'; 
import bjh from '../../assets/bjh.png'; 
import ih from '../../assets/ih.png'; 
import hlh from '../../assets/hlh.png'; 
import './CategoryList.css';

const categories = [
  
  { name: 'Digestive Health', image: dh },
  { name: 'Hormone Health', image: hh },
  { name: 'Neurological Health', image: nh },
  { name: 'Immune Health', image: ih },
  { name: 'Hollistc Health', image: hlh },
];

const CategoryList = () => {
  return (
    <div className="category-list-container">
      <Row className="category-section">
        {categories.map((category, index) => (
          <Col key={index} xs={4} sm={4} md={2} className="category-item">
            <Card className="text-center category-card">
            <NavLink to="/shop/category/" >

              <Card.Img variant="top" src={category.image} className="category-image" />
              <Card.Body>
                <div className="card-title-container">
                  <Card.Title className="card-title">{category.name}</Card.Title>
                </div>
               
              </Card.Body>
              </NavLink>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CategoryList;
