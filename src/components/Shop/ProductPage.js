import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Form, ListGroup, Tabs, Tab, Alert } from 'react-bootstrap';
import { useProduct } from './ProductContext';
import useAuth  from '../../../src/hooks/useAuth'; // Import useAuth hook
import { FaShieldAlt, FaTruck, FaUndo, FaStar } from 'react-icons/fa';
import { db } from '../../Firebase/firebase.config';
import { collection, addDoc, query, onSnapshot } from 'firebase/firestore';
import './ProductPage.css';

const ProductPage = () => {
  const { name } = useParams();
  const history = useHistory();
  const { allProducts, addToCart } = useProduct();
  const { user } = useAuth(); // Get the logged-in user

  const [currentMainImage, setCurrentMainImage] = useState('');
  const [currentAdditionalImages, setCurrentAdditionalImages] = useState([]);
  const [newReview, setNewReview] = useState({ comment: '', rating: 0 });
  const [error, setError] = useState('');
  const [reviews, setReviews] = useState([]);

  // Find the product by name
  const product = allProducts.find(
    (p) => p.name.toLowerCase().replace(/ /g, '-') === name
  );

  useEffect(() => {
    if (product) {
      setCurrentMainImage(product.image);
      setCurrentAdditionalImages(product.additionalImages || []);

      // Fetch reviews from Firestore
      const reviewsRef = collection(db, 'products', product.id.toString(), 'reviews');
      const q = query(reviewsRef);

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedReviews = [];
        querySnapshot.forEach((doc) => {
          fetchedReviews.push({ id: doc.id, ...doc.data() });
        });
        setReviews(fetchedReviews);
      });

      return () => unsubscribe();
    }
  }, [product]);

  if (!product) return <div>Product not found.</div>;

  const { name: productName, price, rating, demandText, saleEndDate, description } = product;

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

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (newReview.rating === 0 || newReview.comment === '') {
      setError('Please fill out all fields');
      return;
    }

    try {
      // Add the new review to Firestore
      await addDoc(collection(db, 'products', product.id.toString(), 'reviews'), {
        user: user.name,
        date: new Date().toLocaleDateString(),
        ...newReview
      });
      setNewReview({ comment: '', rating: 0 });
      setError('');
    } catch (error) {
      console.error("Error adding review:", error);
      setError('Error adding review. Please try again.');
    }
  };

  const ingredientImage = currentAdditionalImages.length > 4 ? product.additionalImages[4] : product.additionalImages[2]; // Fallback image if index 4 doesn't exist

  const renderStars = (count) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar key={i} color={i < count ? '#FFD700' : '#ccc'} />
      );
    }
    return stars;
  };

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
          {/* <p className="product-rating">{rating} stars ({reviews.length} reviews)</p> */}
         
          <Form.Group className="mt-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="number" defaultValue={1} min={1} className='quant'/>
          </Form.Group>
          <Button className="mt-4 add-to-cart-button" onClick={handleAddToCart}>Add to cart</Button>
          <p className="mt-3 in-demand-text">In demand. {demandText}</p>
          <p className="mt-1 sale-end-date">Sale ends on {saleEndDate}</p>
          <div className="policy-icons mt-4">
            <div className="policy-icon">
              <NavLink to="/shop/security-policy">
                <FaShieldAlt size={24} />
                <span>Security policy</span>
              </NavLink>
            </div>
            <div className="policy-icon">
              <NavLink to="/shop/delivery-policy">
                <FaTruck size={24} />
                <span>Delivery policy</span>
              </NavLink>
            </div>
            <div className="policy-icon">
              <NavLink to="/shop/return-policy">
                <FaUndo size={24} />
                <span>Return policy</span>
              </NavLink>
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
          <div className="mt-3">
            {user ? (
              <Form onSubmit={handleReviewSubmit}>
                <Form.Group>
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    as="select"
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                  >
                    <option value="0">Select Rating</option>
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  />
                </Form.Group>
                {error && <Alert variant="danger">{error}</Alert>}
                <Button type="submit" className="mt-3">Submit Review</Button>
              </Form>
            ) : (
              <Alert variant="info">Please log in to write a review</Alert>
            )}
            <h4 className="mt-4">Customer reviews</h4>
            {reviews.length > 0 ? (
              <ListGroup>
                {reviews.map((review, idx) => (
                  <ListGroup.Item key={idx} className="review-item">
                    <div className="review-header">
                      <div className="review-rating">
                        {renderStars(review.rating)}
                      </div>
                      <div className="review-meta">
                        <strong>{review.user}</strong>
                        <span className="review-date">{review.date}</span>
                      </div>
                    </div>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p>No reviews yet. Be the first to write one!</p>
            )}
          </div>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default ProductPage;
