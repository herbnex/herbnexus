import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import './EditorsPicks.css';

const editorsPicks = [
  { id: 1, name: 'Custom Air Freshener', image: 'https://via.placeholder.com/200', description: '' },
  { id: 2, name: 'Travel Jewelry Box', image: 'https://via.placeholder.com/200', description: '' },
  { id: 3, name: 'School Supplies', image: 'https://via.placeholder.com/200', description: '' },
  { id: 4, name: 'Back-to-School Savings', image: 'https://via.placeholder.com/200', description: '' },
  { id: 5, name: 'Office Supplies', image: 'https://via.placeholder.com/200', description: '' },
  { id: 6, name: 'Plant Decor', image: 'https://via.placeholder.com/200', description: '' },
];

const EditorsPicks = () => {
  return (
    <div className="editors-picks-container">
      <Row className="mb-4">
        <Col md={6} className="d-flex flex-column justify-content-center">
          <h5>Editors' Picks</h5>
          <h2>Back-to-school savings</h2>
          <p>Shop these unique finds</p>
        </Col>
        <Col md={6} className="editors-picks-images">
          <div className="editors-picks-grid">
            {editorsPicks.slice(0, 3).map(pick => (
              <div key={pick.id} className="editors-pick-item small">
                <Card className="mb-2 editors-pick-card">
                  <Card.Img variant="top" src={pick.image} className="editors-pick-image" />
                </Card>
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <div className="editors-picks-grid">
            {editorsPicks.slice(3, 6).map(pick => (
              <div key={pick.id} className="editors-pick-item small">
                <Card className="mb-2 editors-pick-card">
                  <Card.Img variant="top" src={pick.image} className="editors-pick-image" />
                </Card>
              </div>
            ))}
          </div>
        </Col>
        <Col md={4} className="d-flex flex-column justify-content-center">
          <p>We've got all the supplies you're searching for! From the classroom to the student room, find A+ items for under $50.</p>
        </Col>
      </Row>
    </div>
  );
};

export default EditorsPicks;
