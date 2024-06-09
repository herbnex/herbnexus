import React, { useState, useEffect } from "react";
import { Spinner, Container } from "react-bootstrap";
import { CallWithChatExperience } from "./CallWithChatExperience";

const ChatWithDoctor = () => {
  const [callProps, setCallProps] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCallProps = async () => {
      try {
        const response = await fetch("/.netlify/functions/getCallDetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId: "defaultUserId", doctorId: "defaultDoctorId" })
        });

        if (!response.ok) {
          throw new Error("Failed to fetch call details");
        }

        const data = await response.json();
        const userId = { communicationUserId: "defaultUserId" };
        const token = data.token;
        const displayName = "Default User";
        const endpointUrl = "https://<RESOURCE_NAME>.communication.azure.com";
        const locator = { groupId: data.groupId, threadId: data.threadId };

        setCallProps({
          userId,
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
  }, []);

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
