import { signInWithEmailAndPassword ,signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth,db } from "../app/firebase/firebase";
import { doc, getDoc } from 'firebase/firestore';
import { toast } from "react-toastify";
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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null); // State for managing custom alerts

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      
      console.log(user.uid);
      // Retrieve user data from Firestore using the UID
      const userDocRef = doc(db, 'Users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.data()) {
        console.log('User data:', userDoc.data().status);
      } else {
        console.log('No such document!');
      }

      if (userDoc.data().status === "pending" || userDoc.data().status === "rejected") {
        setAlert({ message: "Unauthorized access to the website", type: "error" });
        setTimeout(() => {
          window.location.href = "..";
        }, 2000); // Delay for 2 seconds to allow alert to be visible
        return;
      }

      window.location.href = "..";
      setAlert({ message: "User logged in successfully", type: "success" });
    } catch (error) {
      setAlert({ message: "Incorrect Email or Password! Try Again", type: "error" });
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
          New user <a href="../register">Register Here</a>
        </p>
      </form>
    </div>
  );
}

export default Login;