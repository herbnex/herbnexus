// src/components/Settings/Settings.js
import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import { db } from '../../../src/Firebase/firebase.config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './Settings.css';

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

const Settings = () => {
  const { user, updateUserProfile, refreshUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');

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
      const idToken = await user.getIdToken();
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idToken,
          password: newPassword,
          returnSecureToken: true
        })
      });
      if (!response.ok) {
        throw new Error('Failed to update password');
      }
      const data = await response.json();
      refreshUser(data.idToken);  // Refresh the user with the new token
      setSuccess('Password updated successfully.');
    } catch (err) {
      setError('Failed to update password: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const idToken = await user.getIdToken();
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idToken,
          email: newEmail,
          returnSecureToken: true
        })
      });
      if (!response.ok) {
        throw new Error('Failed to update email');
      }
      const data = await response.json();
      refreshUser(data.idToken);  // Refresh the user with the new token
      setSuccess('Email updated successfully.');
    } catch (err) {
      setError('Failed to update email: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner animation="border" />;
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

        <Form onSubmit={handleChangeEmail}>
          <Form.Group controlId="formNewEmail">
            <Form.Label>New Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter new email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Change Email
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
