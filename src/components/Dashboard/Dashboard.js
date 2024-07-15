import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import ManageSubscription from './ManageSubscription';
import Appointments from './Appointments';
import UserProfile from './UserProfile';
import ConsultationHistory from './ConsultationHistory';
import Messages from './Messages';
import Settings from './Settings';
import PatientIntake from './PatientIntake'; // Import the new Patient Intake component
import DoctorInfo from './DoctorInfo'; // Import the new Doctor Info component
import useAuth from '../../hooks/useAuth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase/firebase.config';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [isDoctor, setIsDoctor] = useState(false);

  useEffect(() => {
    const checkIfDoctor = async () => {
      try {
        const userDocRef = doc(db, "doctors", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        setIsDoctor(userDocSnap.exists());
      } catch (error) {
        console.error("Error checking doctor status:", error);
      }
    };

    checkIfDoctor();
  }, [user]);

  return (
    <Container fluid className="dashboard">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Dashboard</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Tabs defaultActiveKey="profile" id="dashboard-tabs" className="mb-3">
            <Tab eventKey="profile" title="User Profile">
              <UserProfile />
            </Tab>
            {!isDoctor && (
              <Tab eventKey="patientIntake" title="Patient Intake">
                <PatientIntake />
              </Tab>
            )}
            <Tab eventKey="subscription" title="Manage Subscription">
              <ManageSubscription />
            </Tab>
            <Tab eventKey="appointments" title="Appointments">
              <Appointments />
            </Tab>
            {isDoctor && (
              <Tab eventKey="doctorInfo" title="Update Profile">
                <DoctorInfo />
              </Tab>
            )}
            <Tab eventKey="settings" title="Settings">
              <Settings />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
