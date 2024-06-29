import React from "react";
import "./Footer.css";
import logo from "../../assets/logo-1-light.png";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col xs={12} sm={6} md={4}>
            <div className="d-flex flex-column mt-3">
              <NavLink
                to="/home"
                className="logo text-start text-decoration-none d-flex justify-content-center align-items-center me-auto mb-4"
              >
                <img src={logo} alt="logo" />
                <h1 className="text-light">HERB NEXUS</h1>
              </NavLink>

              <p className="text-white mb-3 pe-5">
                Welcome to HERB NEXUS, your go-to platform for personalized herbal consultations. Connect with accredited herbalists worldwide, 24/7, and receive tailored herbal remedy recommendations anytime.
              </p>

              <NavLink to="/contact">
                {/* <i className="bi bi-arrow-right"></i> */}
                Chat Live with a Herbalist
              </NavLink>
            </div>
          </Col>

          <Col xs={12} sm={6} md={2}>
            <div className="d-flex flex-column mt-3">
              <h6 className="text-white mb-3">Departments</h6>
              <ul>
                
              <li className="mb-2">
                  <NavLink className="text-muted" to="/shop">
                    Shop
                  </NavLink>
                </li>
                <li className="mb-2">
                  <NavLink className="text-muted" to="/subscribe">
                    Subscribe
                  </NavLink>
                </li>
                <li className="mb-2">
                  <NavLink className="text-muted" to="/faq">
                    FAQ
                  </NavLink>
                </li>
                <li className="mb-2">
                  <NavLink className="text-muted" to="/about">
                    About
                  </NavLink>
                </li>
                  
              </ul>
            </div>
          </Col>

          <Col xs={12} sm={6} md={2}>
            <div className="d-flex flex-column mt-3">
              <h6 className="text-white mb-3">Legal</h6>
              <ul>
                <li className="mb-2">
                  <NavLink className="text-muted" to="/privacy-policy">
                    Privacy Policy
                  </NavLink>
                </li>
                <li className="mb-2">
                  <NavLink className="text-muted" to="/terms-of-service">
                    Terms of Service
                  </NavLink>
                </li>
              </ul>
            </div>
          </Col>

          <Col xs={12} sm={6} md={4}>
            <div className="d-flex flex-column mt-3 bg-white text-main rounded p-4 border-start border-5 border-primary">
              <h5 className="mb-3 fw-bold">Contact Us</h5>
              <p className="mb-3">
                If you have any questions or need help, feel free to reach out to us for assistance.
              </p>
              <h5 className="mb-3 fw-bolder">
                <i className="bi bi-envelope-fill"></i> contact@herbnexus.io
              </h5>
              {/* <p className="mb-3">6161 Tisdall St, Vancouver, Canada</p> */}
            </div>
          </Col>
        </Row>
        <div className="d-flex justify-content-center align-items-center py-4 mt-5">
          <p className="text-white">Copyright &copy; 2024 HERB NEXUS. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
