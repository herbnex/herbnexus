import React, { useState, useEffect } from "react";
import { Spinner, Container } from "react-bootstrap";
import { CallWithChatExperience } from "./CallWithChatExperience";
import firebase from 'firebase/app'; // Ensure you have firebase initialized
import 'firebase/firestore';

const ChatWithDoctor = () => {
  const [callProps, setCallProps] = useState(null);
  const [error, setError] = useState("");
  const [doctorId, setDoctorId] = useState(null);
  const userId = "defaultUserId"; // Replace with actual user ID logic

  useEffect(() => {
    const fetchDoctorId = async () => {
      try {
        const firestore = firebase.firestore();
        const doctorRef = await firestore.collection('doctors').limit(1).get();
        if (!doctorRef.empty) {
          const doctorDoc = doctorRef.docs[0];
          setDoctorId(doctorDoc.id);
        } else {
          setError('Doctor not found');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDoctorId();
  }, []);

  useEffect(() => {
    const fetchCallProps = async () => {
      try {
        if (!doctorId) return;

        const response = await fetch("/.netlify/functions/getCallDetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId, doctorId })
        });

        if (!response.ok) {
          throw new Error("Failed to fetch call details");
        }

        const data = await response.json();
        const userIdObject = { communicationUserId: userId };
        const token = data.token;
        const displayName = "Default User";
        const endpointUrl = "https://<RESOURCE_NAME>.communication.azure.com";
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

    if (doctorId) fetchCallProps();
  }, [doctorId]);

  if (error) {
    return <Container><h1>Error: {error}</h1></Container>;
  }

  if (!callProps) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <h1>Chat with Doctor</h1>
      <CallWithChatExperience {...callProps} />
    </Container>
  );
};

export default ChatWithDoctor;
