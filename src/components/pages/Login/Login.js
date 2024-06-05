import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button, FloatingLabel } from "react-bootstrap";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Error from "../../Error/Error";
import Loading from "../../Loading/Loading";
import "./Login.css";
import { auth, db } from "../../../Firebase/firebase.config"; // Adjust the path as necessary
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
	const { user, signInWithGoogle, signInWithGithub, error, isLoading, setUser } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const history = useHistory();
	const location = useLocation();

	const refferer = location?.state?.from || { pathname: "/" };

	const handleLoginSubmit = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				const userId = userCredential.user.uid;
				const userDoc = await getDoc(doc(db, "users", userId));
				if (userDoc.exists()) {
					const userData = userDoc.data();
					setUser({ ...userCredential.user, ...userData });
					history.replace(refferer);
				}
			})
			.catch((error) => {
				console.error(error);
			});
		setEmail("");
		setPassword("");
	};

	useEffect(() => {
		if (user) {
			history.replace(refferer);
		}
	}, [user]);

	if (isLoading) {
		return <Loading></Loading>;
	}

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div>
			<Container fluid className="login-heading">
				{error && <Error></Error>}
			</Container>

			<div className="login-panel">
				<div>
					<div>
						{/* <h1 className="text-center fw-bold">Login</h1> */}
						<div className="my-2 text-center">
							<h2 className="login-title fw-semibold">Welcome Back</h2>
							<p>Enter your credentials to login</p>
						</div>
						<div className="mt-5 pb-3">
							<Form onSubmit={handleLoginSubmit}>
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
									</FloatingLabel>
								</Form.Group>

								<div className="my-3 d-flex w-auto justify-content-end">
									<span className="text-main fp-text">Forgot Password?</span>
								</div>

								<Button
									variant="outline"
									className="btn-main login-title fs-6 fw-semibold rounded-pill py-3 w-100"
									type="submit">
									Login
								</Button>
							</Form>
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
				</div>

				<h6 className="my-2 text-center">
					Don't have an account? <NavLink to={{ pathname: "/signup", state: { from: refferer } }}>Sign Up</NavLink>
				</h6>
			</div>
		</div>
	);
};

export default Login;
