import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './PrivacyPolicyModal.css'; // Import the CSS file

const PrivacyPolicyModal = () => {
  const [show, setShow] = useState(false);
  const [isPrivacyPolicyAccepted, setIsPrivacyPolicyAccepted] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  useEffect(() => {
    const privacyShown = localStorage.getItem('privacyShown');
    if (!privacyShown) {
      const timer = setTimeout(() => {
        setShow(true);
        localStorage.setItem('privacyShown', 'true'); // Store the flag in local storage
      }, 3000); // Show the modal after 3 seconds

      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  const handlePrivacyPolicyChange = () => {
    setIsPrivacyPolicyAccepted(!isPrivacyPolicyAccepted);
  };

  const handleTermsChange = () => {
    setIsTermsAccepted(!isTermsAccepted);
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header>
        <Modal.Title>Privacy Policy and Legal Terms and Conditions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>If you think you may have a medical emergency, call your doctor or emergency room immediately.</p>
        <p>The confidentiality of your data is important to us. We comply with the established data protection regulations.</p>
        <p>For more information, please read the legal terms and conditions in detail.</p>
        <h5>Data Protection</h5>
        <p>Last update: 06/18/2024</p>
        <h6>Basic information on data protection</h6>
        <table className="table table-striped table-hover">
          <tbody>
            <tr>
              <th>Data Controller</th>
              <td>Herb Nexus Inc.</td>
            </tr>
            <tr>
              <th>Purposes</th>
              <td>
                <ul>
                  <li>Performance and management of the requested services</li>
                  <li>Registration and management of your data in the private user area</li>
                  <li>Registration and management of your subscription to the Herb Nexus Newsletter</li>
                  <li>Detection and investigation of frauds and other illegal activities</li>
                  <li>Performance of statistical studies</li>
                </ul>
              </td>
            </tr>
            <tr>
              <th>Legal basis</th>
              <td>Contract issued</td>
            </tr>
            <tr>
              <th>Data disclosure</th>
              <td>
                Third-party service providers are hired by the Data Controller. These providers will only access and process your personal data to carry out their services in the name and on behalf of the Data Controller, always following their instructions and without being able to use them for their own purposes and/or unauthorized purposes at any time.
              </td>
            </tr>
            <tr>
              <th>Data Transfer</th>
              <td>Personal data will not be subject to international transfer outside the Canadian Economic Area.</td>
            </tr>
            <tr>
              <th>Your rights</th>
              <td>
                You have the right to access, rectify and delete the data, as well as other rights, as explained in the additional information under Data Protection, by sending an email to: contact@herbnexus.io
              </td>
            </tr>
            <tr>
              <th>Additional information on data protection</th>
              <td>You can read additional and detailed information on Data Protection in our Privacy Policy.</td>
            </tr>
          </tbody>
        </table>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check 
            type="checkbox" 
            label="I have read and accept the Privacy Policy." 
            onChange={handlePrivacyPolicyChange} 
            checked={isPrivacyPolicyAccepted}
          />
          <Form.Check 
            type="checkbox" 
            label="I have read and understood the Legal Terms and Conditions." 
            onChange={handleTermsChange} 
            checked={isTermsAccepted}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose} disabled={!(isPrivacyPolicyAccepted && isTermsAccepted)}>
          I Accept
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PrivacyPolicyModal;
