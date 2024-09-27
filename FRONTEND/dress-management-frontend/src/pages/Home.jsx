// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";

const Home = () => {
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
      <Typography variant="h2" component="h1" gutterBottom>
        Dress Management Application
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: "2rem" }}>
        Manage your dress inventory with ease.
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/supplier"
        >
          Supplier
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/school"
        >
          School
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/headoffice"
        >
          Head Office
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
