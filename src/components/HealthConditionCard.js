import React from "react";
import { Col } from "react-bootstrap";
import "./HealthConditionCard.css";

const HealthConditionCard = ({ healthCondition }) => {
  return (
    <Col xs={12} md={4}>
      <div className="card-box">
        <div className="pattern">
          <div className="pattern-1"></div>
          <div className="pattern-2"></div>
        </div>
        <div className="content-box">
          <ul className="name-box">
            <li className="name">
              <h3>{healthCondition}</h3>
            </li>
            <li>
              <i className="bi bi-patch-check text-main"></i>
            </li>
            <li>
              <i className="bi bi-shield-check text-warning"></i>
            </li>
          </ul>
        </div>
      </div>
    </Col>
  );
};

export default HealthConditionCard;
