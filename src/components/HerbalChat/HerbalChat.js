import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, InputGroup, Container } from 'react-bootstrap';
import axios from 'axios';
import './HerbalChat.css';

const HerbalChat = () => {
  const [messages, setMessages] = useState([
    { user: 'Bot', text: 'Hello! Get a free consultation with me first before you speak to our live, accredited Herbal Doctors. Could you please tell me a bit about your health concerns and your overall health condition?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatMessagesRef = useRef(null);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { user: 'You', text: input }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const baseURL = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:8888/.netlify/functions/herbalChat' 
        : '/.netlify/functions/herbalChat';
      
      const response = await axios.post(baseURL, { query: input });
      const botMessage = response.data.answer;

      setMessages([...newMessages, { user: 'Bot', text: botMessage }]);
    } catch (error) {
      setMessages([...newMessages, { user: 'Bot', text: 'Error: Could not get response' }]);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <Container className="herbal-chat-container">
      <div className="chat-window">
        <div className="chat-messages" ref={chatMessagesRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.user === 'You' ? 'user-message' : 'bot-message'}`}>
              <strong>{msg.user === 'You' ? 'You' : 'Bot'}: </strong> {msg.text}
            </div>
          ))}
          {isLoading && <div className="loading">Bot is typing...</div>}
          <div ref={messagesEndRef}></div>
        </div>
        <InputGroup className="mb-3">
          <Form.Control
            as="textarea"
            rows={1}
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </InputGroup>
      </div>
    </Container>
  );
};

export default HerbalChat;
