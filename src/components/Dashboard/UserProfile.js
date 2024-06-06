// src/components/UserProfile/UserProfile.js
import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth'; // Assuming you have a hook to get the authenticated user
import './UserProfile.css';

const { db } = require('../../../Firebase/setupFirebaseAdmin'); // Adjust the path as necessary

const UserProfile = () => {
  const { user } = useAuth(); // Get the authenticated user
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userDoc = await db.collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          setProfileData(userDoc.data());
        } else {
          setError('No user data found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfileData();
    }
  }, [user]);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Card className="user-profile-card">
      <Card.Header className="user-profile-header">User Profile</Card.Header>
      <Card.Body>
        <div className="user-profile-info">
          <img 
            src={profileData.photoURL || "https://i.ibb.co/4NM5vPL/Profile-avatar-placeholder-large.png"} 
            alt="User Avatar" 
            className="user-profile-avatar"
          />
          <h5>{profileData.name || "Anonymous"}</h5>
          <p>Email: {profileData.email}</p>
          <p>Subscribed: {profileData.isSubscribed ? "Yes" : "No"}</p>
        </div>
        <Form>
          <Form.Group controlId="formDisplayName">
            <Form.Label>Display Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter display name" 
              defaultValue={profileData.name}
            />
          </Form.Group>
          {/* Add more form fields as needed */}
          <Button variant="primary" type="submit">
            Update Profile
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UserProfile;
