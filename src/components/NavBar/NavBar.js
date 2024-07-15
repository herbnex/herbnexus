import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Button, NavDropdown, Offcanvas } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/logo-1.png";
import useAuth from "../../hooks/useAuth";
import { db } from "../../Firebase/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import "./NavBar.css";

const NavBar = () => {
	const { user, logOut } = useAuth();
	const [showMenu, setShowMenu] = useState(false);
	const [isSubscribed, setIsSubscribed] = useState(false);
	const { pathname } = useLocation();

	useEffect(() => {
		const checkSubscriptionStatus = async () => {
			if (user) {
				// Check in users collection
				const userDoc = await getDoc(doc(db, "users", user.uid));
				if (userDoc.exists() && userDoc.data().isSubscribed) {
					setIsSubscribed(true);
					return;
				}
	
				// Check in doctors collection if not subscribed in users collection
				const doctorDoc = await getDoc(doc(db, "doctors", user.uid));
				if (doctorDoc.exists() && doctorDoc.data().isSubscribed) {
					setIsSubscribed(true);
					return;
				}
	
				setIsSubscribed(false); // Not subscribed in either collection
			}
		};
	
		checkSubscriptionStatus();
	}, [user]);
	

	useEffect(() => {
		setShowMenu(false);
	}, [pathname]);

	return (
		<div>
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
								{isSubscribed ? (
									<NavLink activeClassName="active" className="nav-item" to="/appointment">
										Appointment
									</NavLink>
								) : (
									<NavLink activeClassName="active" className="nav-item" to="/subscribe">
										Subscribe
									</NavLink>
								)}
								{isSubscribed ? (
									<NavLink activeClassName="active" className="nav-item" to="/chat-portal">
										Chat Portal
									</NavLink>
								) : (
									<NavLink activeClassName="active" className="nav-item" to="/for-herbalists">
									For Herbalists
								</NavLink>
								)}
								
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
								{user && (
									<Button onClick={logOut} variant="danger" className="rounded-pill mx-3 p-2 nav-small-text px-3">
										Log Out&nbsp;
										<i className="bi bi-box-arrow-right"></i>
									</Button>
								)}
							</div>
						</Offcanvas.Body>
					</Navbar.Offcanvas>
				</Container>
			</Navbar>
		</div>
	);
};

export default NavBar;
