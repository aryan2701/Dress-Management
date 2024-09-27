import React, { useState, useEffect } from "react";
import { getDispatchedData, getSchoolInventory, getSchools } from "../api";
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
  Paper,
  Box,
} from "@mui/material";

const HeadOfficeDashboard = ({ token }) => {
  const [schools, setSchools] = useState([]);
  const [selectedSchoolId, setSelectedSchoolId] = useState("");
  const [dispatchedData, setDispatchedData] = useState([]);
  const [schoolInventory, setSchoolInventory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await getSchools(token);
        setSchools(response.data);
      } catch (err) {
        console.error("Error fetching schools:", err);
      }
    };
    fetchSchools();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedSchoolId) return;

      setLoading(true);
      try {
        const [dispatchedResponse, inventoryResponse] = await Promise.all([
          getDispatchedData(token, selectedSchoolId),
          getSchoolInventory(selectedSchoolId, token),
        ]);
        setDispatchedData(dispatchedResponse.data);
        setSchoolInventory(inventoryResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedSchoolId, token]);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Head Office Dashboard
      </Typography>

      {/* School Selector */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Select School</InputLabel>
            <Select
              value={selectedSchoolId}
              onChange={(e) => setSelectedSchoolId(e.target.value)}
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

        {/* Dispatched Items Section */}
        {selectedSchoolId && !loading && (
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" color="secondary" gutterBottom>
                  Dispatched Items
                </Typography>
                {dispatchedData.length > 0 ? (
                  dispatchedData.map((dispatch) => (
                    <Paper
                      elevation={1}
                      key={dispatch.date}
                      sx={{
                        padding: 2,
                        marginBottom: 2,
                        backgroundColor: "#fafafa",
                      }}
                    >
                      <Typography variant="body1" gutterBottom>
                        Date: {new Date(dispatch.date).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        School: {dispatch.school}
                      </Typography>
                      <List>
                        {dispatch.dispatchedItems.map((item, index) => (
                          <ListItem key={index} sx={{ padding: "4px 0" }}>
                            {item.itemName} - Size: {item.size} - Quantity:{" "}
                            {item.quantity} - Price: ₹{item.pricePerItem} -
                            Total: ₹{item.totalPrice}
                          </ListItem>
                        ))}
                      </List>
                      <Typography variant="subtitle2">
                        Total Amount for the Day: ₹{dispatch.totalAmountForDay}
                      </Typography>
                    </Paper>
                  ))
                ) : (
                  <Typography>No dispatched items available.</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* School Inventory Section */}
        {selectedSchoolId && !loading && (
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" color="secondary" gutterBottom>
                  School Inventory
                </Typography>
                {schoolInventory ? (
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
                      {schoolInventory.inventoryItems[0]?.items.map(
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
        )}
      </Grid>
    </Box>
  );
};

export default HeadOfficeDashboard;
