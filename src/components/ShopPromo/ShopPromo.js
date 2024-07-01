import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Slider from 'react-slick';
import './ShopPromo.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
import SectionTitle from "../SectionTitle/SectionTitle";
import { NavLink } from 'react-router-dom';

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplaySpeed: 2000,
    autoplay: true,
    cssEase: "linear",
    pauseOnHover: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: true,
    autoplaySpeed: 2000,
    autoplay: true,
    cssEase: "linear",
    pauseOnHover: true,
    swipeToSlide: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          vertical: true, // Enable vertical sliding for mobile
          verticalSwiping: true ,
          dots: true,
    infinite: true,
    speed: 2000,
    swipeToSlide: true,
    arrows: true,
    autoplaySpeed: 2000,
    autoplay: true,
    cssEase: "linear",
    pauseOnHover: true,
  
    
        }
      }
      
    ]
  };

  return (
    <Container fluid className="shop-promo">
      <Container className="herb py-5">
        <Row className="align-items-center">
          <Col md={6} className="promo-images">
            <img src={promoImage1} alt="Herbal Products 1" className="promo-image img-fluid image-1" />
            <img src={promoImage2} alt="Herbal Products 2" className="promo-image img-fluid image-2" />
          </Col>
          <Col md={6} className="text-col">
          <Container className="shop-categories py-5">
          
        <Slider {...settings}>
          {categories.map((category, index) => (
            <div key={index} className="text-center category-slide">
              <img src={category.icon} alt={category.title} className="category-icon mb-3" />
              <h5>{category.title}</h5>
              <NavLink to="/shop" className="mx-auto">

              <Button variant="outline-secondary" className="mt-2">Browse Products</Button>
           </NavLink >
            </div>
          ))}
        </Slider>
      </Container>
          </Col>
        </Row>
      </Container>
      
    </Container>
  );
};

export default ShopPromo;
