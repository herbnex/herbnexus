import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, InputGroup, Container } from 'react-bootstrap';
import axios from 'axios';
import './HerbalChat.css'; // Ensure this file has your CSS

const HerbalChat = () => {
  const [messages, setMessages] = useState([
    { user: 'Bot', text: 'Hello! I\'m here to help you with your health concerns. Could you please describe your primary health concerns?' },
    { user: 'Bot', text: 'Additionally, could you let me know which herbal medicine practice you are interested in? Options include Traditional Chinese Medicine, Ayurvedic Medicine, Naturopathy, African, or Arabic.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const chatMessagesRef = useRef(null);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { user: 'You', text: input }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a knowledgeable and empathetic herbal doctor. Ask one short, specific question about the patient\'s condition at a time, and then provide a detailed herbal protocol step-by-step, including the herbs to take, dosage, and duration. Provide intermediate steps for both questions and answers.' },
          ...newMessages.map(msg => ({
            role: msg.user === 'You' ? 'user' : 'assistant',
            content: msg.text
          }))
        ],
        max_tokens: 150,
        temperature: 0.7
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      const botMessage = response.data.choices[0].message.content.trim();
      setMessages([...newMessages, { user: 'Bot', text: botMessage }]);
    } catch (error) {
      setMessages([...newMessages, { user: 'Bot', text: 'Error: Could not get response' }]);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (chatContainerRef.current) {
        const rect = chatContainerRef.current.getBoundingClientRect();
        if (rect.bottom < (window.innerHeight / 2) + 50) {
          setIsMinimized(true);
        } else {
          setIsMinimized(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <>
      <Container className={`chat-container ${isMinimized ? 'hidden' : ''}`} ref={chatContainerRef}>
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
      <div 
        className={`minimized-chat-icon ${isMinimized ? '' : 'hidden'}`} 
        onClick={() => setIsMinimized(false)}
        style={{ cursor: 'pointer' }}
      >
        💬
      </div>
    </>
  );
};

export default HerbalChat;
