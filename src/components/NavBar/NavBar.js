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
		<div>
			<Navbar bg="white" expand="lg" className="py-3">
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
								className="rounded-pill chats nav-small-text btn-main py-2 px-3 h-auto me-3"
								onClick={() => window.open("https://shop.herbnexus.io", "_blank")}>
								Shop&nbsp;
								<i className="bi bi-cart"></i>
							</Button>

							{/* SHOW LOGIN OR LOGOUT BUTTON BASED ON LOGIN STATUS */}
							{!user ? (
								<NavLink to="/login">
									<Button variant="outline" className="rounded-pill btn-main py-2 nav-small-text px-3">
										<i className="bi bi-person"></i>
										&nbsp;Login
									</Button>
								</NavLink>
							) : (
								<div className="user user-profile d-flex align-items-center">
									{/* AVATAR WITH DROPDOWN */}
									<NavDropdown
										align={"end"}
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
										id="user-nav-dropdown">
										<NavDropdown.ItemText>
											<div className="user-info text-center">
												<h5 className="mb-0">{user.displayName ? user.displayName : "Anonymous"}</h5>
												<small>{user.email}</small>
											</div>
										</NavDropdown.ItemText>
										<NavDropdown.Divider />
										<NavDropdown.Item as={NavLink} to="/dashboard">
											Dashboard
										</NavDropdown.Item>
										<NavDropdown.Divider />
										<Button
											onClick={logOut}
											variant="danger"
											className="rounded-pill mx-3 p-2 nav-small-text px-3">
											Log Out&nbsp;
											<i className="bi bi-box-arrow-right"></i>
										</Button>
									</NavDropdown>
								</div>
							)}
							<div className="mt-2 mobile-profile flex-column align-items-center gap-4">
								<NavLink to="/dashboard">Dashboard</NavLink>
								<Button onClick={logOut} variant="danger" className="rounded-pill mx-3 p-2 nav-small-text px-3">
									Log Out&nbsp;
									<i className="bi bi-box-arrow-right"></i>
								</Button>
							</div>
						</Offcanvas.Body>
					</Navbar.Offcanvas>
				</Container>
			</Navbar>
		</div>
	);
};

export default NavBar;