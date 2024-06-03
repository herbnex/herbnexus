import React from 'react';
import { Card } from 'react-bootstrap';

const Appointments = () => {
  return (
    <Card>
      <Card.Header>Appointments</Card.Header>
      <Card.Body>
        <Card.Text>
          View and manage your appointments with herbalists.
        </Card.Text>
        {/* Add your appointments content here */}
      </Card.Body>
    </Card>
  );
};

export default Appointments;
