import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Button, NavDropdown, Offcanvas } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/logo-1.png";
import useAuth from "../../hooks/useAuth";
import "./NavBar.css";

const NavBar = () => {
	const { user, logOut } = useAuth();
	const [showMenu, setShowMenu] = useState(false);
	const { pathname } = useLocation();

	useEffect(() => {
		setShowMenu(false);
	}, [pathname]);

	return (
		<Navbar bg="white" expand="lg" className="py-3 navcont">
			<Container>
				{/* LOGO */}
				<NavLink
					to="/home"
					className="logo text-decoration-none d-flex justify-content-center align-items-center">
					<img src={logo} alt="logo" />
					<h1 className="fs-4 fw-semibold">HERB NEXUS</h1>
				</NavLink>

				{/* NAVIGATION MENU */}
				<Navbar.Toggle onClick={() => setShowMenu(true)} aria-controls="navbarScroll" />
				<Navbar.Offcanvas show={showMenu} placement="end" onHide={() => setShowMenu(false)} id="navbarScroll">
					<Offcanvas.Header closeButton>
						<Offcanvas.Title>Navigation</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<Nav className="mx-auto my-2 my-lg-0 fw-bold align-items-center" navbarScroll>
							<NavLink activeClassName="active" className="nav-item" to="/home">
								Home
							</NavLink>
							<NavLink activeClassName="active" className="nav-item" to="/doctors">
								View Practitioners
							</NavLink>
							<NavLink activeClassName="active" className="nav-item" to="/subscribe">
								Subscribe
							</NavLink>
							<NavLink activeClassName="active" className="nav-item" to="/for-herbalists">
								For Herbalists
							</NavLink>
							<NavLink activeClassName="active" className="nav-item" to="/faq">
								FAQs
							</NavLink>
						</Nav>

						{/* ADD SHOP BUTTON */}
						<NavLink to="/shop">
							<Button
								variant="outline"
								className="rounded-pill shopbut chats nav-small-text btn-main py-2 px-3 h-auto me-3"
							>
								Shop&nbsp;
								<i className="bi bi-cart"></i>
							</Button>
						</NavLink>

						{/* SHOW LOGIN OR LOGOUT BUTTON BASED ON LOGIN STATUS */}
						{!user ? (
							<NavLink to="/login">
								<Button variant="outline" className="rounded-pill btn-main py-2 nav-small-text px-3">
									<i className="bi bi-person"></i>
									&nbsp;Login
								</Button>
							</NavLink>
						) : (
							<NavDropdown
								title={
									<img
										title={user.email}
										src={
											user.photoURL
												? user.photoURL
												: "https://i.ibb.co/4NM5vPL/Profile-avatar-placeholder-large.png"
										}
										alt="user avatar"
										className="me-1 user-icon"
									/>
								}
								id="user-nav-dropdown"
								align="end"
								className="user-profile">
								<NavDropdown.Item>
									<div className="user-info text-center">
										<h5 className="mb-0">{user.displayName ? user.displayName : "Anonymous"}</h5>
										
									</div>
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item as={NavLink} to="/dashboard" className="text-center">
									Dashboard
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item className="text-center p-0">
									<Button
										onClick={logOut}
										variant="danger"
										className="w-100 rounded-pill p-2 nav-small-text"
									>
										Log Out&nbsp;
										<i className="bi bi-box-arrow-right"></i>
									</Button>
								</NavDropdown.Item>
							</NavDropdown>
						)}
					</Offcanvas.Body>
				</Navbar.Offcanvas>
			</Container>
		</Navbar>
	);
};

export default NavBar;
