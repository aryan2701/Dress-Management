// src/components/Login.jsx
import { useState } from "react";
import { login } from "../api";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState(""); // Changed to username
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state
    try {
      const { data } = await login({ username, password }); // Send username instead of email
      onLoginSuccess(data.token, data.role);
    } catch (err) {
      console.error("Login failed", err);
      setError("Login failed. Please check your username and password.");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f4f8",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        padding: "2rem",
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom>
        Login
      </Typography>

      {error && (
        <Alert severity="error" sx={{ marginBottom: "1rem" }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
