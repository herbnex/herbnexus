import React from "react";
import { Container, Accordion } from "react-bootstrap";
import bannerBg from "../../assets/faq-1.png";
import SectionTitle from "../SectionTitle/SectionTitle";
import "./Faq.css";

const Faq = () => {
  return (
    <Container>
      <section className="about-style-two">
        <SectionTitle>
          <h1>FAQs</h1>
          <h4>Frequently Asked Questions</h4>
        </SectionTitle>
        <div className="row align-items-center">
          <div className="col-12 col-lg-5 image-column">
            <div className="image_block_3">
              <img src={bannerBg} alt="" />
            </div>
          </div>
          <div className="col-12 col-lg-6 col-xl-6 ms-auto content-column">
            <div className="content_block_1">
              <div className="content-box ms-50">
                <Accordion defaultActiveKey="0" className="p-3">
                  <Accordion.Item className="accordion-item" eventKey="0">
                    <Accordion.Header className="accordion-header">What is HERB NEXUS?</Accordion.Header>
                    <Accordion.Body>
                      HERB NEXUS is a web app that connects users with accredited herbalists from around the world. We offer personalized herbal consultations and 24/7 live chat access with our experts, all for a monthly subscription fee of $50.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>How does the 24/7 live chat work?</Accordion.Header>
                    <Accordion.Body>
                      Our 24/7 live chat service allows you to connect with an accredited herbalist at any time, day or night. Simply log in to your account and start a chat with an available herbalist to get personalized advice and recommendations.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>What does the subscription include?</Accordion.Header>
                    <Accordion.Body>
                      The monthly subscription fee of $50 includes unlimited access to our 24/7 live chat service with accredited herbalists. You can get personalized advice, tailored herbal remedies, and ongoing support whenever you need it.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>Are the herbalists accredited?</Accordion.Header>
                    <Accordion.Body>
                      Yes, all our herbalists are accredited professionals with extensive knowledge and experience in herbal medicine. They are dedicated to providing personalized care and tailored herbal remedies to meet your unique needs.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Faq;
