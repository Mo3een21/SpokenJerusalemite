import { signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../app/firebase/firebase";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import "./login.css";

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

const PasswordReset = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState(null);

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      setAlert({ message: "Password reset email sent. Please check your inbox.", type: "success" });
      setTimeout(onClose, 2000); // Close the reset password form after 2 seconds
    } catch (error) {
      setAlert({ message: error.message, type: "error" });
    }
  };

  return (
    <div className="password-reset">
      {alert && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <form onSubmit={handlePasswordReset}>
        <h3>Reset Password</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Send Reset Email
          </button>
        </div>
        <button onClick={onClose} className="btn btn-secondary mt-2">
          Cancel
        </button>
      </form>
    </div>
  );
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null); // State for managing custom alerts
  const [resetPassword, setResetPassword] = useState(false); // State for showing the reset password form

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      // Retrieve user data from Firestore using the UID
      const userDocRef = doc(db, 'Users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userStatus = userDoc.data().status;
        console.log('User data:', userStatus);

        if (userStatus === "pending" || userStatus === "rejected") {
          setAlert({ message: "Unauthorized access to the website", type: "error" });
          setTimeout(() => {
            signOut(auth);
            window.location.href = "..";
          }, 2000); // Delay for 2 seconds to allow alert to be visible
          return;
        }

        // Update the isActive field to true
        await updateDoc(userDocRef, { isActive: true });

        setAlert({ message: "Welcome!", type: "success" });
        setTimeout(() => {
          window.location.href = "..";
        }, 800); // Delay to allow alert to be visible
      } else {
        setAlert({ message: "No such document!", type: "error" });
        setTimeout(() => {
          signOut(auth);
          window.location.href = "..";
        }, 2000); // Delay for 2 seconds to allow alert to be visible
      }
    } catch (error) {
      setAlert({ message: "Incorrect Email or Password!\nTry Again", type: "error" });
      console.log(error);
    }
  };

  return (
    <div>
      {alert && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      {resetPassword ? (
        <PasswordReset onClose={() => setResetPassword(false)} />
      ) : (
        <form onSubmit={handleSubmit}>
          <img
            src="/assets/images/logo.png"
            alt="Logo"
            style={{ display: "block", margin: "auto", width: "300px", height: "auto" }}
          />
          <h3>Login</h3>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </div>
          <p className="forgot-password text-right">
            Forgot password? <button type="button" className="btn btn-link" onClick={() => setResetPassword(true)}>Reset Password</button>
          </p>
          <p className="forgot-password text-right">
            New user? <a href="../register">Register Here</a>
          </p>
        </form>
      )}
    </div>
  );
}

export default Login;
