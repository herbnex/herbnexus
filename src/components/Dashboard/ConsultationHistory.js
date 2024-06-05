import React from 'react';
import { Card } from 'react-bootstrap';

const ConsultationHistory = () => {
  return (
    <Card>
      <Card.Header>Consultation History</Card.Header>
      <Card.Body>
        <Card.Text>
          View your past consultations with herbalists.
        </Card.Text>
        {/* Add your consultation history content here */}
      </Card.Body>
    </Card>
  );
};

export default ConsultationHistory;
