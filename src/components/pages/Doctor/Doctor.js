import React, { useState, useEffect } from "react";
import { Alert, Badge, Card, Col, Container, Row, Button } from "react-bootstrap";
import { useParams, NavLink, useHistory } from "react-router-dom";
import Appoinment from "../Appointment/Appoinment";
import "./Doctor.css";
import { db } from "../../../Firebase/firebase.config";
import { doc, getDoc } from "firebase/firestore";

const Doctor = () => {
  const { doctorId } = useParams(); // This should be the id
  const [isOnline, setIsOnline] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const history = useHistory();

  // Fetch the doctor's online status and data
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const doctorRef = doc(db, "doctors", doctorId.toString());
        const doctorSnapshot = await getDoc(doctorRef);
        console.log("Doctor document snapshot:", doctorSnapshot);

        if (doctorSnapshot.exists()) {
          const doctorData = doctorSnapshot.data();
          console.log("Doctor data from Firestore:", doctorData);
          setIsOnline(doctorData.isOnline || false);
          setDoctor(doctorData);
        } else {
          console.log("Doctor document does not exist");
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };
    fetchDoctorData();
  }, [doctorId]);

  if (!doctor) {
    return <div className="alert">No result found</div>;
  }

  const handleChatLive = () => {
    history.push(`/contact?doctorId=${doctor.id}`);
  };

  return (
    <div>
      {/* DETAILS PAGE'S HEADING */}
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

      {/* DETAILS */}
      <Container className="details">
        <Row>
          <Col xs={12} lg={4}>
            <Card className="shadow mx-auto" style={{ width: "300px" }}>
              <Card.Img className="details-img" variant="top" src={doctor.image} />
              <Card.Body>
                <h3>{doctor.name}</h3>
                <h5 className="my-2 text-main">{doctor.speciality}</h5>
                <p>{doctor.bio}</p>
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
            </div>
          </Col>
        </Row>
      </Container>

      <Appoinment />
    </div>
  );
};

export default Doctor;
