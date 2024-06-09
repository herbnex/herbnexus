import React, { useState, useEffect } from "react";
import { Spinner, Container } from "react-bootstrap";
import { CallWithChatExperience } from "./CallWithChatExperience";
import { collection, query, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../../../Firebase/firebase.config";
import useAuth from "../../../hooks/useAuth";

const ChatWithDoctor = () => {
  const { user } = useAuth();
  const [callProps, setCallProps] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCallProps = async () => {
      try {
        if (!user) return;

        // Fetch doctor ID from Firestore (example: getting the first doctor)
        const doctorsQuery = query(collection(db, 'doctors'));
        const doctorSnapshot = await getDocs(doctorsQuery);
        if (doctorSnapshot.empty) {
          throw new Error('No doctor found');
        }
        const doctorId = doctorSnapshot.docs[0].id;

        const response = await fetch("/.netlify/functions/getCallDetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId: user.uid, doctorId })
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
  }, [user]);

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
