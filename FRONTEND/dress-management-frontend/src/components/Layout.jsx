// src/layout/Layout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Home, Store, School, BusinessCenter } from "@mui/icons-material";

const Layout = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" width="100%">
      {/* AppBar for Navigation */}
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(to right, #0d47a1, #2196f3)", // Blue gradient for a professional look
          boxShadow: 4,
        }}
      >
        <Toolbar>
        <Typography
  variant="h6"
  component="div"
  sx={{
    flexGrow: 1,
    color: "#ffffff", // Keep the color white for contrast
    fontWeight: "bold",
    fontSize: "1.5rem", // Increase font size for better visibility
    letterSpacing: "0.05em", // Slightly increased letter spacing
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", // More pronounced shadow for depth
    transition: "all 0.3s ease-in-out", // Smooth transition for hover effects
    "&:hover": {
      textShadow: "3px 3px 6px rgba(0, 0, 0, 0.5)", // Enhanced shadow on hover
      transform: "scale(1.05)", // Slight scale effect on hover
    },
  }}
>
  Dress Management
</Typography>


          <Button
            color="inherit"
            component={Link}
            to="/"
            startIcon={<Home />}
            sx={{
              "&:hover": {
                backgroundColor: "#1976d2", // Slightly lighter blue on hover
                transform: "scale(1.05)",
              },
              transition: "all 0.3s ease-in-out",
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/supplier"
            startIcon={<Store />}
            sx={{
              "&:hover": {
                backgroundColor: "#1976d2",
                transform: "scale(1.05)",
              },
              transition: "all 0.3s ease-in-out",
            }}
          >
            Supplier
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/school"
            startIcon={<School />}
            sx={{
              "&:hover": {
                backgroundColor: "#1976d2",
                transform: "scale(1.05)",
              },
              transition: "all 0.3s ease-in-out",
            }}
          >
            School
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/headoffice"
            startIcon={<BusinessCenter />}
            sx={{
              "&:hover": {
                backgroundColor: "#1976d2",
                transform: "scale(1.05)",
              },
              transition: "all 0.3s ease-in-out",
            }}
          >
            Head Office
          </Button>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4, // Vertical padding
          px: 3, // Horizontal padding
          width: "100%",
          backgroundColor: "#e3f2fd", // Light blue background for the content
        }}
      >
        <Outlet /> {/* Renders the current page content */}
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          textAlign: "center",
          py: 2,
          backgroundColor: "#ffffff", // White background for footer
          width: "100%",
          boxShadow: 2, // Slight elevation effect
          mt: "auto", // Pushes footer to the bottom of the page
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Dress Management System
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;
