import React, { useState } from "react";
import { Col, Container, FloatingLabel, Form, Row, Button, Alert, Spinner } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import useDoctorList from "../../../hooks/useDoctorList";
import useAuth from "../../../hooks/useAuth";
import { db } from "../../../Firebase/firebase.config";
import { collection, addDoc } from "firebase/firestore";

import "./Appointment.css";

const Appointment = () => {
  const [doctors] = useDoctorList();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const history = useHistory(); // Using useHistory instead of useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const appointmentDetails = {
      doctorId: form.doctor.value,
      doctorName: form.doctor.options[form.doctor.selectedIndex].text,
      userId: user.uid,
      userName: form.name.value,
      userEmail: form.email.value,
      doctorEmail: doctors.find(doc => doc.id === form.doctor.value).email, 
      userPhone: form.phone.value,
      date: form.date.value,
      time: form.time.value,
    };

    try {
      // Save appointment in Firestore
      await addDoc(collection(db, "appointments"), appointmentDetails);

      form.reset();
      setTimeout(() => {
        history.push("/dashboard"); // Redirect to dashboard using useHistory
      }, 2000);
      // Send email notification
    const response = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userEmail: appointmentDetails.userEmail,
        doctorEmail: appointmentDetails.doctorEmail,
        subject: 'Appointment Booking Confirmation',
        message: `Your appointment with ${appointmentDetails.doctorName} has been booked for ${appointmentDetails.date} at ${appointmentDetails.time}.`,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response from email function:', errorData);
    }

    } catch (err) {
      setError("Failed to book appointment: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Container fluid className="appointment-heading">
        <Container className="name h-100">
          {/* <Row className="h-100">
            <Col xs={12} lg={8} className="d-flex justify-content-center align-items-center">
              <h1 className="title text-white">Book Your Herbal Consultation</h1>
            </Col>
          </Row> */}
        </Container>
      </Container>
      <Container className="appointment-panel">
        <Row>
          <Col >
            <h1 className="title text-center">Book an Appointment</h1>
            <p>
              Welcome to HERB NEXUS! Connect with our accredited herbalists for personalized herbal consultations.
              Whether you need advice on natural remedies or a holistic treatment plan, our experts are here to help.
            </p>
            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="appointment d-flex flex-column justify-content-center mt-4 pb-5">
              <Form onSubmit={handleSubmit}>
                <Row className="g-2">
                  <Col xs={12} sm={6}>
                    <Form.Group className="mb-3" controlId="doctor">
                      <FloatingLabel controlId="floatingSelect" label="Herbalist">
                        <Form.Select name="doctor" className="rounded-pill ps-4" aria-label="Herbalist">
                          {doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                              {doctor.name}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Form.Group>
                  </Col>

                  <Col xs={12} sm={6}>
                    <Form.Group className="mb-3" controlId="name">
                      <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
                        <Form.Control name="name" className="rounded-pill ps-4" type="text" placeholder="name" required />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>

                  <Col xs={12} sm={6}>
                    <Form.Group className="mb-3" controlId="email">
                      <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                        <Form.Control name="email" className="rounded-pill ps-4" type="email" placeholder="email" required />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>

                  <Col xs={12} sm={6}>
                    <Form.Group className="mb-3" controlId="phone">
                      <FloatingLabel controlId="floatingInput" label="Phone" className="mb-3">
                        <Form.Control name="phone" className="rounded-pill ps-4" type="text" placeholder="Phone" required />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>

                  <Col xs={12} sm={6}>
                    <Form.Group className="mb-3" controlId="date">
                      <FloatingLabel controlId="floatingInput" label="Date" className="mb-3">
                        <Form.Control name="date" className="rounded-pill ps-4" type="date" placeholder="date" required />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>

                  <Col xs={12} sm={6}>
                    <Form.Group className="mb-3" controlId="time">
                      <FloatingLabel controlId="floatingInput" label="Time" className="mb-3">
                        <Form.Control name="time" className="rounded-pill ps-4" type="time" placeholder="time" required />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>

                  <Button variant="outline" className="btn-main rounded-pill p-3 w-100" type="submit">
                    {loading ? <Spinner animation="border" size="sm" /> : "Book Appointment"}
                  </Button>
                </Row>
              </Form>
            </div>
          </Col>

          
        </Row>
      </Container>
    </div>
  );
};

export default Appointment;
