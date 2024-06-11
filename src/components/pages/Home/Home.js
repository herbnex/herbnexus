import React from "react";
import { Button, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import About from "../../About/About";
import Banner from "../../Banner/Banner";
import DoctorsCards from "../../DoctorsCards/DoctorsCards";
import Faq from "../../Faq/Faq";
import Loading from "../../Loading/Loading";
import SectionTitle from "../../SectionTitle/SectionTitle";
import Subscription from "../../subscription/subscriptions";
import HowItWorks from '../../HowIItWorks/HowItWorks'; // Import the new component

const Home = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Banner />

      <SectionTitle>
        <h4>Subscribe Now</h4>
        <h1>Get 24/7 Access to Herbalists</h1>
      </SectionTitle>
      <DoctorsCards home />
      <Container className="text-center my-5">
        <NavLink to="/doctors" className="mx-auto">
          <Button variant="outline" className="rounded-pill btn-main mt-2 py-3">
            Chat Live with a Herbalist &nbsp;
            <i className="bi bi-arrow-right"></i>
          </Button>
        </NavLink>
      </Container>

      <About home={true} />

      <HowItWorks />

      <Faq />

      {/* <SectionTitle>
        <h4>Subscribe Now</h4>
        <h1>Get 24/7 Access to Herbalists</h1>
      </SectionTitle>
      <Subscription /> */}
    </div>
  );
};

export default Home;
