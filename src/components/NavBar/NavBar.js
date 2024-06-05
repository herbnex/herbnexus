// src/NavBar.js
import React from "react";
import { Container, Nav, Navbar, Button, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo-1.png";
import useAuth from "../../hooks/useAuth";
import "./NavBar.css";

const NavBar = () => {
  const { user, logOut } = useAuth();

  return (
    <div>
      <Navbar bg="white" expand="lg" className="py-3">
        <Container>
          {/* LOGO */}
          <NavLink to="/home" className="logo text-decoration-none d-flex justify-content-center align-items-center">
            <img src={logo} alt="logo" />
            <h1>HERB NEXUS</h1>
          </NavLink>

          {/* NAVIGATION MENU */}
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="mx-auto my-2 my-lg-0 fw-bold align-items-center" navbarScroll>
              <NavLink activeClassName="active" className="nav-item" to="/home">
                Home
              </NavLink>
              <NavLink activeClassName="active" className="nav-item" to="/doctors">
                Doctors
              </NavLink>
              <NavLink activeClassName="active" className="nav-item" to="/appointment">
                Appointment
              </NavLink>
              <NavLink activeClassName="active" className="nav-item" to="/contact">
                Live Chat
              </NavLink>
              <NavLink activeClassName="active" className="nav-item" to="/about">
                About us
              </NavLink>
              <NavLink activeClassName="active" className="nav-item" to="/faq">
                FAQs
              </NavLink>
            </Nav>

            {/* ADD SHOP BUTTON */}
            <Button
              variant="outline"
              className="rounded-pill btn-main p-2 px-3 me-3"
              onClick={() => window.open('https://shop.herbnexus.io', '_blank')}
            >
              Shop&nbsp;
              <i className="bi bi-cart"></i>
            </Button>

            {/* SHOW LOGIN OR LOGOUT BUTTON BASED ON LOGIN STATUS */}
            {!user ? (
              <NavLink to="/login">
                <Button variant="outline" className="rounded-pill btn-main p-2 px-3">
                  <i className="bi bi-person"></i>
                  &nbsp;Login
                </Button>
              </NavLink>
            ) : (
              <div className="user d-flex align-items-center">
                <Button onClick={logOut} variant="outline" className="rounded-pill btn-main p-2 px-3">
                  Log Out&nbsp;
                  <i className="bi bi-box-arrow-right"></i>
                </Button>

                {/* AVATAR WITH DROPDOWN */}
                <NavDropdown
                  title={
                    <button className="nav-dropdown-toggle">
                      <img
                        title={user.email}
                        src={user.photoURL ? user.photoURL : "https://i.ibb.co/4NM5vPL/Profile-avatar-placeholder-large.png"}
                        alt="user avatar"
                        className="user-icon"
                      />
                    </button>
                  }
                  id="user-nav-dropdown"
                  alignRight
                >
                  <NavDropdown.ItemText>
                    <div className="user-info">
                      <h5 className="mb-0">{user.displayName ? user.displayName : "Anonymous"}</h5>
                      <small>{user.email}</small>
                    </div>
                  </NavDropdown.ItemText>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={NavLink} to="/dashboard">
                    Dashboard
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
