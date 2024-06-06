// src/components/Messages/Messages.js
import React, { useState, useEffect, useRef } from 'react';
import { Card, Spinner, ListGroup, Form, Button, InputGroup } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import { db, database } from '../../../Firebase/firebase.config';
import { doc, getDocs, collection, query, where } from 'firebase/firestore';
import { ref, onValue, push, set } from 'firebase/database';
import { generateChatId } from '../../../utils/generateChatId';
import './Messages.css';

const Messages = () => {
  const { user } = useAuth();
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const msgBoxRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!user) {
      console.error("User is not authenticated!");
      return;
    }

    const fetchChatHistory = async () => {
      setLoading(true);
      try {
        const chatQuery = query(collection(db, 'chats'), where('participants', 'array-contains', user.uid));
        const chatSnapshot = await getDocs(chatQuery);
        const chats = chatSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setChatHistory(chats);
      } catch (err) {
        console.error("Failed to fetch chat history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChatHistory();
  }, [user]);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);

    const chatRef = ref(database, `chats/${chat.id}/messages`);
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      const messages = data ? Object.values(data) : [];
      setSelectedChat(prev => ({ ...prev, messages }));
      // Scroll to the bottom when new messages arrive
      setTimeout(() => {
        if (msgBoxRef.current) {
          msgBoxRef.current.scrollTop = msgBoxRef.current.scrollHeight;
        }
      }, 100);
    });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedChat) {
      return;
    }

    const newMessage = {
      user: user.displayName || "Anonymous",
      userId: user.uid,
      text: message,
      timestamp: new Date().toISOString()
    };

    const chatRef = ref(database, `chats/${selectedChat.id}/messages`);
    const newMessageRef = push(chatRef);

    await set(newMessageRef, newMessage);
    setMessage('');
    resetTextarea();

    // Scroll to the bottom after sending a message
    setTimeout(() => {
      if (msgBoxRef.current) {
        msgBoxRef.current.scrollTop = msgBoxRef.current.scrollHeight;
      }
    }, 100);
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    autoResizeTextarea();
  };

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const resetTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.value = '';
    }
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <Card className="messages-card">
      <Card.Header>Messages</Card.Header>
      <Card.Body>
        <Row>
          <Col md={4} className="chat-list">
            <ListGroup>
              {chatHistory.map(chat => (
                <ListGroup.Item
                  key={chat.id}
                  active={selectedChat && selectedChat.id === chat.id}
                  onClick={() => handleSelectChat(chat)}
                >
                  <div className="chat-participants">
                    {chat.participantsNames.join(', ')}
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={8} className="chat-window">
            {selectedChat ? (
              <>
                <div className="msg-box" ref={msgBoxRef}>
                  {selectedChat.messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.userId === user.uid ? "msg-self" : "msg-other"}`}>
                      <p>{msg.text}</p>
                      <small className="timestamp">{new Date(msg.timestamp).toLocaleString()}</small>
                    </div>
                  ))}
                </div>
                <Form onSubmit={handleSendMessage} className="message-input-container">
                  <InputGroup className="mb-3">
                    <Form.Control
                      as="textarea"
                      ref={textareaRef}
                      rows={1}
                      placeholder="Type your message..."
                      value={message}
                      onChange={handleTyping}
                      aria-label="User message input"
                      className="message-input"
                      style={{ resize: 'none', overflow: 'auto' }}
                    />
                    <Button variant="outline-secondary" type="submit" className="message-send-button">Send</Button>
                  </InputGroup>
                </Form>
              </>
            ) : (
              <h4>Select a chat to view messages</h4>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Messages;
