import React, { useState, useEffect } from "react";
import { Col, Container, Form, Row, Button, FloatingLabel, Alert } from "react-bootstrap";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Error from "../../Error/Error";
import Loading from "../../Loading/Loading";
import "./Signup.css";
import { auth, db, storage } from "../../../Firebase/firebase.config";
import { createUserWithEmailAndPassword, updateProfile, fetchSignInMethodsForEmail } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Signup = () => {
  const { user, error, setError, isLoading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [doctorInfo, setDoctorInfo] = useState({
    speciality: "",
    bio: "",
    degrees: "",
    office: "",
    image: "",
    rating: 0, // Default rating
  });
  const [isDoctorSignup, setIsDoctorSignup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [imageUpload, setImageUpload] = useState(null);
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

    if (isDoctorSignup) {
      if (!doctorInfo.speciality) errors.speciality = "Speciality is required";
      if (!doctorInfo.bio) errors.bio = "Bio is required";
      if (!doctorInfo.degrees) errors.degrees = "Degrees are required";
      if (!doctorInfo.office) errors.office = "Office is required";
    }

    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        throw new Error("Email already in use. Please use a different email.");
      }

      let imageUrl = "https://i.ibb.co/4NM5vPL/Profile-avatar-placeholder-large.png"; // Default image

      if (imageUpload) {
        try {
          imageUrl = await uploadImage(imageUpload);
         // console.log("Uploaded image URL:", imageUrl);  // Debug: Check if URL is valid
        } catch (uploadError) {
          throw new Error("Image upload failed. Please try again.");
        }
      }

      await completeSignup(imageUrl);
    } catch (error) {
      setError('Error during signup');
      //console.error("Error during signup:", error);
    }
  };

  const uploadImage = async (image) => {
    const storageRef = ref(storage, `doctors/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress tracking logic can go here
        },
        (error) => {
          reject(new Error(`Upload failed:`));
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (urlError) {
            reject(new Error(`URL retrieval failed`));
          }
        }
      );
    });
  };

  const completeSignup = async (imageUrl) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name, photoURL: imageUrl });

      const userId = userCredential.user.uid;

      if (isDoctorSignup) {
        await setDoc(doc(db, "doctors", userId), {
          uid: userId,
          id: userId,
          name,
          speciality: doctorInfo.speciality,
          bio: doctorInfo.bio,
          degrees: doctorInfo.degrees,
          office: doctorInfo.office,
          email,
          image: imageUrl,
          rating: doctorInfo.rating,
          isOnline: false,
        });
        setSuccessMessage("Doctor account created successfully!");
      } else {
        const userRef = doc(db, "users", userId);
        await setDoc(userRef, { name, email, photoURL: imageUrl });
        setSuccessMessage("Account created successfully!");
      }

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setDoctorInfo({ speciality: "", bio: "", degrees: "", office: "", image: "", rating: 0 });
      setImageUpload(null);
      history.replace(refferer.pathname || '/'); // Use only the pathname
    } catch (error) {
      setError('Error, please try again');
      //console.error("Error during signup:", error);
    }
  };

  useEffect(() => {
    if (user && refferer && refferer.pathname) {
      history.replace(refferer.pathname);
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
            <div className="text-center mb-4">
              <Button variant={isDoctorSignup ? "secondary" : "primary"} onClick={() => setIsDoctorSignup(false)}>
                User Signup
              </Button>
              <Button variant={isDoctorSignup ? "primary" : "secondary"} onClick={() => setIsDoctorSignup(true)} className="ms-2">
                Doctor Signup
              </Button>
            </div>
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
                    <Form.Control.Feedback type="invalid">{validationErrors.confirmPassword}</Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                {isDoctorSignup && (
                  <>
                    <Form.Group className="mb-3" controlId="formBasicSpeciality">
                      <FloatingLabel controlId="floatingSpeciality" label="Speciality" className="mb-3">
                        <Form.Control
                          value={doctorInfo.speciality}
                          onChange={(e) => setDoctorInfo({ ...doctorInfo, speciality: e.target.value })}
                          className="rounded-pill ps-3"
                          type="text"
                          placeholder="Speciality"
                          isInvalid={!!validationErrors.speciality}
                          required
                        />
                        <Form.Control.Feedback type="invalid">{validationErrors.speciality}</Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicBio">
                      <FloatingLabel controlId="floatingBio" label="Bio" className="mb-3">
                        <Form.Control
                          value={doctorInfo.bio}
                          onChange={(e) => setDoctorInfo({ ...doctorInfo, bio: e.target.value })}
                          className="rounded-pill ps-3"
                          type="text"
                          placeholder="Bio"
                          isInvalid={!!validationErrors.bio}
                          required
                        />
                        <Form.Control.Feedback type="invalid">{validationErrors.bio}</Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDegrees">
                      <FloatingLabel controlId="floatingDegrees" label="Degrees" className="mb-3">
                        <Form.Control
                          value={doctorInfo.degrees}
                          onChange={(e) => setDoctorInfo({ ...doctorInfo, degrees: e.target.value })}
                          className="rounded-pill ps-3"
                          type="text"
                          placeholder="Degrees"
                          isInvalid={!!validationErrors.degrees}
                          required
                        />
                        <Form.Control.Feedback type="invalid">{validationErrors.degrees}</Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicOffice">
                      <FloatingLabel controlId="floatingOffice" label="Office" className="mb-3">
                        <Form.Control
                          value={doctorInfo.office}
                          onChange={(e) => setDoctorInfo({ ...doctorInfo, office: e.target.value })}
                          className="rounded-pill ps-3"
                          type="text"
                          placeholder="Office"
                          isInvalid={!!validationErrors.office}
                          required
                        />
                        <Form.Control.Feedback type="invalid">{validationErrors.office}</Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicImage">
                      <Form.Label>Upload Profile Image</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageUpload(e.target.files[0])}
                      />
                    </Form.Group>
                  </>
                )}

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
        {showPassword ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
      </span>
    </>
  );
};
