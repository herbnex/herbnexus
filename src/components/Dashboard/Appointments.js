import React, { useEffect, useState } from 'react';
import { Card, Table, Spinner } from 'react-bootstrap';
import { db } from '../../Firebase/firebase.config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import useAuth from '../../hooks/useAuth';
import './Appointments.css';


const Appointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const appointmentsRef = collection(db, 'appointments');
        const q = query(appointmentsRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const appointmentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAppointments(appointmentsData);
      } catch (error) {
        console.error('Error fetching appointments: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user.uid]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Card className="appointments-card">
      <Card.Header>Appointments</Card.Header>
      <Card.Body>
        <Card.Text>View and manage your appointments with herbalists.</Card.Text>
        {appointments.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Herbalist</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.doctorName}</td>
                  <td>{appointment.userEmail}</td>
                  <td>{appointment.userPhone}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No appointments found.</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default Appointments;
