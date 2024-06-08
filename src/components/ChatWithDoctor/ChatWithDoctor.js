import React, { useState, useEffect } from "react";
import { Spinner, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { CallWithChatExperience } from "./CallWithChatExperience";
import useAuth from "../../../src/hooks/useAuth";

const ChatWithDoctor = () => {
  const { doctorId } = useParams();
  const { user } = useAuth();
  const [callProps, setCallProps] = useState(null);

  useEffect(() => {
    if (user && doctorId) {
      const fetchCallProps = async () => {
        const response = await fetch("/.netlify/functions/getCallDetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId: user.id, doctorId: doctorId })
        });
        const data = await response.json();
        const userId = { communicationUserId: user.id };
        const token = data.token;
        const displayName = user.displayName;
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
      };

      fetchCallProps();
    }
  }, [user, doctorId]);

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
