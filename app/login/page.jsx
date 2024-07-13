'use client';
import React, { useState } from "react";
import Login from "/components/loginComponent";
import Register from "/components/registercomponent";
import "/components/login.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {isLogin ? <Login /> : <Register />}
        <div className="toggle-container">
          {isLogin ? (
            <p>
              New user? <span onClick={toggleAuthMode}>Register Here</span>
            </p>
          ) : (
            <p>
              Already registered? <span onClick={toggleAuthMode}>Login</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
