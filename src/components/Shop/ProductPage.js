import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Form, ListGroup, Tabs, Tab } from 'react-bootstrap';
import { useProduct } from './ProductContext';
import { FaShieldAlt, FaTruck, FaUndo } from 'react-icons/fa';

import './ProductPage.css';

const ProductPage = () => {
  const { name } = useParams();
  const history = useHistory();
  const { allProducts, addToCart } = useProduct();
  
  const [currentMainImage, setCurrentMainImage] = useState('');
  const [currentAdditionalImages, setCurrentAdditionalImages] = useState([]);

  // Find the product by name
  const product = allProducts.find(
    (p) => p.name.toLowerCase().replace(/ /g, '-') === name
  );

  useEffect(() => {
    if (product) {
      setCurrentMainImage(product.image);
      setCurrentAdditionalImages(product.additionalImages || []);
    }
  }, [product]);

  if (!product) return <div>Product not found.</div>;

  const { name: productName, price, rating, reviews = [], demandText, saleEndDate, description } = product;

  const handleImageClick = (clickedImage) => {
    const newMainImage = clickedImage;
    const newAdditionalImages = currentAdditionalImages.map((img) =>
      img === clickedImage ? currentMainImage : img
    );
    setCurrentMainImage(newMainImage);
    setCurrentAdditionalImages(newAdditionalImages);
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  const ingredientImage = currentAdditionalImages.length > 4 ? currentAdditionalImages[4] : currentAdditionalImages[2]; // Fallback image if index 4 doesn't exist

  return (
    <Container className="product-page-container">
      <Row>
        <Col md={6}>
          <Image src={currentMainImage} fluid className="main-image" onClick={() => handleImageClick(currentMainImage)} />
          <Row className="mt-3 additional-images">
            {currentAdditionalImages.map((img, idx) => (
              <Col key={idx} xs={4}>
                <Image src={img} thumbnail onClick={() => handleImageClick(img)} />
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={6}>
          <h2 className="product-name">{productName}</h2>
          <p className="product-price fw-bolder">CA${price}</p>
          <p className="product-rating">{rating} stars ({reviews.length} reviews)</p>
         
          <Form.Group className="mt-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="number" defaultValue={1} min={1} className='quant'/>
          </Form.Group>
          <Button className="mt-4 add-to-cart-button" onClick={handleAddToCart}>Add to cart</Button>
          <p className="mt-3 in-demand-text">In demand. {demandText}</p>
          <p className="mt-1 sale-end-date">Sale ends on {saleEndDate}</p>
          <div className="policy-icons mt-4">
            <div className="policy-icon">
              <FaShieldAlt size={24} />
              <span>Security policy</span>
            </div>
            <div className="policy-icon">
              <FaTruck size={24} />
              <span>Delivery policy</span>
            </div>
            <div className="policy-icon">
              <FaUndo size={24} />
              <span>Return policy</span>
            </div>
          </div>
         
        </Col>
      </Row>
      <Tabs defaultActiveKey="description" id="product-details-tabs" className="mt-4 prodtabs">
        <Tab eventKey="description" title="Description">
          <div className="mt-3" dangerouslySetInnerHTML={{ __html: description }} />
        </Tab>
        <Tab eventKey="ingredients" title="Ingredients">
          <div className="mt-3 ingr">
            <Image src={ingredientImage} fluid />
          </div>
        </Tab>
        <Tab eventKey="reviews" title="Product reviews">
          <ListGroup className="mt-3">
            {reviews.map((review, idx) => (
              <ListGroup.Item key={idx}>
                <strong>{review.user}</strong> ({review.date})
                <p>{review.comment}</p>
                <p>Rating: {review.rating}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default ProductPage;
