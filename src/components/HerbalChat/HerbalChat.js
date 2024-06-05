import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, InputGroup, Container, Modal } from 'react-bootstrap';
import axios from 'axios';
import './HerbalChat.css';

const HerbalChat = () => {
  const [messages, setMessages] = useState([
    { user: 'Bot', text: "Hello! I'm here to help you with your health concerns. Could you please describe your primary health concerns?" },
    { user: 'Bot', text: 'Additionally, could you let me know which herbal medicine practice you are interested in? Options include Traditional Chinese Medicine, Ayurvedic Medicine, Naturopathy, African, or Arabic.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const messagesEndRef = useRef(null);
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem('isFirstTimeUser') !== 'false') {
      setShowModal(true);
      localStorage.setItem('isFirstTimeUser', 'false');
    }
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { user: 'You', text: input }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: "You are a knowledgeable and empathetic herbal doctor. Ask one short, specific question about the patient's condition at a time, and then provide a detailed herbal protocol step-by-step, including the herbs to take, dosage, and duration. Provide intermediate steps for both questions and answers." },
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

    // Enter full-screen mode
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
      document.documentElement.msRequestFullscreen();
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Privacy Policy and Legal Terms and Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do not use this tool as a substitute for professional medical advice, diagnosis or treatment.</p>
          <p>If you think you may have a medical emergency, call your doctor or emergency room immediately.</p>
          <p>The confidentiality of your data is important to us. We comply with the established data protection regulations.</p>
          <p>For more information, please read the legal terms and conditions in detail.</p>
          <p>Last update: 06/11/2018</p>
          <table>
            <thead>
              <tr>
                <th>Basic information on data protection</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Data Controller</td>
                <td>Teckel Medical S.L.</td>
              </tr>
              <tr>
                <td>Purposes</td>
                <td>
                  Performance and management of the requested services<br />
                  Registration and management of your data in the private user area<br />
                  Registration and management of your subscription to the Mediktor Newsletter<br />
                  Detection and investigation of frauds and other illegal activities<br />
                  Performance of statistical studies
                </td>
              </tr>
              <tr>
                <td>Legal basis</td>
                <td>Contract issued<br />Consent of the user for registration in the private area and subscription to the Mediktor Newsletter</td>
              </tr>
              <tr>
                <td>Data disclosure</td>
                <td>
                  Third-party service providers are hired by the Data Controller.<br />
                  These providers will only access and process your personal data to carry out their services in the name and on behalf of the Data Controller, always following their instructions and without being able to use them for their own purposes and/or unauthorized purposes at any time.
                </td>
              </tr>
              <tr>
                <td>Data Transfer</td>
                <td>Personal data will not be subject to international transfer outside the European Economic Area.</td>
              </tr>
              <tr>
                <td>Your rights</td>
                <td>You have the right to access, rectify and delete the data, as well as other rights, as explained in the additional information under Data Protection, by sending an email to: dpo@mediktor.com</td>
              </tr>
              <tr>
                <td>Additional information on data protection</td>
                <td>You can read additional and detailed information on Data Protection in our Privacy Policy.</td>
              </tr>
            </tbody>
          </table>
          <Form.Check type="checkbox" label="I have read and accept the Privacy Policy." />
          <Form.Check type="checkbox" label="I have read and understood the Legal Terms and Conditions." />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Continue</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default HerbalChat;
