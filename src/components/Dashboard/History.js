import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import useConsultationHistory from '../../../hooks/useConsultationHistory';

const History = () => {
  const { consultations } = useConsultationHistory();

  return (
    <Container>
      <Row>
        <Col>
          <h1>Consultation History</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Doctor</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {consultations.map((consultation) => (
                <tr key={consultation.id}>
                  <td>{consultation.date}</td>
                  <td>{consultation.doctor}</td>
                  <td>{consultation.notes}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default History;
