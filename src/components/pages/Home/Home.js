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
import "./Home.css";
import HerbNexusAdditionalBanner from '../../HerbNexusAdditionalBanner/HerbNexusAdditionalBanner';
import Doctors from "../Doctors/Doctors";


const Home = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  const isSmallScreen = window.matchMedia("(max-width: 767px)").matches;

  return (
    <div>
      <Banner />
      {/* <SectionTitle>
        <NavLink to ="/subscribe">
        <h1>Subscribe Now</h1>
        </NavLink>
        <h4>The World's Largest Network of Alternative Medicine Practitioners</h4>
      </SectionTitle> */}
      <Doctors />
      {/* <DoctorsCards home /> */}
      <Container className="chat text-center my-5">
        <NavLink to="/doctors" className="mx-auto">
          <Button variant="outline" className="rounded-pill btn-main mt-2 py-3">
            Chat Live with a Herbalist 
          </Button>
        </NavLink>
      </Container>
      <SectionTitle>
      <NavLink to="/shop" className="mx-auto">

             <h1>Shop Herbal Supplements</h1> 
             
             </NavLink>
              <h4>Select the body system you'd like to focus on</h4>
            </SectionTitle>
      <ShopPromo />
      {/* {!isSmallScreen && <About home={true} />} */}

      {/* {!isSmallScreen && <WhyLoveHerbNexus home={true}/>} */}
      <WhyLoveHerbNexus />
      <BlogBanner />
      
      
      <Faq />
    </div>
  );
};

export default Home;
