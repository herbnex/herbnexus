import React, { useState, useEffect } from "react";
import { Spinner, Container, Row, Col, ListGroup } from "react-bootstrap";
import { CallWithChatExperience } from "./CallWithChatExperience";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../../src/Firebase/firebase.config";
import useAuth from "../../../src/hooks/useAuth";

const ChatWithDoctor = () => {
  const { user } = useAuth();
  const [callProps, setCallProps] = useState(null);
  const [error, setError] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsQuery = query(collection(db, 'doctors'));
        const doctorSnapshot = await getDocs(doctorsQuery);
        if (doctorSnapshot.empty) {
          throw new Error('No doctors found');
        }
        setDoctors(doctorSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchCallProps = async () => {
      try {
        if (!user || !selectedDoctor) return;

        const response = await fetch("/.netlify/functions/getCallDetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId: user.uid, doctorId: selectedDoctor.id })
        });

        if (!response.ok) {
          throw new Error("Failed to fetch call details");
        }

        const data = await response.json();
        const userIdObject = { communicationUserId: user.uid };
        const token = data.token;
        const displayName = user.displayName || "User";
        const endpointUrl = process.env.REACT_APP_AZURE_COMMUNICATION_SERVICES_ENDPOINT;
        const locator = { groupId: data.groupId, threadId: data.threadId };

        setCallProps({
          userId: userIdObject,
          token,
          displayName,
          endpointUrl,
          locator,
          formFactor: 'desktop',
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCallProps();
  }, [user, selectedDoctor]);

  if (error) {
    return <Container><h1>Error: {error}</h1></Container>;
  }

  if (!callProps) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <Row>
        <Col md={3}>
          <h2>Active Doctors</h2>
          <ListGroup>
            {doctors.map(doctor => (
              <ListGroup.Item key={doctor.id} action onClick={() => setSelectedDoctor(doctor)}>
                {doctor.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={9}>
          <h1>Chat with Doctor</h1>
          {selectedDoctor ? (
            <CallWithChatExperience {...callProps} />
          ) : (
            <p>Select a doctor to start a chat and video call.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ChatWithDoctor;
