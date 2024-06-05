// src/App.js
import React, { useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
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

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <NavBar />
        <ScrollToTop />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
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
          <PrivateRoute path="/contact">
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
          <Route path="/subscribe">
            <Subscription /> {/* Updated component name */}
          </Route>
          <PrivateRoute path="/dashboard" requireSubscription={false}>
            <Dashboard />
          </PrivateRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
