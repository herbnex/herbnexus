// src/components/Settings/Settings.js
import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';
import { db } from '../../../Firebase/firebase.config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './Settings.css';

const Settings = () => {
  const { user, updatePassword } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userDocRef = doc(db, 'users', user.uid);
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
      fetchProfileData();
    }
  }, [user]);

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const updatedProfileData = {
      name: event.target.formDisplayName.value,
      notification: event.target.formNotification.checked
    };

    try {
      const userDocRef = doc(db, 'users', user.uid);
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

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await updatePassword(newPassword);
      setSuccess('Password updated successfully.');
    } catch (err) {
      setError('Failed to update password: ' + err.message);
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
    <Card className="settings-card">
      <Card.Header>Settings</Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        
        <Form onSubmit={handleUpdateProfile}>
          <Form.Group controlId="formDisplayName">
            <Form.Label>Display Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter display name"
              defaultValue={profileData?.name || ''}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              defaultValue={profileData?.email || ''}
              disabled
            />
          </Form.Group>

          <Form.Group controlId="formNotification">
            <Form.Check
              type="checkbox"
              label="Enable Notifications"
              defaultChecked={profileData?.notification || false}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update Profile
          </Button>
        </Form>

        <hr />

        <Form onSubmit={handleChangePassword}>
          <Form.Group controlId="formNewPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Change Password
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Settings;
