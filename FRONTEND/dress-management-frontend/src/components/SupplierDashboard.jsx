import React, { useEffect, useState } from "react";
import {
  dispatchItems,
  getDispatchedItems,
  getSchools,
  getItems,
} from "../api";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const SupplierDashboard = ({ token }) => {
  const [dispatchedItems, setDispatchedItems] = useState([]);
  const [schools, setSchools] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedItems, setSelectedItems] = useState([
    { itemId: "", size: "", quantity: 0, price: 0 },
  ]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDispatchedItems = async () => {
      try {
        const { data } = await getDispatchedItems(token);
        setDispatchedItems(data);
      } catch (err) {
        console.error("Error fetching dispatched items", err);
      }
    };
    fetchDispatchedItems();
  }, [token]);

  useEffect(() => {
    const fetchSchoolsAndItems = async () => {
      try {
        const schoolResponse = await getSchools(token);
        setSchools(schoolResponse.data);

        const itemResponse = await getItems(token);
        setItems(itemResponse.data);
      } catch (err) {
        console.error("Error fetching schools or items", err);
      }
    };
    fetchSchoolsAndItems();
  }, [token]);

  const handleDispatch = async () => {
    if (!selectedSchool) {
      setError("Please select a school");
      return;
    }

    const dispatchData = {
      schoolId: selectedSchool,
      items: selectedItems,
    };

    try {
      await dispatchItems(dispatchData, token);
      alert("Items dispatched successfully");
      setSelectedItems([{ itemId: "", size: "", quantity: 0, price: 0 }]);
      setSelectedSchool("");
      setError("");
    } catch (err) {
      console.error("Dispatch failed", err);
      setError("Dispatch failed. Please try again.");
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...selectedItems];
    newItems[index][field] = value;
    setSelectedItems(newItems);
  };

  const addNewItem = () => {
    setSelectedItems([
      ...selectedItems,
      { itemId: "", size: "", quantity: 0, price: 0 },
    ]);
  };

  const removeItem = (index) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const groupByDate = (items) => {
    return items.reduce((acc, item) => {
      const date = new Date(item.dispatchedAt).toLocaleDateString();
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    }, {});
  };

  const groupedDispatchedItems = groupByDate(dispatchedItems);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Supplier Dashboard
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Box mb={3}>
        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <InputLabel id="school-label">Select School</InputLabel>
          <Select
            labelId="school-label"
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            label="Select School"
          >
            <MenuItem value="">
              <em>Select a school</em>
            </MenuItem>
            {schools.map((school) => (
              <MenuItem key={school._id} value={school._id}>
                {school.username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Typography variant="h5">Dispatch Items</Typography>
      {selectedItems.map((item, index) => (
        <Card key={index} sx={{ marginBottom: 2 }}>
          <CardContent>
            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
              <InputLabel id={`item-label-${index}`}>Item</InputLabel>
              <Select
                labelId={`item-label-${index}`}
                value={item.itemId}
                onChange={(e) =>
                  handleItemChange(index, "itemId", e.target.value)
                }
                label="Item"
              >
                <MenuItem value="">
                  <em>Select an Item</em>
                </MenuItem>
                {items.map((availableItem) => (
                  <MenuItem key={availableItem._id} value={availableItem._id}>
                    {availableItem.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              variant="outlined"
              label="Size"
              value={item.size}
              onChange={(e) => handleItemChange(index, "size", e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Quantity"
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", e.target.value)
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Price"
              type="number"
              value={item.price}
              onChange={(e) => handleItemChange(index, "price", e.target.value)}
              sx={{ mb: 2 }}
            />
            {selectedItems.length > 1 && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => removeItem(index)}
                sx={{ mt: 2 }}
              >
                Remove Item
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button variant="contained" color="primary" onClick={addNewItem}>
          Add Another Item
        </Button>
        <Button variant="contained" color="success" onClick={handleDispatch}>
          Dispatch Items
        </Button>
      </Box>

      <Box mt={4}>
        <Typography variant="h5">Dispatched Items</Typography>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>School</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dispatchedItems.map((dispatch) => (
                <React.Fragment key={dispatch._id}>
                  {dispatch.items.map((item) => (
                    <TableRow key={item.itemId._id}>
                      <TableCell>
                        {new Date(dispatch.dispatchedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{dispatch.schoolId.username}</TableCell>
                      <TableCell>{item.itemId.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.size}</TableCell>
                      <TableCell>{item.price}</TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default SupplierDashboard;
