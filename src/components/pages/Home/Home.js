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
import WhyLoveHerbNexus from '../../WhyLoveHerbNexus/WhyLoveHerbNexus'; // Import the new component
import StatsBanner from '../../StatsBanner/StatsBanner'; // Import the new component
import ShopPromo from '../../ShopPromo/ShopPromo'; // Import the new component
import BlogBanner from '../../BlogBanner/BlogBanner';

const Home = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  const isSmallScreen = window.matchMedia("(max-width: 767px)").matches;

  return (
    <div>
      <Banner />
      <SectionTitle>
        <h1>Subscribe Now</h1>
        <h4>The World's Largest Network of Alternative Medicine Practitioners</h4>
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
     
      <ShopPromo />
      {!isSmallScreen && <About home={true} />}
      {!isSmallScreen && <WhyLoveHerbNexus />}
      <BlogBanner />
      
      <Faq />
    </div>
  );
};

export default Home;
