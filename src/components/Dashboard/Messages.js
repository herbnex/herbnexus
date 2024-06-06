import React from 'react';
import { Card } from 'react-bootstrap';

const Messages = () => {
  return (
    <Card>
      <Card.Header>Messages</Card.Header>
      <Card.Body>
        <Card.Text>
          Check your messages from herbalists.
        </Card.Text>
        {/* Add your messages content here */}
      </Card.Body>
    </Card>
  );
};

export default Messages;
