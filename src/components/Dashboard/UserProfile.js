import React from 'react';
import { Card } from 'react-bootstrap';

const UserProfile = () => {
  return (
    <Card>
      <Card.Header>User Profile</Card.Header>
      <Card.Body>
        <Card.Text>
          View and update your profile information.
        </Card.Text>
        {/* Add your profile content here */}
      </Card.Body>
    </Card>
  );
};

export default UserProfile;
