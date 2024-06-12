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
import promoImage1 from '../../assets/a.png';
import promoImage2 from '../../assets/b.png';
import SectionTitle from "../SectionTitle/SectionTitle";

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
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
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
      
            <Slider {...settings}>
              {categories.map((category, index) => (
                <div key={index} className="text-center category-slide">
                  <Row>
                    {[0, 1, 2].map(rowIndex => (
                      <Col key={rowIndex} xs={4}>
                        {categories[index + rowIndex] && (
                          <>
                            <img src={categories[index + rowIndex].icon} alt={categories[index + rowIndex].title} className="category-icon mb-3" />
                            <h5>{categories[index + rowIndex].title}</h5>
                            <Button variant="outline-secondary" className="mt-2">Browse Products</Button>
                          </>
                        )}
                      </Col>
                    ))}
                  </Row>
                </div>
              ))}
            </Slider>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default ShopPromo;
