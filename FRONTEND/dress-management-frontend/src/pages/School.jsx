// src/pages/School.jsx
import React, { useState } from "react";
import SchoolDashboard from "../components/SchoolDashboard";
import Login from "../components/Login";

const School = () => {
  const [token, setToken] = useState("");

  const handleLoginSuccess = (token) => {
    setToken(token);
  };

  return (
    <div>
      {token ? (
        <SchoolDashboard token={token} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default School;
