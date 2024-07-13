// Doctor.js
import React, { useState, useEffect } from "react";
import { Alert, Badge, Card, Col, Container, Row, Button, Form } from "react-bootstrap";
import { useParams, NavLink, useHistory, useLocation } from "react-router-dom";
import Appoinment from "../Appointment/Appoinment";
import { db } from "../../../Firebase/firebase.config";
import { doc, getDoc, onSnapshot, collection, addDoc, query, orderBy } from "firebase/firestore";
import "./Doctor.css";
import { format } from "date-fns";
import useAuth from "../../../hooks/useAuth"; // Import useAuth hook

const Doctor = () => {
  const { doctorId } = useParams();
  const [isOnline, setIsOnline] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const { user } = useAuth(); // Get the logged-in user
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const doctorRef = doc(db, "doctors", doctorId.toString());
        const doctorSnapshot = await getDoc(doctorRef);
        if (doctorSnapshot.exists()) {
          const doctorData = doctorSnapshot.data();
          setIsOnline(doctorData.isOnline || false);
          setDoctor(doctorData);
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    const fetchReviews = () => {
      const reviewsRef = collection(db, "doctors", doctorId.toString(), "reviews");
      const q = query(reviewsRef, orderBy("timestamp", "desc"));
      onSnapshot(q, (snapshot) => {
        const reviewsData = snapshot.docs.map(doc => doc.data());
        setReviews(reviewsData);
      });
    };

    fetchDoctorData();
    fetchReviews();
  }, [doctorId]);

  if (!doctor) {
    return <div className="alert">No result found</div>;
  }

  const handleChatLive = () => {
    history.push(`/contact?doctorId=${doctor.id}`);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      history.push('/login', { from: location });
      return;
    }
    try {
      const reviewRef = collection(db, "doctors", doctorId.toString(), "reviews");
      await addDoc(reviewRef, {
        review: newReview,
        rating: newReviewRating,
        timestamp: new Date(),
        userName: user.displayName,
        userId: user.uid,
      });
      setNewReview("");
      setNewReviewRating(5);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`bi bi-star${i <= rating ? "-fill" : ""}`}
          style={{ color: i <= rating ? "yellow" : "gray" }}
        ></i>
      );
    }
    return stars;
  };

  return (
    <div>
      <Container fluid className="details-heading">
        <Container className="name h-100">
          <Row className="h-100">
            <Col xs={12} lg={4}></Col>
            <Col xs={12} lg={8} className="d-flex justify-content-center align-items-center">
              <h1 className="title">{doctor.name}</h1>
              {isOnline ? <Badge pill bg="success">Online</Badge> : <Badge pill bg="warning">Offline</Badge>}
            </Col>
          </Row>
        </Container>
      </Container>

      <Container className="details">
        <Row>
          <Col xs={12} lg={4}>
            <Card className="shadow mx-auto" style={{ width: "300px" }}>
              <Card.Img className="details-img" variant="top" src={doctor.image} />
              <Card.Body >
                <h3>{doctor.name}</h3>
                <h5 className="my-2 text-main ">{doctor.speciality}</h5>
                {/* <p>{doctor.bio}</p> */}
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} lg={8}>
            <div className="details-main p-5">
              <h4 className="mb-3">Biography</h4>
              <p className="mb-3">{doctor.bio}</p>
              <Alert className="d-flex justify-content-between text-black px-4 rounded-pill">
                <span>Speciality: </span>
                {doctor.speciality}
              </Alert>
              <Alert className="d-flex justify-content-between text-black px-4 rounded-pill">
                <span>Degrees: </span>
                {doctor.degrees}
              </Alert>
              <Alert className="d-flex justify-content-between text-black px-4 rounded-pill">
                <span>Office: </span>
                {doctor.office}
              </Alert>
              {isOnline ? (
                <Button variant="outline" className="rounded-pill btn-main mt-2" onClick={handleChatLive}>
                  Chat Live &nbsp;
                  <i className="bi bi-chat-dots"></i>
                </Button>
              ) : (
                <NavLink to={`/doctor/${doctor.id}`} className="ms-auto">
                  <Button variant="outline" className="rounded-pill btn-main mt-2">
                    Make Appointment &nbsp;
                    <i className="bi bi-calendar2-day"></i>
                  </Button>
                </NavLink>
              )}

              {/* Reviews Section */}
              <div className="reviews mt-5">
                <h4>Reviews</h4>
                {reviews.map((review, index) => (
                  <Card key={index} className="mb-2">
                    <Card.Body>
                      <Card.Title>{review.userName}</Card.Title>
                      <Card.Text>{review.review}</Card.Text>
                      <Card.Subtitle className="text-muted">Rating: {renderStars(review.rating)}</Card.Subtitle>
                      <Card.Text className="text-muted">{format(new Date(review.timestamp.seconds * 1000), 'PPpp')}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </div>

              {/* Review Form */}
              <Form onSubmit={handleReviewSubmit} className="mt-4">
                <Form.Group controlId="review">
                  <Form.Label>Leave a Review</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="rating" className="mt-2">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control 
                    as="select" 
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(parseInt(e.target.value))}
                    required
                  >
                    <option value={5}>5 - Excellent</option>
                    <option value={4}>4 - Good</option>
                    <option value={3}>3 - Average</option>
                    <option value={2}>2 - Poor</option>
                    <option value={1}>1 - Terrible</option>
                  </Form.Control>
                </Form.Group>
                <Button type="submit" className="mt-3">
                  Submit Review
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      <Appoinment />
    </div>
  );
};

export default Doctor;
