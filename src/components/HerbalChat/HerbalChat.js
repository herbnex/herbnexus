import React, { useState, useEffect, useRef } from 'react';
import { Button, Container, InputGroup, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import './HerbalChat.css';

const BlogGenerator = () => {
  const [messages, setMessages] = useState([
    { user: 'Bot', text: 'Welcome to the Blog Generator Tool. Type "go" to start creating a 2000-word blog on an interesting topic in herbal medicine.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [blogContent, setBlogContent] = useState([]);
  const [htmlContent, setHtmlContent] = useState('');
  const chatMessagesRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateBlogContent = async () => {
    try {
      let blog = [];
      let sentenceCount = 1;
      let prompt = `Generate the title for a 2000-word LinkedIn blog on a random, interesting topic in herbal medicine such as the benefits of specific herbs or how to make herbal tinctures.`;

      while (blog.join(' ').split(' ').length < 2000) {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: 'gpt-4',
          messages: [
            { role: 'system', content: 'You are a proficient blog writer.' },
            { role: 'user', content: prompt }
          ],
          max_tokens: 150,
          temperature: 0.7
        }, {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        });

        const newSentence = response.data.choices[0].message.content.trim();
        blog.push(newSentence);
        
        if (sentenceCount === 1) {
          prompt = `Generate the first sentence of the blog titled: "${newSentence}"`;
        } else if (sentenceCount % 10 === 0) {
          prompt = `Generate a section title for the blog continuing from: "${newSentence}"`;
        } else {
          prompt = `Generate the ${sentenceCount}th sentence for the blog continuing from: "${newSentence}"`;
        }

        sentenceCount += 1;
      }

      setBlogContent(blog);

      const blogHtml = blog.map((sentence, index) => {
        if (index === 0) return `<h1>${sentence}</h1>`;
        if (index % 10 === 0) return `<h2>${sentence}</h2>`;
        return `<p>${sentence}</p>`;
      }).join('');

      setHtmlContent(blogHtml);

      setMessages((prevMessages) => [
        ...prevMessages,
        { user: 'Bot', text: 'The blog is ready. Click the button below to view it as an HTML document.' }
      ]);
    } catch (error) {
      console.error('Error generating blog content: ', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: 'Bot', text: 'Error: Could not generate blog content.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (input.trim().toLowerCase() === 'go') {
      setIsLoading(true);
      generateBlogContent();
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: 'You', text: input }
      ]);
    }
    setInput('');
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <Container className="blog-generator-container">
      <div className="chat-window">
        {!showModal && (
          <>
            <div className="chat-header">
              <Button onClick={toggleModal}>Full Screen</Button>
            </div>
            <div className="chat-messages" ref={chatMessagesRef}>
              {messages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.user === 'You' ? 'user-message' : 'bot-message'}`}>
                  <strong>{msg.user === 'You' ? 'You' : 'Bot'}: </strong>
                  {msg.text}
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

      {showModal && (
        <div className="fullscreen-modal">
          <div className="fullscreen-modal-content">
            <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
              <div className="sidebar-toggle" onClick={toggleSidebar}>
                <Button>Toggle Sidebar</Button>
              </div>
              {!sidebarCollapsed && (
                <>
                  <h4>Chat Sessions</h4>
                  {/* List of chat sessions could go here */}
                </>
              )}
            </div>
            <div className={`chat-area ${sidebarCollapsed ? 'collapsed' : ''}`}>
              <div className="chat-header">
                <Button onClick={toggleModal}>Exit Full Screen</Button>
              </div>
              <div className="chat-messages" ref={chatMessagesRef}>
                {messages.map((msg, index) => (
                  <div key={index} className={`chat-message ${msg.user === 'You' ? 'user-message' : 'bot-message'}`}>
                    <strong>{msg.user === 'You' ? 'You' : 'Bot'}: </strong>
                    {msg.text}
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

      {htmlContent && (
        <Container>
          <Button onClick={() => setShowModal(true)}>View Blog as HTML</Button>
          <Modal show={showModal} onHide={toggleModal} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Generated Blog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={toggleModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      )}
    </Container>
  );
};

export default BlogGenerator;
