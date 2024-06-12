import React from "react";
import { Container, Button } from "react-bootstrap";
import "./Banner.css";
import bannerBg from "../../assets/banner-bg.png";
import { NavLink } from "react-router-dom";
import HerbalChat from "../HerbalChat/HerbalChat"; // Import the new chat component

const Banner = () => {
  return (
    <Container>
      <section className="about-style-two">
        <div className="row align-items-center">
          <div className="col-12 col-lg-6 col-xl-5 me-auto content-column">
            <div className="content_block_1">
              <div className="content-box me-50">
                <div className="sec-title">
                 
                  <h2 className="title text-second">Connect live with a Herbalist</h2>
                </div>
                <div>
                  <p>
                    We invite you to experience personalized herbal consultations witt the world's largest network of Alternative Medicine Practioners
                  </p>
                </div>
                <div className="btn-box">
                  <NavLink to="/contact">
                    <Button variant="outline" className="rounded-pill btn-main my-5 p-2 px-3">
                      Chat Live &nbsp;
                      <i className="bi bi-chat-dots"></i>
                    </Button>
                  </NavLink>
                  <a href="https://shop.herbnexus.io/" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="rounded-pill btn-main my-5 p-2 px-3">
                      Shop &nbsp;
                      <i className="bi bi-arrow-right"></i>
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="image_block_3">
              {/* Replace the image with the HerbalChat component */}
              <HerbalChat />
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Banner;
