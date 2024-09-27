// src/pages/Supplier.jsx
import React, { useState } from "react";
import SupplierDashboard from "../components/SupplierDashboard";
import Login from "../components/Login";

const Supplier = () => {
  const [token, setToken] = useState("");

  const handleLoginSuccess = (token) => {
    setToken(token);
  };

  return (
    <div>
      {token ? (
        <SupplierDashboard token={token} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default Supplier;
