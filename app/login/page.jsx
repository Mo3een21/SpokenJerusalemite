'use client';
import React, { useState } from "react";
import Login from "/components/logincomponent";
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
      </div>
    </div>
  );
};

export default AuthPage;
