import { useState } from "react";
import { login } from "../api";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state
    setLoading(true); // Set loading to true

    // Simple validation
    if (!username || !password) {
      setError("Both fields are required.");
      setLoading(false); // Reset loading
      return;
    }

    try {
      const { data } = await login({ username, password });
      onLoginSuccess(data.token, data.role);
    } catch (err) {
      console.error("Login failed", err);
      setError("Login failed. Please check your username and password.");
    } finally {
      setLoading(false); // Reset loading regardless of success or failure
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
        backgroundColor: "#f9fafc",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)", // A bit deeper shadow for more emphasis
        padding: "2rem",
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: "bold" }}>
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
          aria-label="Username"
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#3949ab", // Highlight input on focus
              },
            },
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="Password"
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#3949ab",
              },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading} // Disable button when loading
          sx={{
            marginTop: "1rem",
            position: "relative",
            height: "3.5rem", // Slightly taller button for a modern feel
            backgroundColor: "#3949ab",
            "&:hover": {
              backgroundColor: "#303f9f", // Hover effect
              transform: "scale(1.02)", // Slight scale-up on hover
            },
            transition: "background-color 0.3s, transform 0.3s ease-in-out", // Smooth transition
          }}
        >
          {loading ? (
            <>
              <CircularProgress
                size={24}
                sx={{ position: "absolute", left: "50%", marginLeft: "-12px" }}
              />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Container>
  );
};

export default Login;
