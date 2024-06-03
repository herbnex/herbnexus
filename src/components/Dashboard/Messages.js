import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import useMessages from '../../../hooks/useMessages';

const Messages = () => {
  const { messages } = useMessages();

  return (
    <Container>
      <Row>
        <Col>
          <h1>Messages</h1>
          <ListGroup>
            {messages.map((message) => (
              <ListGroup.Item key={message.id}>
                <h5>{message.subject}</h5>
                <p>{message.content}</p>
                <small className="text-muted">From: {message.sender}</small>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Messages;
