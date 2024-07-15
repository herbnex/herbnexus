import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Doctors from "./components/pages/Doctors/Doctors";
import Doctor from "./components/pages/Doctor/Doctor";
import Home from "./components/pages/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/pages/NotFound/NotFound";
import Login from "./components/pages/Login/Login";
import AuthProvider from "./contexts/AuthProvider";
import Signup from "./components/pages/Signup/Signup";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Faq from "./components/Faq/Faq";
import About from "./components/About/About";
import Appointment from "./components/pages/Appointment/Appoinment";
import Contact from "./components/pages/Contact/Contact";
import Subscription from "./components/subscription/subscriptions";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivacyPolicy from "./components/pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "./components/pages/TermsOfService/TermsOfService";
import withDelayedNavigation from "../src/hooks/withDelayedNavigation"; // Adjust the path if necessary
import useScrollHandler from './hooks/useScrollHandler';
import PrivacyPolicyModal from './components/PrivacyPolicyModal'; // Import the modal component
import PasswordReset from './components/PasswordReset';
import ProductPage from "./components/Shop/ProductPage";
import ShopLayout from "./components/Shop/ShopLayout";
import { ProductProvider } from './components/Shop/ProductContext'; // Import ProductProvider
import PromoModal from './components/PromoModal';
import HerbalistsPage from "./components/HerbalistsPage";
import HerbalReference from "./components/HerbalReference";
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'; // Import GoogleReCaptchaProvider
import PaymentSuccess from "./components/Shop/PaymentSuccess";

const DelayedContact = withDelayedNavigation(Contact, 2000);

const App = () => {
  useScrollHandler();

  return (
    <div className="App">
      <AuthProvider>
        <ProductProvider>
          <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}>
            <NavBar />
            <PrivacyPolicyModal />
            <PromoModal />
            <Switch>
              <Route path="/reset-password">
                <PasswordReset />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/shop">
                <ShopLayout />
              </Route>
              <Route path="/payment-success">
          <PaymentSuccess />
        </Route>
              <Route path="/product/:id">
                <ProductPage />
              </Route>
              <Route path="/doctors">
                <Doctors />
              </Route>
              <PrivateRoute path="/doctor/:doctorId">
                <Doctor />
              </PrivateRoute>
              <PrivateRoute path="/appointment">
                <Appointment />
              </PrivateRoute>
              <Route path="/about">
                <About />
              </Route>
              <PrivateRoute path="/chat-portal">
                <Contact />
              </PrivateRoute>
              <Route path="/faq">
                <Faq />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <PrivateRoute path="/subscribe" requireSubscription={false}>
                <Subscription />
              </PrivateRoute>
              <PrivateRoute path="/dashboard" requireSubscription={false}>
                <Dashboard />
              </PrivateRoute>
              <Route path="/privacy-policy">
                <PrivacyPolicy />
              </Route>
              <Route path="/terms-of-service">
                <TermsOfService />
              </Route>
              <Route path="/for-herbalists">
                <HerbalistsPage />
              </Route>
              <Route path="/reference">
                <HerbalReference />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
            <Footer />
          </GoogleReCaptchaProvider>
        </ProductProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
