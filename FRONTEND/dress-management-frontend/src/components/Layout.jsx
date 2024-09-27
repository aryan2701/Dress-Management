import React from "react";
import { Outlet, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";

const Layout = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" width="100%">
      {/* AppBar for Navigation */}
      <AppBar
        position="static"
        sx={{ backgroundColor: "#3f51b5", boxShadow: 3 }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dress Management
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/supplier">
            Supplier
          </Button>
          <Button color="inherit" component={Link} to="/school">
            School
          </Button>
          <Button color="inherit" component={Link} to="/headoffice">
            Head Office
          </Button>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          paddingY: 3,
          width: "100%", // Ensure it covers the full width
        }}
      >
        <Outlet /> {/* This will render the appropriate page content */}
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          textAlign: "center",
          padding: 2,
          backgroundColor: "#f4f4f4",
          width: "100%", // Ensure footer covers the full width
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} Dress Management System
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;
