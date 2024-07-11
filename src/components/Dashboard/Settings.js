import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Alert, Spinner, InputGroup } from 'react-bootstrap';
import { getAuth, updateEmail, updatePassword } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase/firebase.config';
import useAuth from "../../hooks/useAuth";
import './Settings.css';

const Settings = () => {
  const { user, isDoctor, isLoading, updateUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (user) {
        setLoading(true);
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
      }
    };

    if (user) {
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
      notification: event.target.formNotification.checked,
      isOnline: event.target.formOnlineStatus.checked
    };

    try {
      if (!user) throw new Error("User not found");
      const collection = isDoctor ? 'doctors' : 'users';
      const userDocRef = doc(db, collection, user.uid);
      await updateDoc(userDocRef, updatedProfileData);
      setProfileData((prevData) => ({
        ...prevData,
        ...updatedProfileData
      }));
      setSuccess('Profile updated successfully.');
      await updateUser({ ...user, ...updatedProfileData });
    } catch (err) {
      setError('Please Logout and Login again');
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
      if (!user) throw new Error("User not found");
      const auth = getAuth();
      await updatePassword(auth.currentUser, newPassword);
      setNewPassword('');
      setSuccess('Password updated successfully.');
    } catch (err) {
      setError('Please Logout and Login again and ensure passwoord is atleast 6 characters');
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
      if (!user) throw new Error("User not found");
      const auth = getAuth();
      await updateEmail(auth.currentUser, newEmail);
      const collection = isDoctor ? 'doctors' : 'users';
      const userDocRef = doc(db, collection, user.uid);
      await updateDoc(userDocRef, { email: newEmail });
      setNewEmail('');
      setSuccess('Email updated successfully.');
      await updateUser({ ...user, email: newEmail });
    } catch (err) {
      setError('Failed to update email: The email may already exist or you may have to logout and login again');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Card className="settings-card">
      <Card.Header className="settings-header">Account Settings</Card.Header>
      <Card.Body>
        <Form onSubmit={handleUpdateProfile}>
          <Form.Group controlId="formDisplayName">
            <Form.Label>Display Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter display name"
              defaultValue={profileData?.name}
            />
          </Form.Group>
          <Form.Group controlId="formNotification">
            <Form.Check 
              type="checkbox"
              label="Email Notifications"
              defaultChecked={profileData?.notification}
            />
          </Form.Group>
          <Form.Group controlId="formOnlineStatus">
            <Form.Check 
              type="checkbox"
              label="Online Status"
              defaultChecked={profileData?.isOnline}
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
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputGroup>
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-2">
            Change Password
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
          <Button variant="primary" type="submit" className="mt-2">
            Change Email
          </Button>
        </Form>
        {success && <Alert variant="success" className="mt-3">{success}</Alert>}
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </Card.Body>
    </Card>
  );
};

export default Settings;
