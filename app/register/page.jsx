'use client';
import React, { useState } from "react";
import Login from "/components/logincomponent";
import Register from "/components/registercomponent";
import "/components/login.css";

const RegisterPage = () => {
  const [isRegister, setIsRegister] = useState(true);

  const toggleAuthMode = () => {
    setIsRegister((prevIsRegister) => !prevIsRegister);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {isRegister ? <Register /> : <Login />}
        <div className="toggle-container">
          {isRegister ? (
            <p>
              Already registered? <span onClick={toggleAuthMode}>Login</span>
            </p>
          ) : (
            <p>
              New user? <span onClick={toggleAuthMode}>Register Here</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
