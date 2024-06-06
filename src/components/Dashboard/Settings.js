// src/components/Settings/Settings.js
import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import { db } from '../../../src/Firebase/firebase.config';
import { doc, updateDoc } from 'firebase/firestore';
import './Settings.css';

const Settings = () => {
  const { user, updateUserProfile, updatePassword } = useAuth();
  const [displayName, setDisplayName] = useState(user.displayName || '');
  const [email, setEmail] = useState(user.email || '');
  const [newPassword, setNewPassword] = useState('');
  const [notification, setNotification] = useState(user.notification || false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      if (displayName !== user.displayName || notification !== user.notification) {
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, { displayName, notification });
        updateUserProfile({ displayName, notification });
      }

      setSuccess('Profile updated successfully.');
    } catch (err) {
      setError('Failed to update profile: ' + err.message);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await updatePassword(newPassword);
      setSuccess('Password updated successfully.');
    } catch (err) {
      setError('Failed to update password: ' + err.message);
    }
  };

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
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
          </Form.Group>

          <Form.Group controlId="formNotification">
            <Form.Check
              type="checkbox"
              label="Enable Notifications"
              checked={notification}
              onChange={(e) => setNotification(e.target.checked)}
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
