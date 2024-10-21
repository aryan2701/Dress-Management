// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";
import { School, Store, BusinessCenter } from "@mui/icons-material";

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
        background: "linear-gradient(to bottom right, #f0f4f8, #cfe9f1)", // Softer gradient
        borderRadius: "16px",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)", // Subtle shadow for a smoother look
        padding: "3rem",
        transition: "all 0.3s ease-in-out", // Smooth transitions for hover effects
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#2c3e50", // Darker and softer color for contrast
          textAlign: "center",
          fontSize: { xs: "2rem", sm: "3rem" }, // Responsive font size
        }}
      >
        Dress Management Application
      </Typography>
      <Typography
        variant="h6"
        sx={{
          marginBottom: "2.5rem",
          color: "#7f8c8d", // Lighter shade of gray for supporting text
          textAlign: "center",
          fontSize: "1.2rem",
        }}
      >
        Seamlessly manage your dress inventory.
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        gap={3} // Increase gap for better spacing
        sx={{ width: "100%" }}
      >
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/supplier"
          startIcon={<Store sx={{ color: "#fff", transition: "transform 0.3s", "&:hover": { transform: "rotate(20deg)" } }} />}
          sx={{
            backgroundColor: "#3f51b5", // Blue for supplier
            padding: "0.75rem 1.5rem", // Bigger button padding
            fontSize: "1.1rem", // Larger font size for buttons
            "&:hover": {
              backgroundColor: "#303f9f", // Darker blue on hover
              transform: "scale(1.08)", // More pronounced hover effect
            },
            transition: "background-color 0.3s, transform 0.3s", // Smooth transitions
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
          }}
        >
          Supplier
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/school"
          startIcon={<School sx={{ color: "#fff", transition: "transform 0.3s", "&:hover": { transform: "rotate(20deg)" } }} />}
          sx={{
            backgroundColor: "#1976d2", // Blue for school
            padding: "0.75rem 1.5rem",
            fontSize: "1.1rem",
            "&:hover": {
              backgroundColor: "#115293", // Darker blue on hover
              transform: "scale(1.08)",
            },
            transition: "background-color 0.3s, transform 0.3s",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          School
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/headoffice"
          startIcon={<BusinessCenter sx={{ color: "#fff", transition: "transform 0.3s", "&:hover": { transform: "rotate(20deg)" } }} />}
          sx={{
            backgroundColor: "#3f51b5", // Blue for head office
            padding: "0.75rem 1.5rem",
            fontSize: "1.1rem",
            "&:hover": {
              backgroundColor: "#303f9f", // Darker blue on hover
              transform: "scale(1.08)",
            },
            transition: "background-color 0.3s, transform 0.3s",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          Head Office
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
