import React, { useState } from 'react';
import { Button, Form, InputGroup, Container } from 'react-bootstrap';
import axios from 'axios';
import './HerbalChat.css';

const HerbalChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { user: 'You', text: input }]);
    setIsLoading(true);

    try {
        const baseURL = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:8888/.netlify/functions/herbalChat' 
        : '/.netlify/functions/herbalChat';
      
      const response = await axios.post(baseURL, { query: input });
      const botMessage = response.data.answer;

      setMessages([...messages, { user: 'You', text: input }, { user: 'Bot', text: botMessage }]);
    } catch (error) {
      setMessages([...messages, { user: 'You', text: input }, { user: 'Bot', text: 'Error: Could not get response' }]);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  return (
    <Container className="herbal-chat-container">
      <div className="chat-window">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.user === 'You' ? 'user-message' : 'bot-message'}`}>
              <strong>{msg.user}: </strong> {msg.text}
            </div>
          ))}
          {isLoading && <div className="loading">Bot is typing...</div>}
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
