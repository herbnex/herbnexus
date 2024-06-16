import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import { db } from '../../Firebase/firebase.config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import './UserProfile.css';

const UserProfile = () => {
  const { user, isDoctor, isLoading, error, setError, updateUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateError, setUpdateError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const storage = getStorage();

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
      fetchProfileData();
    }
  }, [user, isDoctor]);

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    setLoading(true);
    setUpdateError(null);
    setSuccess(null);

    const updatedProfileData = {
      name: event.target.formDisplayName.value,
    };

    try {
      if (avatar) {
        const avatarRef = storageRef(storage, `avatars/${user.uid}`);
        await uploadBytes(avatarRef, avatar);
        const avatarURL = await getDownloadURL(avatarRef);
        updatedProfileData.photoURL = avatarURL;
      }

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
      setUpdateError('Failed to update profile: ' + err.message);
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
    <Card className="user-profile-card">
      <Card.Header className="user-profile-header">User Profile</Card.Header>
      <Card.Body>
        <div className="user-profile-info">
          <img 
            src={profileData?.photoURL || "https://i.ibb.co/4NM5vPL/Profile-avatar-placeholder-large.png"} 
            alt="User Avatar" 
            className="user-profile-avatar"
          />
          <h5>{profileData?.name || "Anonymous"}</h5>
          <p>Email: {profileData?.email}</p>
          <p>Subscribed: {profileData?.isSubscribed ? "Yes" : "No"}</p>
        </div>
        <Form className="user-profile-form" onSubmit={handleUpdateProfile}>
          <Form.Group controlId="formDisplayName">
            <Form.Label>Display Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter display name" 
              defaultValue={profileData?.name}
            />
          </Form.Group>
          <Form.Group controlId="formAvatar">
            <Form.Label>Avatar</Form.Label>
            <Form.Control 
              type="file" 
              accept="image/*" 
              onChange={handleAvatarChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update Profile
          </Button>
        </Form>
        {success && <Alert variant="success" className="mt-3">{success}</Alert>}
        {updateError && <Alert variant="danger" className="mt-3">{updateError}</Alert>}
      </Card.Body>
    </Card>
  );
};

export default UserProfile;
