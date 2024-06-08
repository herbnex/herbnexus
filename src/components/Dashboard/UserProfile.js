import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import './UserProfile.css';
import { db } from '../../../src/Firebase/firebase.config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const UserProfile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isDoctor, setIsDoctor] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const collection = isDoctor ? 'doctors' : 'users';
        const userDocRef = doc(db, collection, user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
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
      // Assuming a method is available to check if the user is a doctor
      setIsDoctor(user.isDoctor);
      fetchProfileData();
    }
  }, [user, isDoctor]);

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const updatedProfileData = {
      name: event.target.formDisplayName.value,
      // Add other fields to update here if needed
    };

    try {
      const collection = isDoctor ? 'doctors' : 'users';
      const userDocRef = doc(db, collection, user.uid);
      await updateDoc(userDocRef, updatedProfileData);
      setProfileData((prevData) => ({
        ...prevData,
        ...updatedProfileData
      }));
      setSuccess('Profile updated successfully.');
    } catch (err) {
      setError('Failed to update profile: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
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
        <Form className="user-profile-form" onSubmit={handleUpdateProfile}>
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
        {success && <Alert variant="success" className="mt-3">{success}</Alert>}
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </Card.Body>
    </Card>
  );
};

export default UserProfile;
