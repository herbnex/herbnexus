import React from "react";
import { Col, Button } from "react-bootstrap";
import "./HerbCard.css";

const HerbCard = ({ herb }) => {
  const { id, name, category, description, imageUrl, isAvailable } = herb;

  return (
    <Col xs={12} md={4}>
      <div className="card-box">
        <div className="pattern">
          <div className="pattern-1"></div>
          <div className="pattern-2"></div>
        </div>
        <figure className="image-box">
          <img src={imageUrl} alt={name} loading="lazy" />
          <div className={isAvailable ? "online-indicator" : "offline-indicator"}></div>
        </figure>
        <div className="content-box">
          <ul className="name-box">
            <li className="name">
              <h3>{name}</h3>
            </li>
            <li>
              <i className="bi bi-patch-check text-main"></i>
            </li>
            <li>
              <i className="bi bi-shield-check text-warning"></i>
            </li>
          </ul>
          <p className="designation">
            Category: {category}
          </p>
          <div className="text">
            <p>{description}</p>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            {isAvailable ? (
              <Button variant="outline" className="rounded-pill btn-main mt-2">
                Available
              </Button>
            ) : (
              <Button variant="outline" className="rounded-pill btn-main mt-2" disabled>
                Unavailable
              </Button>
            )}
          </div>
        </div>
      </div>
    </Col>
  );
};

export default HerbCard;
