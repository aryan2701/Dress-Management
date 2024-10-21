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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Define size-price mapping based on item and size combinations
const ITEM_SIZE_PRICE_MAP = {
  "Shirt Full Sleeves": {
    sizes: ["24", "26", "28", "30", "32","34","36","38","40","42"],
    prices: {
      "24": 310,
      "26": 310,
      "28": 320,
      "30": 320,
      "32": 320,
      "34": 350,
      "36": 350,
      "38": 375,
      "40": 375,
      "42": 375
    },
  },
 "Normal Skirt": {
    sizes: ["24", "26", "28", "30", "32","34","36","38","40","42"],
    prices: {
      "24": 290,
      "26": 290,
      "28": 320,
      "30": 320,
      "32": 320,
      "34": 350,
      "36": 350,
      "38": 380,
      "40": 380,
      "42": 380
    },
  },
  "Divider Skirt":{
    sizes: ["20''","22''","24''","26''"],
    prices:{
      "20''": 410,
      "22''": 410,
      "24''": 430,
      "26''": 430
    },
  },
  "Pant Elastic":{
    sizes: ["22","24","26","28","30","32","34","36","38","40","42","44"],
    prices:{
      "22": 310,
      "24": 310,
      "26": 310,
      "28": 325,
      "30": 325,
      "32": 325,
      "34": 350,
      "36": 350,
      "38": 380,
      "40": 380,
      "42": 380,
      "44": 380
    },
  },
  "House Tshirt Spun Matty":{
    sizes: ["22","24","26","28","30","32","34","36","38","40","42","44"],
    prices:{
      "22": 160,
      "24": 160,
      "26": 160,
      "28": 170,
      "30": 170,
      "32": 170,
      "34": 180,
      "36": 180,
      "38": 195,
      "40": 195,
      "42": 195,
      "44": 195
    },
  },
  "PC Matty House Tshirt":{
    sizes: ["22","24","26","28","30","32","34","36","38","40","42","44"],
    prices:{
      "22": 210,
      "24": 210,
      "26": 210,
      "28": 225,
      "30": 225,
      "32": 225,
      "34": 240,
      "36": 240,
      "38": 260,
      "40": 260,
      "42": 260,
      "44": 260
    },
  },
 
 
  "Coat":{
     sizes: ["24","26","28","30","32","34","36","38","40","42","44"],
    prices:{
      "24": 740,
      "26": 740,
      "28": 840,
      "30": 840,
      "32": 840,
      "34": 960,
      "36": 960,
      "38": 960,
      "40": 999,
      "42": 999,
      "44": 999
    },
  },
  "Tie":{
    sizes: ["Zipper 12''","Zipper 14''","Zipper 16''","Zipper 18''"],
    prices:{
      "Zipper 12''":105,
      "Zipper 14''":105,
      "Zipper 16''":105,
      "Zipper 18''":105
    },
  },
  "Belts":{
    sizes: ["80cm","95cm","110cm","120cm"],
    prices:{
       "80cm": 100,
       "95cm": 100,
       "110cm": 100,
       "120cm": 100
    },
  },
  "RSGS Socks":{
   sizes: ["2","3","4","5","6","FS"],
   prices:{
    "2": (36 + (36 * 5) / 100).toFixed(2),
  "3": (38 + (38 * 5) / 100).toFixed(2),
  "4": (40 + (40 * 5) / 100).toFixed(2),
  "5": (42 + (42 * 5) / 100).toFixed(2),
  "6": (44 + (44 * 5) / 100).toFixed(2),
  "FS": (46 + (46 * 5) / 100).toFixed(2)
   }
  },
  "Hoodie/Sweatshirt":{
    sizes: ["22","24","26","28","30","32","34","36","38","40","42","44"],
    prices:{
      "22": 490,
      "24": 490,
      "26": 490,
      "28": 530,
      "30": 530,
      "32": 530,
      "34": 575,
      "36": 575,
      "38": 625,
      "40": 625,
      "42": 625,
      "44": 625
    },
  },
  "Lower Navy 1 line White":{
    sizes:["20","22","24","26","28","30","32","34","36","38","40","42","44"],
     prices:{
      "20": 175,
      "22": 175,
      "24": 175,
      "26": 175,
      "28": 185,
      "30": 185,
      "32": 185,
      "34": 195,
      "36": 195,
      "38": 205,
      "40": 205,
      "42": 205,
      "44": 205
    },
  }
};

const SupplierDashboard = ({ token }) => {
  const [dispatchedItems, setDispatchedItems] = useState([]);
  const [schools, setSchools] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedItems, setSelectedItems] = useState([
    { itemId: "", size: "", quantity: 0, price: 0 },
  ]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDispatchedItems = async () => {
      try {
        setLoading(true);
        const { data } = await getDispatchedItems(token);
        setDispatchedItems(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dispatched items", err);
        setLoading(false);
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
  
    
    if (field === "itemId" || field === "size") {
      const selectedItem = items.find(item => item._id === newItems[index].itemId);
      const selectedSize = newItems[index].size;
  
      if (selectedItem && ITEM_SIZE_PRICE_MAP[selectedItem.name]) {
        const unitPrice = ITEM_SIZE_PRICE_MAP[selectedItem.name].prices[selectedSize] || 0;
        newItems[index].price = unitPrice * (newItems[index].quantity || 0); 
      } else {
        newItems[index].price = 0; 
      }
    }
  
    if (field === "quantity") {
      const selectedItem = items.find(item => item._id === newItems[index].itemId);
      const selectedSize = newItems[index].size;
  
      if (selectedItem && ITEM_SIZE_PRICE_MAP[selectedItem.name]) {
        const unitPrice = ITEM_SIZE_PRICE_MAP[selectedItem.name].prices[selectedSize] || 0;
        newItems[index].price = unitPrice * (value || 0); 
      }
    }
  
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

  // Group items by both school and date
  const groupBySchoolAndDate = (items) => {
    return items.reduce((acc, item) => {
      const school = item.schoolId.username;
      const date = new Date(item.dispatchedAt).toLocaleDateString();

      if (!acc[school]) {
        acc[school] = {};
      }

      if (!acc[school][date]) {
        acc[school][date] = [];
      }

      acc[school][date].push(item);
      return acc;
    }, {});
  };

  const groupedDispatchedItems = groupBySchoolAndDate(dispatchedItems);

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
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
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
                      <MenuItem
                        key={availableItem._id}
                        value={availableItem._id}
                      >
                        {availableItem.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={2}>
                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                  <InputLabel id={`size-label-${index}`}>Size</InputLabel>
                  <Select
                    labelId={`size-label-${index}`}
                    value={item.size}
                    onChange={(e) =>
                      handleItemChange(index, "size", e.target.value)
                    }
                    label="Size"
                    disabled={!item.itemId} // Disable size selection if no item is selected
                  >
                    <MenuItem value="">
                      <em>Select a Size</em>
                    </MenuItem>
                    {item.itemId && ITEM_SIZE_PRICE_MAP[items.find(i => i._id === item.itemId)?.name]?.sizes.map((size) => (
                      <MenuItem key={size} value={size}>
                        {size}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={2}>
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
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Price"
                  value={item.price}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              {index > 0 && (
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => removeItem(index)}
                  >
                    Remove Item
                  </Button>
                </Grid>
              )}
            </Grid>
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
        {loading ? (
          <CircularProgress />
        ) : (
          Object.keys(groupedDispatchedItems).map((school) => (
            <Accordion key={school}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{school}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {Object.keys(groupedDispatchedItems[school]).map((date) => (
                  <Accordion key={date}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>{date}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TableContainer component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Item</TableCell>
                              <TableCell>Quantity</TableCell>
                              <TableCell>Size</TableCell>
                              <TableCell>Price</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {groupedDispatchedItems[school][date].map(
                              (dispatch) => (
                                <React.Fragment key={dispatch._id}>
                                  {dispatch.items.map((item) => (
                                    <TableRow key={item.itemId._id}>
                                      <TableCell>{item.itemId.name}</TableCell>
                                      <TableCell>{item.quantity}</TableCell>
                                      <TableCell>{item.size}</TableCell>
                                      <TableCell>{item.price}</TableCell>
                                    </TableRow>
                                  ))}
                                </React.Fragment>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </Box>
    </Container>
  );
};

export default SupplierDashboard;
