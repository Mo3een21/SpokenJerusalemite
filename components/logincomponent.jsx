import { signInWithEmailAndPassword ,signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth,db } from "../app/firebase/firebase";
import { doc, getDoc } from 'firebase/firestore';
import { toast } from "react-toastify";
import "./login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

    if(userDoc.data().status==="pending"||userDoc.data().status==="rejected"){
      alert("unauthorized access to the website")
     window.location.href = "..";
    }




     window.location.href = "..";
      toast.success("User logged in Successfully", {
        position: "top-center",
        
      });
    } catch (error) {
      alert("Incorrect Email or Password!!!\n Try Again" , error);
      console.log(error)
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
  );
}

export default Login;