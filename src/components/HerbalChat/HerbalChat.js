import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, InputGroup, Container, Table, Modal, Dropdown } from 'react-bootstrap';
import { FaExpand, FaCompress, FaBars, FaPlus, FaEllipsisV } from 'react-icons/fa';
import { FiFolderPlus } from "react-icons/fi";

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../Firebase/firebase.config';
import axios from 'axios';
import { collection, doc, getDocs, setDoc, query, where, getDoc, addDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import './HerbalChat.css';

const auth = getAuth();

const HerbalChat = () => {
  const [messages, setMessages] = useState([
    { user: 'Bot', text: 'Hello! I\'m your free AI Symptom Diagnosis Tool. Could you please describe your primary health concerns?' },
    { user: 'Bot', text: 'Additionally, could you let me know which herbal medicine practice you are interested in? Options include Traditional Chinese Medicine, Ayurvedic Medicine, Naturopathy, African, or Arabic.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [chatSessions, setChatSessions] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const messagesEndRef = useRef(null);
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserLoggedIn(true);
        loadChatSessions(user.uid);
      } else {
        setIsUserLoggedIn(false);
      }
    });
    return unsubscribe;
  }, []);

  const loadChatSessions = async (userId) => {
    try {
      const q = query(collection(db, 'users', userId, 'chats'));
      const querySnapshot = await getDocs(q);
      const sessions = [];
      querySnapshot.forEach((doc) => {
        sessions.push({ id: doc.id, ...doc.data() });
      });
      setChatSessions(sessions);
    } catch (error) {
     // console.error('Error loading chat sessions: ', error);
    }
  };

  const loadChatHistory = async (userId, chatId) => {
    try {
      const docRef = doc(db, 'users', userId, 'chats', chatId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setMessages(docSnap.data().messages);
        setCurrentChatId(chatId);
      }
    } catch (error) {
      //console.error('Error loading chat history: ', error);
    }
  };

  const saveChatHistory = async (userId, chatId, newMessages) => {
    try {
      const docRef = doc(db, 'users', userId, 'chats', chatId);
      await setDoc(docRef, {
        messages: newMessages,
        timestamp: Timestamp.now(),
      }, { merge: true });
    } catch (error) {
      //console.error('Error saving chat history: ', error);
    }
  };

  const deleteChatSession = async (userId, chatId) => {
    try {
      await deleteDoc(doc(db, 'users', userId, 'chats', chatId));
      setChatSessions(chatSessions.filter(session => session.id !== chatId));
      if (currentChatId === chatId) {
        setMessages([]);
        setCurrentChatId(null);
      }
    } catch (error) {
      //console.error('Error deleting chat session: ', error);
    }
  };

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
      const updatedMessages = [...newMessages, { user: 'Bot', text: botMessage }];
      setMessages(updatedMessages);

      const user = auth.currentUser;
      if (user && currentChatId) {
        await saveChatHistory(user.uid, currentChatId, updatedMessages);
      }
    } catch (error) {
      setMessages([...newMessages, { user: 'Bot', text: 'Error: Could not get response' }]);
      //console.error('Error sending message: ', error);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  const startNewChatSession = async () => {
    const user = auth.currentUser;
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }

    const newChat = {
      messages: [],
      timestamp: Timestamp.now(),
    };

    try {
      const docRef = await addDoc(collection(db, 'users', user.uid, 'chats'), newChat);
      setChatSessions([...chatSessions, { id: docRef.id, ...newChat }]);
      setMessages([
        { user: 'Bot', text: 'Hello! I\'m your free AI Symptom Diagnosis Tool. Could you please describe your primary health concerns?' },
        { user: 'Bot', text: 'Additionally, could you let me know which herbal medicine practice you are interested in? Options include Traditional Chinese Medicine, Ayurvedic Medicine, Naturopathy, African, or Arabic.' }
      ]);
      setCurrentChatId(docRef.id);
    } catch (error) {
     // console.error('Error starting new chat session: ', error);
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

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <>
      <Container className="herbal-chat-container">
        <div className="chat-window">
          {!showModal && (
            <>
              <div className="chat-header">
                <FiFolderPlus className="icon new-chat-icon" onClick={startNewChatSession} />
                <FaExpand className="icon fullscreen-icon" onClick={toggleModal} />
              </div>
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
            </>
          )}
        </div>
      </Container>

      {showModal && (
        <div className="fullscreen-modal">
          <div className="fullscreen-modal-content">
            <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
              <div className="sidebar-toggle" onClick={toggleSidebar}>
                <FaBars />
              </div>
              {!sidebarCollapsed && (
                <>
                  <h4>Chat Sessions</h4>
                  {chatSessions.map((session) => (
                    <div key={session.id} className="chat-session-container">
                      <div className="chat-session" onClick={() => loadChatHistory(auth.currentUser.uid, session.id)}>
                        Chat started at {session.timestamp.toDate().toLocaleString()}
                      </div>
                      <Dropdown>
                        <Dropdown.Toggle as={FaEllipsisV} className="dropdown-toggle" />
                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item onClick={() => deleteChatSession(auth.currentUser.uid, session.id)}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className={`chat-area ${sidebarCollapsed ? 'collapsed' : ''}`}>
              <div className="chat-header">
                <FiFolderPlus className="icon new-chat-icon" onClick={startNewChatSession} />
                <FaCompress className="icon fullscreen-icon" onClick={toggleModal} />
              </div>
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
          </div>
        </div>
      )}

      {/* Login Prompt Modal */}
      <Modal show={showLoginPrompt} onHide={() => setShowLoginPrompt(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please log in to save and view your chat history.</p>
          <Button variant="primary" onClick={() => window.location.href = '/login'}>
            Log In
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default HerbalChat;
