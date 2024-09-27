// src/pages/Headoffice.jsx
import React, { useState } from "react";
import HeadOfficeDashboard from "../components/HeadOfficeDashboard";
import Login from "../components/Login";

const Headoffice = () => {
  const [token, setToken] = useState("");

  const handleLoginSuccess = (token) => {
    setToken(token);
  };

  return (
    <div>
      {token ? (
        <HeadOfficeDashboard token={token} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default Headoffice;
