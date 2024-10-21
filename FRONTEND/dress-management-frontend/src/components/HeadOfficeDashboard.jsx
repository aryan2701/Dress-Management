import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Box,
  AppBar,
  Toolbar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getDispatchedData, getSchoolInventory, getSchools } from "../api";

const HeadOfficeDashboard = ({ token }) => {
  const [schools, setSchools] = useState([]);
  const [selectedSchoolId, setSelectedSchoolId] = useState("");
  const [dispatchedData, setDispatchedData] = useState([]);
  const [schoolInventory, setSchoolInventory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // Fetch the list of schools when the component mounts
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await getSchools(token);
        console.log("Fetched Schools:", response.data); // Debugging
        setSchools(response.data);
      } catch (err) {
        console.error("Error fetching schools:", err);
      }
    };
    fetchSchools();
  }, [token]);

  // Fetch dispatched data and inventory for the selected school
  useEffect(() => {
    const fetchData = async () => {
      if (!selectedSchoolId) return;

      setLoading(true);
      try {
        const [dispatchedResponse, inventoryResponse] = await Promise.all([
          getDispatchedData(token, selectedSchoolId),
          getSchoolInventory(selectedSchoolId, token),
        ]);

        console.log("Dispatched Data:", dispatchedResponse.data); // Debugging
        console.log("School Inventory:", inventoryResponse.data); // Debugging

        setDispatchedData(dispatchedResponse.data || []);
        setSchoolInventory(inventoryResponse.data);

        // Calculate total revenue
        const revenue =
          inventoryResponse.data?.inventoryItems?.[0]?.items.reduce(
            (acc, item) => acc + (item.totalRevenue || 0),
            0
          ) || 0;

        setTotalRevenue(revenue);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedSchoolId, token]);

  return (
    <Box sx={{ padding: 3, bgcolor: "#f0f4f8", minHeight: "100vh" }}>
      {/* App Bar */}
      <AppBar position="static" sx={{ mb: 3, bgcolor: "#1976d2" }}>
        <Toolbar>
          <SchoolIcon />
          <Typography variant="h6" sx={{ ml: 2, color: "#fff" }}>
            Head Office Dashboard
          </Typography>
          <IconButton
            onClick={() => window.location.reload()}
            sx={{ marginLeft: "auto", color: "#fff" }}
          >
            <Tooltip title="Refresh Data">
              <RefreshIcon />
            </Tooltip>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* School Selector */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Select School</InputLabel>
            <Select
              value={selectedSchoolId}
              onChange={(e) => {
                setSelectedSchoolId(e.target.value);
                setDispatchedData([]); // Clear dispatched data when changing school
                setSchoolInventory(null); // Clear inventory when changing school
                setTotalRevenue(0); // Reset total revenue
              }}
              label="Select School"
            >
              <MenuItem value="" disabled>
                Select a school
              </MenuItem>
              {schools.length > 0 ? (
                schools.map((school) => (
                  <MenuItem key={school._id} value={school._id}>
                    {school.username}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No schools available</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        {/* Loading Indicator */}
        {loading && (
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
        )}
      </Grid>

      {/* Total Revenue Section */}
      {selectedSchoolId && !loading && (
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={12}>
            <Card elevation={3} sx={{ mb: 3, backgroundColor: "#e3f2fd" }}>
              <CardContent>
                <Typography variant="h5" color="primary" gutterBottom>
                  Total Revenue Generated: ₹{totalRevenue}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Dispatched Items Section */}
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  Dispatched Items for{" "}
                  {
                    schools.find((school) => school._id === selectedSchoolId)
                      ?.username
                  }
                </Typography>
                <Box
                  sx={{
                    maxHeight: 400,
                    overflowY: "auto",
                    mb: 2,
                    border: "1px solid #e0e0e0",
                    borderRadius: 2,
                    padding: 1,
                    bgcolor: "#ffffff",
                  }}
                >
                  {dispatchedData.length > 0 ? (
                    dispatchedData
                    //.filter(dispatch => dispatch.schoolId === selectedSchoolId)
                    . map((dispatch) => (
                      <Accordion key={dispatch.date} elevation={1}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography variant="body1">
                            <strong>Date:</strong>{" "}
                            {new Date(dispatch.date).toLocaleDateString()}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography variant="body2" color="textSecondary">
                            <strong>School:</strong> {dispatch.school}
                          </Typography>
                          <List>
                            {dispatch.dispatchedItems.map((item, index) => (
                              <ListItem
                                key={index}
                                sx={{
                                  padding: "4px 0",
                                  borderBottom: "1px solid #e0e0e0",
                                }}
                              >
                                <Typography variant="body2">
                                  {item.itemName} - Size: {item.size} -
                                  Quantity: {item.quantity} - Price: ₹
                                  {item.pricePerItem} - Total: ₹
                                  {item.totalPrice}
                                </Typography>
                              </ListItem>
                            ))}
                          </List>
                          <Divider sx={{ my: 1 }} />
                          <Typography variant="subtitle2">
                            <strong>Total Amount for the Day:</strong> ₹
                            {dispatch.totalAmountForDay}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))
                  ) : (
                    <Typography>No dispatched items available.</Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* School Inventory Section */}
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  School Inventory
                </Typography>
                {schoolInventory &&
                schoolInventory.inventoryItems?.length > 0 ? (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell>Size</TableCell>
                        <TableCell>Quantity Received</TableCell>
                        <TableCell>Quantity Sold</TableCell>
                        <TableCell>Price Sold At</TableCell>
                        <TableCell>Total Revenue</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {schoolInventory.inventoryItems[0].items.map(
                        (item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.itemName}</TableCell>
                            <TableCell>{item.size}</TableCell>
                            <TableCell>{item.quantityReceived}</TableCell>
                            <TableCell>{item.quantitySold || 0}</TableCell>
                            <TableCell>₹{item.priceSoldAt}</TableCell>
                            <TableCell>₹{item.totalRevenue || 0}</TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                ) : (
                  <Typography>No inventory data available.</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default HeadOfficeDashboard;
