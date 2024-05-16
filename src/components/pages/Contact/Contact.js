import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, ListGroup, Form, Button, InputGroup, FormControl, Badge } from "react-bootstrap";
import { ref, set, onValue, push } from "firebase/database";
import { database, db } from "../../../Firebase/firebase.config";
import { doc, getDocs, collection, query, where, getDoc } from "firebase/firestore";
import useAuth from "../../../hooks/useAuth";
import { generateChatId } from "../../../utils/generateChatId";
import "./Contact.css";

const Contact = () => {
  const { user } = useAuth();
  const [onlineDoctors, setOnlineDoctors] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [msgList, setMsgList] = useState([]);
  const [message, setMessage] = useState('');
  const [isDoctor, setIsDoctor] = useState(false);
  const msgBoxRef = useRef(null);

  useEffect(() => {
    if (!user) {
      console.error("User is not authenticated!");
      return;
    }

    const checkIfDoctor = async () => {
      const userDocRef = doc(db, "doctors", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        setIsDoctor(true);
      } else {
        setIsDoctor(false);
      }
    };

    checkIfDoctor();
  }, [user]);

  useEffect(() => {
    if (isDoctor) {
      fetchActiveUsers();
    } else {
      fetchOnlineDoctors();
    }
  }, [isDoctor, user]);

  const fetchOnlineDoctors = async () => {
    const doctorsRef = collection(db, "doctors");
    const q = query(doctorsRef, where("isOnline", "==", true));
    const querySnapshot = await getDocs(q);
    const doctors = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Fetched online doctors:", doctors); // Debugging log

    // Deduplicate doctors
    const uniqueDoctors = doctors.filter((doctor, index, self) =>
      index === self.findIndex((d) => d.id === doctor.id)
    );

    setOnlineDoctors(uniqueDoctors);
  };

  const fetchActiveUsers = async () => {
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(usersRef);
    const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Fetched active users:", users); // Debugging log

    // Deduplicate users
    const uniqueUsers = users.filter((user, index, self) =>
      index === self.findIndex((u) => u.id === user.id)
    );

    setActiveUsers(uniqueUsers);
  };

  useEffect(() => {
    if (!user || !selectedParticipant) {
      return;
    }

    const chatId = isDoctor
      ? generateChatId(selectedParticipant.id, user.displayName) // Doctor: user.displayName is the user name
      : generateChatId(user.uid, selectedParticipant.name); // User: selectedParticipant.id is the doctor id

    console.log("Generated Chat ID:", chatId); // Debugging log
    const chatRef = ref(database, `chats/${chatId}/messages`);

    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messages = Object.values(data);
        console.log("Fetched messages:", messages); // Debugging log
        setMsgList(messages);
      } else {
        setMsgList([]);
      }
    });

    return () => unsubscribe();
  }, [user, selectedParticipant, isDoctor]);

  useEffect(() => {
    if (msgBoxRef.current) {
      msgBoxRef.current.scrollTop = msgBoxRef.current.scrollHeight;
    }
  }, [msgList]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedParticipant) {
      return;
    }

    const newMessage = {
      user: user.displayName || "Anonymous",
      userId: user.uid,
      text: message,
      timestamp: new Date().toISOString()
    };

    const chatId = isDoctor
      ? generateChatId(selectedParticipant.id, user.displayName) // Doctor: user.displayName is the user name
      : generateChatId(user.uid, selectedParticipant.name); // User: selectedParticipant.id is the doctor id

    const chatRef = ref(database, `chats/${chatId}/messages`);
    const newMessageRef = push(chatRef);

    await set(newMessageRef, newMessage);
    console.log("Sent message:", newMessage); // Debugging log
    setMessage('');
  };

  return (
    <Container fluid className="chat-room">
      <Row>
        <Col md={4} className="participants-list">
          <h3>{isDoctor ? "Users" : "Online Doctors"}</h3>
          <ListGroup>
            {(isDoctor ? activeUsers : onlineDoctors).map(participant => (
              <ListGroup.Item
                key={`${isDoctor ? "user" : "doctor"}-${participant.id}`} // Ensure unique key with a prefix
                active={selectedParticipant && selectedParticipant.id === participant.id}
                onClick={() => setSelectedParticipant(participant)}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{participant.name}</h5>
                    <p>{isDoctor ? participant.email : participant.speciality}</p>
                  </div>
                  <Badge bg="success">Online</Badge>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={8} className="chat-section">
          {selectedParticipant ? (
            <>
              <h4>Chat with {selectedParticipant.name}</h4>
              <div className="msg-box" ref={msgBoxRef}>
                {msgList.map((msg, index) => (
                  <p key={index} title={msg.user} className={msg.userId === user.uid ? "msg-self" : "msg-other"}>
                    {msg.text}
                  </p>
                ))}
              </div>
              <Form onSubmit={handleSendMessage}>
                <InputGroup className="mb-3">
                  <FormControl
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    aria-label="User message input"
                  />
                  <Button variant="outline-secondary" type="submit">Send</Button>
                </InputGroup>
              </Form>
            </>
          ) : (
            <h4>Select a {isDoctor ? "user" : "doctor"} to start chatting</h4>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
