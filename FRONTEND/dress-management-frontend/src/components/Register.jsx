import { useState } from "react";
import { register } from "../api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("school");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ email, password, role });
      alert("Registration successful");
    } catch (err) {
      console.error("Registration failed", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="school">School</option>
        <option value="supplier">Supplier</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
