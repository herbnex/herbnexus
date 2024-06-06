// src/components/ConsultationHistory/ConsultationHistory.js
import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Spinner } from 'react-bootstrap';
import useAuth from "../../../src/hooks/useAuth";
import { database } from '../../../src/Firebase/firebase.config';
import { ref, onValue } from 'firebase/database';
import './ConsultationHistory.css';

const ConsultationHistory = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [consultationHistory, setConsultationHistory] = useState([]);

  useEffect(() => {
    if (!user) {
      console.error("User is not authenticated!");
      return;
    }

    const fetchConsultationHistory = async () => {
      setLoading(true);
      const userChatsRef = ref(database, `users/${user.uid}/chats`);
      onValue(userChatsRef, async (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const chatIds = Object.keys(data);
          const uniqueDoctors = {};
          for (const chatId of chatIds) {
            const chatRef = ref(database, `chats/${chatId}/messages`);
            const chatSnapshot = await new Promise((resolve) => {
              onValue(chatRef, resolve, { onlyOnce: true });
            });
            const messages = chatSnapshot.val();
            if (messages) {
              for (const key in messages) {
                const message = messages[key];
                if (message.userId !== user.uid) {
                  if (!uniqueDoctors[message.userId]) {
                    uniqueDoctors[message.userId] = {
                      doctorName: message.user,
                      firstMessage: message.timestamp,
                      lastMessage: message.timestamp,
                    };
                  } else {
                    uniqueDoctors[message.userId].lastMessage = message.timestamp;
                  }
                }
              }
            }
          }
          setConsultationHistory(Object.values(uniqueDoctors));
        }
        setLoading(false);
      });
    };

    fetchConsultationHistory();
  }, [user]);

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <Card className="consultation-history-card">
      <Card.Header>Consultation History</Card.Header>
      <Card.Body>
        <ListGroup>
          {consultationHistory.map((doctor, index) => (
            <ListGroup.Item key={index}>
              <div className="consultation-history-item">
                <h5>{doctor.doctorName}</h5>
                <p>First conversation: {new Date(doctor.firstMessage).toLocaleString()}</p>
                <p>Last conversation: {new Date(doctor.lastMessage).toLocaleString()}</p>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default ConsultationHistory;
