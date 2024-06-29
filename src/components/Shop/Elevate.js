import React from 'react';
import { Card } from 'react-bootstrap';
import './Elevate.css';

const elevateItems = [
  { id: 1, name: 'Custom Air Freshener', image: 'https://via.placeholder.com/200', description: '' },
  { id: 2, name: 'Travel Jewelry Box', image: 'https://via.placeholder.com/200', description: '' },
  { id: 3, name: 'School Supplies', image: 'https://via.placeholder.com/200', description: '' },
  { id: 4, name: 'Back-to-School Savings', image: 'https://via.placeholder.com/200', description: '' },
  { id: 5, name: 'Office Supplies', image: 'https://via.placeholder.com/200', description: '' },
  { id: 6, name: 'Plant Decor', image: 'https://via.placeholder.com/200', description: '' },
];

const Elevate = () => {
  return (
    <div className="elevate-container">
      <div className="elevate-grid">
        <div className="elevate-large-text">
          <h5>Editors' Picks</h5>
          <h2>Elevate your everyday jewellery</h2>
          <p>See more</p>
        </div>
        {elevateItems.slice(0, 5).map(pick => (
          <div key={pick.id} className="elevate-item elevate-small-image">
            <Card className="mb-2 elevate-card">
              <Card.Img variant="top" src={pick.image} className="elevate-image" />
            </Card>
          </div>
        ))}
        <div className="elevate-item elevate-large-image">
          <Card className="mb-2 elevate-card">
            <Card.Img variant="top" src={elevateItems[5].image} className="elevate-image" />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Elevate;
