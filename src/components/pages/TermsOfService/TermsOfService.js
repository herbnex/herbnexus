import React from 'react';
import { Card, Container } from 'react-bootstrap';
import './TermsOfService.css';

const TermsOfService = () => {
  return (
    <Container className="terms-of-service">
      <Card>
        <Card.Header>
          <h2>Terms of Service</h2>
        </Card.Header>
        <Card.Body>
          <h4>Introduction</h4>
          <p>
            Welcome to Herb Nexus. These terms and conditions outline the rules and regulations for the use of Herb
            Nexus's website and services.
          </p>

          <h4>Acceptance of Terms</h4>
          <p>
            By accessing or using our website and services, you agree to be bound by these terms and conditions. If you
            do not agree to these terms, please do not use our services.
          </p>

          <h4>Services</h4>
          <p>
            Herb Nexus provides a platform for users to connect with accredited herbalists for live consultations and
            to receive tailored herbal remedy recommendations.
          </p>

          <h4>User Responsibilities</h4>
          <p>As a user of our services, you agree to:</p>
          <ul>
            <li>Provide accurate and complete information when creating an account.</li>
            <li>Maintain the confidentiality of your account information and password.</li>
            <li>Notify us immediately of any unauthorized use of your account.</li>
            <li>Use our services in compliance with all applicable laws and regulations.</li>
          </ul>

          <h4>Prohibited Activities</h4>
          <p>You agree not to:</p>
          <ul>
            <li>Engage in any activity that disrupts or interferes with our services.</li>
            <li>Use our services for any unlawful or fraudulent purpose.</li>
            <li>Impersonate any person or entity, or falsely state or misrepresent your affiliation with a person or entity.</li>
            <li>Upload or transmit any harmful or malicious code or content.</li>
          </ul>

          <h4>Intellectual Property</h4>
          <p>
            All content and materials on our website, including text, graphics, logos, and images, are the intellectual
            property of Herb Nexus or its licensors and are protected by copyright and trademark laws.
          </p>

          <h4>Termination</h4>
          <p>
            We reserve the right to terminate or suspend your access to our services at any time, without notice, for
            any reason, including if we believe you have violated these terms.
          </p>

          <h4>Limitation of Liability</h4>
          <p>
            Herb Nexus shall not be liable for any indirect, incidental, special, or consequential damages arising out
            of or in connection with your use of our services.
          </p>

          <h4>Changes to Terms</h4>
          <p>
            We may update these terms from time to time. We will notify you of any changes by posting the new terms on
            this page. Your continued use of our services after any changes signifies your acceptance of the new terms.
          </p>

          <h4>Contact Us</h4>
          <p>
            If you have any questions about these Terms of Service, please contact us at: <br />
            Email: contact@herbnexus.io <br />
            Address: 6161 Tisdall St, Vancouver, Canada
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TermsOfService;
