import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, InputGroup, Container, Table } from 'react-bootstrap';
import axios from 'axios';
import './HerbalChat.css';

const HerbalChat = () => {
  const [messages, setMessages] = useState([
    { user: 'Bot', text: 'Hello! I\'m your free AI Symptom Diagnosis Tool. Could you please describe your primary health concerns?' },
    { user: 'Bot', text: 'Additionally, could you let me know which herbal medicine practice you are interested in? Options include Traditional Chinese Medicine, Ayurvedic Medicine, Naturopathy, African, or Arabic.' }
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
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a knowledgeable and empathetic herbal doctor. Ask one short, specific question about the patient\'s condition at a time. Provide intermediate steps for both questions and answers. Give a final herbal prescription in the following format and make it succinct (within 150 tokens). The "How to use" section should be 20 words or less. Only include the names of the herbs in the "Prescription" section without describing them:\n\nPrescription:\n[herb names]\n\nDuration:\n[duration]\n\nHow to use:\n[usage]' },
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
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const renderMessageContent = (text) => {
    const prescriptionMatch = text.match(/Prescription:\n([\s\S]+?)\n\nDuration:\n(.+)\n\nHow to use:\n([\s\S]+)/);
    if (prescriptionMatch) {
      const prescriptions = prescriptionMatch[1].split('\n').map(p => p.trim()).filter(p => p);
      const usageInstructions = prescriptionMatch[3].trim();

      return (
        <Table bordered>
          <tbody>
            <tr>
              <th>Prescription</th>
              <td>{prescriptions.join(', ')}</td>
            </tr>
            <tr>
              <th>Duration</th>
              <td>{prescriptionMatch[2]}</td>
            </tr>
            <tr>
              <th>How to use</th>
              <td>{usageInstructions}</td>
            </tr>
          </tbody>
        </Table>
      );
    }
    return text;
  };

  return (
    <Container className="herbal-chat-container">
      <div className="chat-window">
        <div className="chat-messages" ref={chatMessagesRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.user === 'You' ? 'user-message' : 'bot-message'}`}>
              <strong>{msg.user === 'You' ? 'You' : 'Bot'}: </strong>
              {renderMessageContent(msg.text)}
            </div>
          ))}
          {isLoading && <div className="loading">Bot is typing...</div>}
          <div ref={messagesEndRef}></div>
        </div>
        <InputGroup className="mb-3 input-group">
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
