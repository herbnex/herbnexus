import React, { useState, useEffect } from 'react';
import { Form, Button, Card, FloatingLabel, Spinner, Alert } from 'react-bootstrap';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../Firebase/firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import useAuth from '../../hooks/useAuth';
import './DoctorInfo.css';

const DoctorInfo = () => {
  const { user } = useAuth();
  const [doctorInfo, setDoctorInfo] = useState({
    name: '',
    speciality: '',
    bio: '',
    degrees: '',
    office: '',
    image: '',
  });
  const [loading, setLoading] = useState(true);
  const [imageUpload, setImageUpload] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const docRef = doc(db, 'doctors', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDoctorInfo(docSnap.data());
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching doctor info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorInfo();
  }, [user.uid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctorInfo({
      ...doctorInfo,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = doctorInfo.image;

      if (imageUpload) {
        try {
          imageUrl = await uploadImage(imageUpload);
        } catch (uploadError) {
          throw new Error('Image upload failed. Please try again.');
        }
      }

      await updateDoc(doc(db, 'doctors', user.uid), {
        ...doctorInfo,
        image: imageUrl,
      });

      setSuccessMessage('Doctor info updated successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error updating doctor info:', error);
      setErrorMessage('Error updating doctor info. Please try again.');
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (image) => {
    const storageRef = ref(storage, `doctors/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress tracking logic can go here
        },
        (error) => {
          reject(new Error('Upload failed'));
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (urlError) {
            reject(new Error('URL retrieval failed'));
          }
        }
      );
    });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Card className="doctor-info-card">
      <Card.Header>Doctor Information</Card.Header>
      <Card.Body>
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form onSubmit={handleFormSubmit}>
          <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
            <Form.Control
              type="text"
              name="name"
              value={doctorInfo.name}
              onChange={handleInputChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingSpeciality" label="Speciality" className="mb-3">
            <Form.Control
              type="text"
              name="speciality"
              value={doctorInfo.speciality}
              onChange={handleInputChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingBio" label="Bio" className="mb-3">
            <Form.Control
              type="text"
              name="bio"
              value={doctorInfo.bio}
              onChange={handleInputChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingDegrees" label="Degrees" className="mb-3">
            <Form.Control
              type="text"
              name="degrees"
              value={doctorInfo.degrees}
              onChange={handleInputChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingOffice" label="Office" className="mb-3">
            <Form.Control
              type="text"
              name="office"
              value={doctorInfo.office}
              onChange={handleInputChange}
              required
            />
          </FloatingLabel>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Profile Image</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={(e) => setImageUpload(e.target.files[0])} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update Info
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default DoctorInfo;
