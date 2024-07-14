import React, { useState } from 'react';
import { Form, Button, Card, FloatingLabel } from 'react-bootstrap';
import { db } from '../../Firebase/firebase.config';
import { collection, addDoc } from 'firebase/firestore';
import useAuth from '../../hooks/useAuth';
import './PatientIntake.css';

const PatientIntake = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    address2: '',
    phone: '',
    email: '',
    emergencyContact: '',
    emergencyContactPhone: '',
    dateOfBirth: '',
    age: '',
    gender: '',
    pronouns: '',
    occupation: '',
    primaryConcern: '',
    issues: [],
    history: [],
    familyHistory: '',
    allergies: '',
    medications: '',
    majorEvents: '',
    personalHabits: '',
    sleep: '',
    diet: '',
    otherModalities: '',
    additionalInfo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: prevData[name].includes(value)
        ? prevData[name].filter((item) => item !== value)
        : [...prevData[name], value]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'patientIntakeForms'), {
        userId: user.uid,
        ...formData,
      });
      alert('Form submitted successfully');
      setFormData({
        name: '',
        address: '',
        address2: '',
        phone: '',
        email: '',
        emergencyContact: '',
        emergencyContactPhone: '',
        dateOfBirth: '',
        age: '',
        gender: '',
        pronouns: '',
        occupation: '',
        primaryConcern: '',
        issues: [],
        history: [],
        familyHistory: '',
        allergies: '',
        medications: '',
        majorEvents: '',
        personalHabits: '',
        sleep: '',
        diet: '',
        otherModalities: '',
        additionalInfo: ''
      });
    } catch (error) {
      console.error('Error submitting form: ', error);
    }
  };

  return (
    <Card className="patient-intake-card">
      <Card.Header>Patient Intake Form</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingAddress" label="Address" className="mb-3">
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingAddress2" label="Address 2" className="mb-3">
            <Form.Control
              type="text"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPhone" label="Phone" className="mb-3">
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingEmergencyContact" label="Emergency Contact" className="mb-3">
            <Form.Control
              type="text"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingEmergencyContactPhone" label="Emergency Contact Phone" className="mb-3">
            <Form.Control
              type="text"
              name="emergencyContactPhone"
              value={formData.emergencyContactPhone}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingDateOfBirth" label="Date of Birth" className="mb-3">
            <Form.Control
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingAge" label="Age" className="mb-3">
            <Form.Control
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingGender" label="Gender" className="mb-3">
            <Form.Control
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPronouns" label="Pronouns" className="mb-3">
            <Form.Control
              type="text"
              name="pronouns"
              value={formData.pronouns}
              onChange={handleChange}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingOccupation" label="Occupation" className="mb-3">
            <Form.Control
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPrimaryConcern" label="Primary Concern" className="mb-3">
            <Form.Control
              as="textarea"
              name="primaryConcern"
              value={formData.primaryConcern}
              onChange={handleChange}
              required
              style={{ height: '100px' }}
            />
          </FloatingLabel>

          <h5>Issues</h5>
          <div className="mb-3">
            <Form.Check
              type="checkbox"
              label="Loss of Smell"
              name="issues"
              value="Loss of Smell"
              onChange={handleCheckboxChange}
              checked={formData.issues.includes('Loss of Smell')}
            />
            <Form.Check
              type="checkbox"
              label="Poor Sleep"
              name="issues"
              value="Poor Sleep"
              onChange={handleCheckboxChange}
              checked={formData.issues.includes('Poor Sleep')}
            />
            {/* Add more checkboxes for other issues based on the form */}
          </div>

          <h5>Medical History</h5>
          <div className="mb-3">
            <Form.Check
              type="checkbox"
              label="Allergic Reaction"
              name="history"
              value="Allergic Reaction"
              onChange={handleCheckboxChange}
              checked={formData.history.includes('Allergic Reaction')}
            />
            <Form.Check
              type="checkbox"
              label="Alzheimer's/Dementia"
              name="history"
              value="Alzheimer's/Dementia"
              onChange={handleCheckboxChange}
              checked={formData.history.includes('Alzheimer\'s/Dementia')}
            />
            {/* Add more checkboxes for other history items based on the form */}
          </div>

          <FloatingLabel controlId="floatingFamilyHistory" label="Family History" className="mb-3">
            <Form.Control
              as="textarea"
              name="familyHistory"
              value={formData.familyHistory}
              onChange={handleChange}
              style={{ height: '100px' }}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingAllergies" label="Allergies" className="mb-3">
            <Form.Control
              as="textarea"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              style={{ height: '100px' }}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingMedications" label="Medications" className="mb-3">
            <Form.Control
              as="textarea"
              name="medications"
              value={formData.medications}
              onChange={handleChange}
              style={{ height: '100px' }}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingMajorEvents" label="Major Events" className="mb-3">
            <Form.Control
              as="textarea"
              name="majorEvents"
              value={formData.majorEvents}
              onChange={handleChange}
              style={{ height: '100px' }}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPersonalHabits" label="Personal Habits" className="mb-3">
            <Form.Control
              as="textarea"
              name="personalHabits"
              value={formData.personalHabits}
              onChange={handleChange}
              style={{ height: '100px' }}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingSleep" label="Sleep" className="mb-3">
            <Form.Control
              as="textarea"
              name="sleep"
              value={formData.sleep}
              onChange={handleChange}
              style={{ height: '100px' }}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingDiet" label="Diet" className="mb-3">
            <Form.Control
              as="textarea"
              name="diet"
              value={formData.diet}
              onChange={handleChange}
              style={{ height: '100px' }}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingOtherModalities" label="Other Modalities" className="mb-3">
            <Form.Control
              as="textarea"
              name="otherModalities"
              value={formData.otherModalities}
              onChange={handleChange}
              style={{ height: '100px' }}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingAdditionalInfo" label="Additional Information" className="mb-3">
            <Form.Control
              as="textarea"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              style={{ height: '100px' }}
            />
          </FloatingLabel>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PatientIntake;
