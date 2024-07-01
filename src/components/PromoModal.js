import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Slider from 'react-slick';
import { NavLink } from 'react-router-dom';

import { useProduct } from '../components/Shop/ProductContext'; // Import useProduct hook
import './PromoModal.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PromoModal = () => {
  const [show, setShow] = useState(false);
  const { allProducts } = useProduct();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 1000); // Show modal after 7 seconds

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  const handleClose = () => setShow(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          vertical: true, // Enable vertical sliding for mobile
          verticalSwiping: true ,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          vertical: true, // Enable vertical sliding for mobile
          verticalSwiping: true ,
        }
      }
    ]
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
      <NavLink to="/shop" >

        <Modal.Title className='tit'>Herbal Shop</Modal.Title>
        </NavLink>
      </Modal.Header>
      <Modal.Body>
        <Slider {...settings}>
          {allProducts.slice(0, 8).map((product) => (
            <div key={product.id} className="text-center product-slide">
                 <NavLink to="/shop" onClick={handleClose}>
              <div className="product-container">
                <img src={product.image} alt={product.name} className="product-image mb-3" />
                <h5>{product.name}</h5>
                <p>${product.price.toFixed(2)}</p>
              </div>
              </NavLink>
            </div>
          ))}
        </Slider>
      </Modal.Body>
    </Modal>
  );
};

export default PromoModal;
