import React, { useState, useEffect } from "react";
import { Col, Container, Form, Row, Button, FloatingLabel, Alert } from "react-bootstrap";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Error from "../../Error/Error";
import Loading from "../../Loading/Loading";
import "./Signup.css";
import { auth, db } from "../../../Firebase/firebase.config"; // Adjust the path as necessary
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
	const { user, error, setError, isLoading } = useAuth();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [validationErrors, setValidationErrors] = useState({});
	const history = useHistory();
	const location = useLocation();

	const refferer = location?.state?.from || { pathname: "/" };

	const handleSignupSubmit = async (e) => {
		e.preventDefault();

		let errors = {};
		if (!name) errors.name = "Name is required";
		if (!email) errors.email = "Email is required";
		if (!password) errors.password = "Password is required";
		if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match";

		setValidationErrors(errors);
		if (Object.keys(errors).length > 0) return;

		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			await updateProfile(userCredential.user, { displayName: name });
			const userRef = doc(db, "users", userCredential.user.uid);
			await setDoc(userRef, { name, email });

			setSuccessMessage("Account created successfully!");
			setName("");
			setEmail("");
			setPassword("");
			setConfirmPassword("");
			history.replace(refferer);
		} catch (error) {
			setError(error.message);
		}
	};

	useEffect(() => {
		if (user) {
			history.replace(refferer);
		}
	}, [user, history, refferer]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div>
			<Container fluid className="signup-heading">
				{error && <Error />}
			</Container>

			<div className="signup-panel">
				<div>
					<div>
						<h1 className="fw-semibold fs-2 signup-title text-center">Create Account</h1>
						<div className="mt-5 pb-3">
							{successMessage && <Alert variant="success">{successMessage}</Alert>}
							<Form onSubmit={handleSignupSubmit}>
								<Form.Group className="mb-3" controlId="formBasicName">
									<FloatingLabel controlId="floatingName" label="Full Name" className="mb-3">
										<Form.Control
											value={name}
											onChange={(e) => setName(e.target.value)}
											className="rounded-pill ps-3"
											type="text"
											placeholder="Full Name"
											isInvalid={!!validationErrors.name}
											required
										/>
										<Form.Control.Feedback type="invalid">{validationErrors.name}</Form.Control.Feedback>
									</FloatingLabel>
								</Form.Group>

								<Form.Group className="mb-3" controlId="formBasicEmail">
									<FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
										<Form.Control
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											className="rounded-pill ps-3"
											type="email"
											placeholder="name@example.com"
											isInvalid={!!validationErrors.email}
											required
										/>
										<Form.Control.Feedback type="invalid">{validationErrors.email}</Form.Control.Feedback>
									</FloatingLabel>
								</Form.Group>

								<Form.Group className="mb-3" controlId="formBasicPassword">
									<FloatingLabel controlId="floatingPassword" label="Password">
										<CustomPasswordField password={password} setPassword={setPassword} />
										<Form.Control.Feedback type="invalid">{validationErrors.password}</Form.Control.Feedback>
									</FloatingLabel>
								</Form.Group>

								<Form.Group className="mb-3" controlId="formBasicConfirmPassword">
									<FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password">
										<CustomPasswordField password={confirmPassword} setPassword={setConfirmPassword} />
										<Form.Control.Feedback type="invalid">
											{validationErrors.confirmPassword}
										</Form.Control.Feedback>
									</FloatingLabel>
								</Form.Group>

								<Button variant="outline" className="btn-main rounded-pill p-3 w-100" type="submit">
									Sign Up
								</Button>
							</Form>
						</div>
					</div>
				</div>

				<h6 className="my-2 text-center">
					Already have an account? <NavLink to={{ pathname: "/login", state: { from: refferer } }}>Login</NavLink>{" "}
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
