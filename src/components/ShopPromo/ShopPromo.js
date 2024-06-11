import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './ShopPromo.css';
import dh from '../../assets/dh.png'; 
import hb from '../../assets/hb.png'; 
import nh from '../../assets/nh.png'; 
import hh from '../../assets/hh.png'; 
import lh from '../../assets/lh.png'; 
import uth from '../../assets/uth.png'; 
import bjh from '../../assets/bjh.png'; 
import ih from '../../assets/ih.png'; 
import hlh from '../../assets/hlh.png'; 


const ShopPromo = () => {
  const categories = [
    { icon: dh, title: "Digestive Health" },
    { icon: hb, title: "Healthy Blood" },
    { icon: hh, title: "Hormone Health" },
    { icon: nh, title: "Neurological Health" },
    { icon: lh, title: "Lung Health" },
    { icon: uth, title: "Urinary Tract Health" },
    { icon: bjh, title: "Bone And Joint Health" },
    { icon: ih, title: "Immune Health" },
    { icon: hlh, title: "Holistic Health" },
  ];

  return (
    <Container fluid className="shop-promo">
        <Container className="py-5">
        <Row className="align-items-center">
          <Col md={6} className="text-col">
            <h1 className="display-4">Discover the Best Herbal Products</h1>
            <p className="lead">
              Visit our in-house herbal marketplace for a wide range of herbs and related items.
              Quality products curated by our accredited herbalists.
            </p>
            <Button href="https://shop.herbnexus.io" target="_blank" className="btn-shop mt-3">
              Visit the Shop
            </Button>
          </Col>
          <Col md={6} className="image-col">
            <img src="path-to-your-herbal-image.png" alt="Herbal Products" className="img-fluid" />
          </Col>
        </Row>
      </Container>
  
      <Container className="shop-categories py-5">
        
        <Row>
          {categories.map((category, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4 text-center">
              <img src={category.icon} alt={category.title} className="category-icon mb-3" />
              <h5>{category.title}</h5>
              <Button variant="outline-secondary" className="mt-2">Browse Products</Button>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default ShopPromo;
