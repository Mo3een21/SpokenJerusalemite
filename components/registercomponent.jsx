import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { auth, db } from "../app/firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

import "./login.css";
import "react-toastify/dist/ReactToastify.css";

const CustomAlert = ({ message, type, onClose }) => {
  return (
    <div className="custom-alert-overlay">
      <div className={`custom-alert ${type}`}>
        <p>{message}</p>
        <button onClick={onClose} className="custom-alert-close">Close</button>
      </div>
    </div>
  );
};

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("");
  const [focused, setFocused] = useState(false);
  const [alert, setAlert] = useState(null); // State for managing custom alerts

  const validate = () => {
    const errors = {};

    // Check if fields are empty
    if (!fname) errors.fname = "First name is required.";
    if (!lname) errors.lname = "Last name is required.";
    if (!email) errors.email = "Email is required.";
    if (!password) errors.password = "Password is required.";
    if (!phoneNumber) errors.phoneNumber = "Phone number is required.";

    // Check if first name and last name contain only letters
    const nameRegex = /^[A-Za-z]+$/;
    if (fname && !nameRegex.test(fname)) errors.fname = "First name must contain only letters.";
    if (lname && !nameRegex.test(lname)) errors.lname = "Last name must contain only letters.";

    // Check if password is strong
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (password && !passwordRegex.test(password)) {
      errors.password = "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    // Check if phone number is valid
    const phoneRegex = /^05\d{8}$/;
    if (phoneNumber && !phoneRegex.test(phoneNumber)) {
      errors.phoneNumber = "Phone number must be a valid Israeli phone number (e.g., 0501234567).";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      setAlert({ message: "Please fix the validation errors.", type: "error" });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        const timestamp = new Date().toISOString(); // Get the current date and time in ISO format
        await setDoc(doc(db, "Users", user.uid), {
          uid: user.uid,
          email: user.email,
          firstName: fname,
          lastName: lname,
          phoneNumber: phoneNumber,
          photo: "",
          status: "pending",
          requestDate: timestamp // Save the registration date and time
        });
      }
      setAlert({ message: "Registration Request Sent.\nWait for Acceptance!!!", type: "success" });
      setTimeout(() => {
        window.location.href = "../login";
      }, 2000); // Delay for 2 seconds to allow alert to be visible
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setAlert({ message: "The email address is already in use.", type: "error" });
      } else {
        setAlert({ message: error.message, type: "error" });
      }
    }
  };

  useEffect(() => {
    const evaluatePasswordStrength = () => {
      if (!password) {
        setPasswordStrength("");
        return;
      }

      const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      const mediumPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

      if (strongPasswordRegex.test(password)) {
        setPasswordStrength("strong");
      } else if (mediumPasswordRegex.test(password)) {
        setPasswordStrength("medium");
      } else {
        setPasswordStrength("weak");
      }
    };

    evaluatePasswordStrength();
  }, [password]);

  return (
    <div>
      {alert && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <form onSubmit={handleRegister}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src="/assets/images/logo.png"
            alt="Logo"
            style={{ width: "250px", height: "auto" }}
          />
        </div>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={(e) => setFname(e.target.value)}
            required
          />
          {errors.fname && <p className="error-text">{errors.fname}</p>}
        </div>

        <div className="mb-3">
          <label>Last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            onChange={(e) => setLname(e.target.value)}
            required
          />
          {errors.lname && <p className="error-text">{errors.lname}</p>}
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        <div className="mb-3">
          <label>Phone Number</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter phone number"
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          {errors.phoneNumber && <p className="error-text">{errors.phoneNumber}</p>}
        </div>

        <div className="mb-3">
          <label>Password (strong password)</label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              required
              style={{ marginRight: "10px" }}
            />
            {focused && (
              <img
                src={
                  passwordStrength === "strong"
                    ? "/assets/images/true_log.png"
                    : "/assets/images/false_log.png"
                }
                alt={
                  passwordStrength === "strong"
                    ? "Strong Password"
                    : "Weak Password"
                }
                style={{ width: "50px", height: "50px" }}
              />
            )}
          </div>
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered? <a href="/login">Sign in</a>
        </p>
      </form>
    </div>
  );
}

export default Register;
