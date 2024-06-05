import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button, FloatingLabel, Alert, Spinner } from "react-bootstrap";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Error from "../../Error/Error";
import "./Login.css";

const Login = () => {
	const { user, logInWithEmailandPassword, error: authError, isLoading: authLoading } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [validationErrors, setValidationErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [loginError, setLoginError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const history = useHistory();
	const location = useLocation();

	const refferer = location?.state?.from || { pathname: "/" };

	const handleLoginSubmit = async (e) => {
		e.preventDefault();

		let errors = {};
		if (!email) errors.email = "Email is required";
		if (!password) errors.password = "Password is required";

		setValidationErrors(errors);
		if (Object.keys(errors).length > 0) return;

		setIsLoading(true);
		setLoginError(""); // Reset login error
		try {
			await logInWithEmailandPassword(email, password);
		} catch (error) {
			setLoginError("Incorrect email or password");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (user) {
			history.replace(refferer);
		}
	}, [user, history, refferer]);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div>
			<Container fluid className="login-heading">
				{authError && <Error />}
			</Container>

			<div className="login-panel">
				<div>
					<div>
						<div className="my-2 text-center">
							<h2 className="login-title fw-semibold">Welcome Back</h2>
							<p>Enter your credentials to login</p>
						</div>
						<div className="mt-5 pb-3">
							{loginError && <Alert variant="danger">{loginError}</Alert>}
							<Form onSubmit={handleLoginSubmit}>
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
										<Form.Control
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											className="rounded-pill ps-3"
											type={showPassword ? "text" : "password"}
											placeholder="Password"
											isInvalid={!!validationErrors.password}
											required
										/>
										<Form.Control.Feedback type="invalid">{validationErrors.password}</Form.Control.Feedback>
										<span
											className="position-absolute top-50 end-0 translate-middle inline-block px-1 fs-5 fp-text"
											onClick={togglePasswordVisibility}>
											{showPassword ? <i class="bi bi-eye"></i> : <i class="bi bi-eye-slash"></i>}
										</span>
									</FloatingLabel>
								</Form.Group>

								<div className="my-3 d-flex w-auto justify-content-end">
									<span className="text-main fp-text">Forgot Password?</span>
								</div>

								<Button
									variant="outline"
									className="btn-main rounded-pill p-3 w-100"
									type="submit"
									disabled={isLoading}>
									{isLoading ? (
										<>
											<Spinner animation="border" size="sm" className="me-2" />
											Signing in...
										</>
									) : (
										"Log In"
									)}
								</Button>
							</Form>
						</div>
					</div>
				</div>

				{/* <Col xs={12} md={1}>
						<div className="d-flex justify-content-center align-items-center my-3 pt-5 pb-3 h-100">
							<p>--OR--</p>
						</div>
					</Col>
					<Col xs={12} md={5}>
						<h1 className="title text-center fw-bold">Login with</h1>
						<div className="d-flex justify-content-around align-items-center h-100 pb-5">
							<button onClick={signInWithGoogle} className="btn btn-danger">
								<i className="bi bi-google fs-2"></i> <br />
								Google
							</button>
							<button onClick={signInWithGithub} className="btn btn-success">
								<i className="bi bi-github fs-2"></i> <br />
								Github
							</button>
							<button disabled className="btn btn-primary">
								<i className="bi bi-facebook fs-2"></i> <br />
								FaceBook
							</button>
						</div>
					</Col> */}

				<h6 className="my-2 text-center">
					Don't have an account? <NavLink to={{ pathname: "/signup", state: { from: refferer } }}>Sign Up</NavLink>
				</h6>
			</div>
		</div>
	);
};

export default Login;
