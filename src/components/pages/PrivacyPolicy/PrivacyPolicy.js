import React from 'react';
import { Card, Container } from 'react-bootstrap';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <Container className="privacy-policy">
      <Card>
        <Card.Header>
          <h2>Privacy Policy</h2>
        </Card.Header>
        <Card.Body>
          <h4>Introduction</h4>
          <p>
            Herb Nexus ("we", "us", or "our") is committed to protecting and respecting your privacy. This Privacy Policy
            explains how we collect, use, and disclose your personal information when you use our platform.
          </p>

          <h4>Information We Collect</h4>
          <p>We may collect and process the following data about you:</p>
          <ul>
            <li>
              <strong>Personal Identification Information:</strong> Name, email address, phone number, and other similar
              information.
            </li>
            <li>
              <strong>Health Information:</strong> Information related to your health and medical history provided by
              you during consultations with our herbalists.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you use our platform, such as your IP address, browser
              type, and pages visited.
            </li>
          </ul>

          <h4>How We Use Your Information</h4>
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li>To provide and maintain our service.</li>
            <li>To notify you about changes to our service.</li>
            <li>To allow you to participate in interactive features of our service when you choose to do so.</li>
            <li>To provide customer support.</li>
            <li>To gather analysis or valuable information so that we can improve our service.</li>
            <li>To monitor the usage of our service.</li>
            <li>To detect, prevent, and address technical issues.</li>
          </ul>

          <h4>How We Share Your Information</h4>
          <p>
            We do not share your personal information with third parties except as necessary to provide our services or
            as required by law. This may include sharing information with:
          </p>
          <ul>
            <li>Our accredited herbalists for the purpose of providing consultations.</li>
            <li>Service providers who assist us in operating our platform.</li>
            <li>
              Authorities if we are required to disclose your information by law or in response to valid requests by
              public authorities.
            </li>
          </ul>

          <h4>Security of Your Information</h4>
          <p>
            The security of your data is important to us. We implement appropriate technical and organizational measures
            to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h4>Your Data Protection Rights</h4>
          <p>
            You have certain rights regarding your personal information, including the right to access, correct, or
            delete the information we hold about you. If you wish to exercise any of these rights, please contact us.
          </p>

          <h4>Changes to This Privacy Policy</h4>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page. We advise you to review this Privacy Policy periodically for any changes.
          </p>

          <h4>Contact Us</h4>
          <p>
            If you have any questions about this Privacy Policy, please contact us at: <br />
            Email: contact@herbnexus.io <br />
            Address: 6161 Tisdall St, Vancouver, Canada
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PrivacyPolicy;
