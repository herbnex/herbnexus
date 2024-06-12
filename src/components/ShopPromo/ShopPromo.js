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
import promoImage1 from '../../assets/a.png'; // Replace with actual image path
import promoImage2 from '../../assets/b.png'; // Replace with actual image path

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
          <Col md={6} className="promo-images">
            <img src={promoImage1} alt="Herbal Products 1" className="promo-image img-fluid" />
            <img src={promoImage2} alt="Herbal Products 2" className="promo-image img-fluid" />
          </Col>
          <Col md={6} className="text-col">
            <p className="text-uppercase">For Your Health Goals</p>
            <h1 className="display-4">Herbal Supplements for Total Wellness</h1>
            <p className="lead">
              Shop our huge selection of herbal supplements and discover why we have thousands of reviews from happy customers who appreciate our quality of herbal supplements at amazing prices. Always manufactured in the USA, always made with quality as our #1 priority!
            </p>
            <Button href="https://shop.herbnexus.io" target="_blank" className="btn-shop mt-3">
              Shop Now
            </Button>
          </Col>
        </Row>
      </Container>
      <Container className="shop-categories py-5">
        <h2 className="text-center mb-4">Shop by Body System</h2>
        <p className="text-center mb-5">Select the body system you'd like to focus on.</p>
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
