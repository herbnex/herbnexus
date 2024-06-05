import React, { useState, useEffect } from "react";
import { Col, Container, Form, Row, Button, FloatingLabel } from "react-bootstrap";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Error from "../../Error/Error";
import Loading from "../../Loading/Loading";
import "./Signup.css";
import { auth, db } from "../../../Firebase/firebase.config"; // Adjust the path as necessary
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
	const { user, signInWithGoogle, signInWithGithub, error, setError, isLoading } = useAuth();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const history = useHistory();
	const location = useLocation();

	const refferer = location?.state?.from || { pathname: "/" };

	const handleSignupSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const userId = userCredential.user.uid; // Using UID as user ID
				// Update the user's profile with their name
				updateProfile(userCredential.user, { displayName: name })
					.then(() => {
						// Save additional data to Firestore
						const userRef = doc(db, "users", userId);
						return setDoc(userRef, {
							id: userId, // Store user ID
							name: name,
							email: email,
							// Add additional fields as needed
						});
					})
					.then(() => {
						setName("");
						setEmail("");
						setPassword("");
						setConfirmPassword("");
						history.replace(refferer);
					})
					.catch((error) => setError(error.message));
			})
			.catch((error) => setError(error.message));
	};

	useEffect(() => {
		if (user) {
			history.replace(refferer);
		}
	}, [user]);

	if (isLoading) {
		return <Loading></Loading>;
	}

	return (
		<div>
			<Container fluid className="signup-heading">
				{error && <Error></Error>}
			</Container>

			<div className="signup-panel">
				<div>
					<div>
						<h1 className="fw-semibold fs-2 signup-title text-center">Create Account</h1>
						<div className="mt-5 pb-3">
							<Form onSubmit={handleSignupSubmit}>
								<Form.Group className=" mb-3" controlId="formBasicName">
									<FloatingLabel controlId="floatingName" label="Full Name" className="mb-3">
										<Form.Control
											value={name}
											onChange={(e) => setName(e.target.value)}
											className="rounded-pill ps-3"
											type="text"
											placeholder="Full Name"
											required
										/>
									</FloatingLabel>
								</Form.Group>

								<Form.Group className=" mb-3" controlId="formBasicEmail">
									<FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
										<Form.Control
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											className="rounded-pill ps-3"
											type="email"
											placeholder="name@example.com"
											required
										/>
									</FloatingLabel>
								</Form.Group>

								<Form.Group className="mb-3" controlId="formBasicPassword">
									<FloatingLabel controlId="floatingPassword" label="Password">
										<CustomPasswordField password={password} setPassword={setPassword} />
									</FloatingLabel>
								</Form.Group>

								<Form.Group className="mb-3" controlId="formBasicConfirmPassword">
									<FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password">
										<CustomPasswordField password={confirmPassword} setPassword={setConfirmPassword} />
									</FloatingLabel>
								</Form.Group>

								<Button variant="outline" className="btn-main rounded-pill p-3 w-100" type="submit">
									Sign Up
								</Button>
							</Form>
						</div>
					</div>

					{/* <div>
						<div className="d-flex justify-content-center align-items-center my-3 pb-3 h-100">
							<p>--OR--</p>
						</div>
					</div>
					<div className="d-flex justify-content-center align-items-center gap-3">
						<h1 className="signup-title fs-6 fw-medium">Signup with</h1>
						<div className="d-flex gap-2">
							<button
								onClick={signInWithGoogle}
								className="btn rounded-pill p-0 signup-icon-size btn-danger fs-6">
								<i className="bi bi-google"></i> <br />
							</button>
							<button
								onClick={signInWithGithub}
								className="btn fs-6 p-0 signup-icon-size rounded-pill btn-success">
								<i className="bi bi-github"></i> <br />
							</button>
							<button disabled className="btn fs-6 p-0 signup-icon-size btn-primary rounded-pill">
								<i className="bi bi-facebook"></i> <br />
							</button>
						</div>
					</div> */}
				</div>

				<h6 className="my-2 text-center">
					Already have account? <NavLink to={{ pathname: "/login", state: { from: refferer } }}>Login</NavLink>{" "}
				</h6>
			</div>
		</div>
	);
};

export default Signup;

const CustomPasswordField = ({ password, setPassword }) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<>
			<Form.Control
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className="rounded-pill ps-3 pe-5"
				type={showPassword ? "text" : "password"}
				placeholder="Password"
				required
			/>
			<span
				className="position-absolute top-50 end-0 translate-middle inline-block px-1 fs-5 fp-text"
				onClick={togglePasswordVisibility}>
				{showPassword ? <i class="bi bi-eye"></i> : <i class="bi bi-eye-slash"></i>}
			</span>
		</>
	);
};
