import React, { useState, useRef, useEffect } from "react";
import { Container, Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { ref, set, onValue, push } from "firebase/database";
import { database } from "../../../Firebase/firebase.config";
import useAuth from "../../../hooks/useAuth";
import "./Contact.css";

const generateChatId = (uid1, uid2) => {
  return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
};

const Contact = () => {
  const { user } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const doctorId = queryParams.get('doctorId');
  const [msgList, setMsgList] = useState([]);
  const msgBoxRef = useRef(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user || !doctorId) {
      console.error("User or Doctor ID is missing!");
      return;
    }

    console.log("User ID:", user.uid);
    console.log("Doctor ID:", doctorId);

    const chatId = generateChatId(user.uid, doctorId);
    const chatRef = ref(database, `chats/${chatId}/messages`);

    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messages = Object.values(data);
        console.log("Fetched messages:", messages); // Log fetched messages
        setMsgList(messages);
      } else {
        setMsgList([]);
      }
    });

    return () => unsubscribe();
  }, [user, doctorId]);

  useEffect(() => {
    if (msgBoxRef.current) {
      msgBoxRef.current.scrollTop = msgBoxRef.current.scrollHeight;
    }
  }, [msgList]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      return;
    }

    console.log("Sending message:", message); // Log message before sending
    const newMessage = {
      user: user.displayName || "Anonymous",
      text: message,
      timestamp: new Date().toISOString()
    };
    const chatId = generateChatId(user.uid, doctorId);
    const chatRef = ref(database, `chats/${chatId}/messages`);
    const newMessageRef = push(chatRef);

    await set(newMessageRef, newMessage);
    console.log("Message sent:", newMessage); // Log message after sending
    setMessage('');
  };

  return (
    <Container className="contact-panel">
      <h1 className="fs-2 fw-bold mb-2 text-center">Live Chat</h1>
      <div className="contact p-3">
        <div className="msg-box" ref={msgBoxRef}>
          {msgList.map((msg, index) => (
            <p key={index} title={msg.user} className={msg.user === (user.displayName || "Anonymous") ? "msg-self" : "msg-other"}>
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
      </div>
    </Container>
  );
};

export default Contact;
