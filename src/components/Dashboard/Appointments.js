import React, { useEffect, useState } from 'react';
import { Card, Table, Spinner, Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import { db } from '../../Firebase/firebase.config';
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import useAuth from '../../hooks/useAuth';
import './Appointments.css';

const Appointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDoctor, setIsDoctor] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

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

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const appointmentsRef = collection(db, 'appointments');
        let q;
        if (isDoctor) {
          q = query(appointmentsRef, where('doctorId', '==', user.uid));
        } else {
          q = query(appointmentsRef, where('userId', '==', user.uid));
        }
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
  }, [user.uid, isDoctor]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'appointments', id));
      setAppointments(appointments.filter(appointment => appointment.id !== id));
    } catch (error) {
      console.error('Error deleting appointment: ', error);
    }
  };

  const handleReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    setNewDate(appointment.date);
    setNewTime(appointment.time);
    setShowRescheduleModal(true);
  };

  const handleRescheduleSubmit = async () => {
    if (!newDate || !newTime) return;

    try {
      const appointmentRef = doc(db, 'appointments', selectedAppointment.id);
      await updateDoc(appointmentRef, {
        date: newDate,
        time: newTime,
      });
      setAppointments(appointments.map(appointment => 
        appointment.id === selectedAppointment.id 
          ? { ...appointment, date: newDate, time: newTime }
          : appointment
      ));
      setShowRescheduleModal(false);

      // Send email notification for rescheduling
      const response = await fetch('/.netlify/functions/appoint-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: selectedAppointment.userEmail,
          doctorEmail: selectedAppointment.doctorEmail,
          subject: 'Appointment Rescheduled',
          userMessage: `Your appointment with ${selectedAppointment.doctorName} has been rescheduled to ${newDate} at ${newTime}.`,
          doctorMessage: `The appointment with ${selectedAppointment.userName} has been rescheduled to ${newDate} at ${newTime}.`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from email function:', errorData);
      }

    } catch (error) {
      console.error('Error rescheduling appointment: ', error);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
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
                  {isDoctor ? (
                    <>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                    </>
                  ) : (
                    <th>Herbalist</th>
                  )}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    {isDoctor ? (
                      <>
                        <td>{appointment.userName}</td>
                        <td>{appointment.userEmail}</td>
                        <td>{appointment.userPhone}</td>
                      </>
                    ) : (
                      <td>{appointment.doctorName}</td>
                    )}
                    <td>
                      <Button variant="danger" onClick={() => handleDelete(appointment.id)}>Delete</Button>{' '}
                      <Button variant="warning" onClick={() => handleReschedule(appointment)}>Reschedule</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No appointments found.</p>
          )}
        </Card.Body>
      </Card>

      {/* Reschedule Modal */}
      <Modal show={showRescheduleModal} onHide={() => setShowRescheduleModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reschedule Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="rescheduleDate">
              <FloatingLabel controlId="floatingDate" label="New Date">
                <Form.Control
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="rescheduleTime">
              <FloatingLabel controlId="floatingTime" label="New Time">
                <Form.Control
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRescheduleModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleRescheduleSubmit}>
            Reschedule
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Appointments;