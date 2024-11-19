import React, { useEffect, useState } from "react";
import {
  getPendingDispatches,
  verifyDispatch,
  getStudentDetails,
  sellItemsToStudent,
  getItems,
} from "../api"; // Ensure this points to the correct API file
const sizePriceMap = {
  "Shirt Full Sleeves": {
    sizes: [ "20", "22","24", "26", "28", "30", "32", "34", "36", "38", "40", "42"],
    prices: {
      "20": 400,
      "22": 400,
      "24": 400,
      "26": 400,
      "28": 420,
      "30": 420,
      "32": 420,
      "34": 450,
      "36": 450,
      "38": 475,
      "40": 475,
      "42": 475,
      "44": 475,
    },
  },
  "Normal Skirt": {
    sizes: ["20","22","24", "26", "28", "30", "32","34","36","38","40","42"],
    prices: {
      "20": 350,
      "22": 350,
      "24": 350,
      "26": 350,
      "28": 370,
      "30": 370,
      "32": 370,
      "34": 390,
      "36": 390,
      "38": 410,
      "40": 410,
      "42": 410
    },
  },
  "Divider Skirt":{
    sizes: ["20","22","24","26"],
    prices:{
      "20": 460,
      "22": 480,
      "24": 500,
      "26": 510
    },
  },
  "Pant Elastic":{
    sizes: ["20", "22" , "24","26","28","30","32","34","36","38","40","42","44"],
    prices:{
      "20": 360,
      "22": 360,
      "24": 360,
      "26": 360,
      "28": 380,
      "30": 380,
      "32": 380,
      "34": 400,
      "36": 400,
      "38": 450,
      "40": 450,
      "42": 450,
      "44": 450
    },
  },
 
  "PC Matty House Tshirt":{
    sizes: ["20", "22" ,"24","26","28","30","32","34","36","38","40","42","44"],
    prices:{
       "20": 270,
       "22": 270,
      "24": 270,
      "26": 270,
      "28": 290,
      "30": 290,
      "32": 290,
      "34": 300,
      "36": 300,
      "38": 320,
      "40": 320,
      "42": 320,
      "44": 320
    },
  },
 
 
  "Coat":{
     sizes: ["20","22","24","26","28","30","32","34","36","38","40","42","44"],
    prices:{
      "20": 950,
      "22": 950,
      "24": 950,
      "26": 950,
      "28": 1050,
      "30": 1050,
      "32": 1050,
      "34": 1150,
      "36": 1150,
      "38": 1250,
      "40": 1250,
      "42": 1250,
      "44": 1250
    },
  },
  "Tie":{
    sizes: ["Zipper 12''","Zipper 14''","Zipper 16''","Zipper 18''"],
    prices:{
      "Zipper 12":150,
      "Zipper 14":150,
      "Zipper 16":150,
      "Zipper 18":150
    },
  },
  "Belts":{
    sizes: ["80cm","95cm","110cm","120cm"],
    prices:{
       "80cm": 150,
       "95cm": 150,
       "110cm": 150,
       "120cm": 150
    },
  },
  "RSGS Socks":{
   sizes: ["2","3","4","5","6","FS"],
   prices:{
  "2": 50,
  "3": 50,
  "4": 50,
  "5": 70,
  "6": 70,
  "FS":70
   }
  },
  "Hoodie/Sweatshirt":{
    sizes: ["20","22", "24","26","28","30","32","34","36","38","40","42","44"],
    prices:{
      "20": 650,
      "22": 650,
      "24": 650,
      "26": 650,
      "28": 700,
      "30": 700,
      "32": 700,
      "34": 750,
      "36": 750,
      "38": 800,
      "40": 800,
      "42": 800,
      "44": 800
    },
  },
  "Lower Navy 1 line White":{
    sizes:["24","26","28","30","32","34","36","38","40","42","44"],
     prices:{
      "24": 225,
      "26": 225,
      "28": 250,
      "30": 250,
      "32": 250,
      "34": 270,
      "36": 270,
      "38": 290,
      "40": 290,
      "42": 290,
      "44": 290
    },
  }
};
const SchoolDashboard = ({ token }) => {
  const [pendingDispatches, setPendingDispatches] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [studentDetails, setStudentDetails] = useState(null);
  const [selectedItems, setSelectedItems] = useState([
    { itemId: "", size: "", quantity: 0, price: 0 },
  ]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchPendingDispatches = async () => {
      try {
        const response = await getPendingDispatches(token);
        setPendingDispatches(response.data);
      } catch (err) {
        console.error("Error fetching pending dispatches:", err);
      }
    };

    const fetchItems = async () => {
      try {
        const response = await getItems(token);
        setItems(response.data);
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };

    fetchPendingDispatches();
    fetchItems();
  }, [token]);

  const handleVerifyDispatch = async (dispatchId, items) => {
    const verifiedItems = items.map((item) => ({
      itemId: item.itemId._id,
      size: item.size,
      quantity: item.quantity,
    }));

    try {
      await verifyDispatch({ dispatchId, verifiedItems }, token);
      alert("Dispatch verified successfully");
      setPendingDispatches((prevDispatches) =>
        prevDispatches.filter((dispatch) => dispatch._id !== dispatchId)
      );
    } catch (err) {
      console.error("Verification failed", err);
    }
  };

  const handleFetchStudentDetails = async () => {
    try {
      const response = await getStudentDetails(studentId, token);
      if (response.data && response.data._id) {
        setStudentDetails(response.data);
        setStudentId(response.data._id);
      } else {
        alert("Student not found");
      }
    } catch (err) {
      console.error("Error fetching student details:", err);
    }
  };

  const handleAddItemToSale = () => {
    setSelectedItems((prevItems) => [
      ...prevItems,
      { itemId: "", size: "", quantity: 0, price: 0 },
    ]);
  };

  const handleRemoveItem = (index) => {
    setSelectedItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const calculateTotalBill = () => {
    return selectedItems.reduce((total, item) => {
      const quantity = Number(item.quantity) || 0;
      const price = Number(item.price) || 0;
      return total + price * quantity;
    }, 0);
  };

  const handleProcessSale = async () => {
    const saleData = {
      studentId,
      items: selectedItems.map((item) => ({
        itemId: item.itemId,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      await sellItemsToStudent(saleData, token);
      alert("Sale processed successfully");
      setStudentId("");
      setStudentDetails(null);
      setSelectedItems([{ itemId: "", size: "", quantity: 0, price: 0 }]);
    } catch (err) {
      console.error("Error processing sale:", err);
      alert("Failed to process sale. Please try again.");
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...selectedItems];
    newItems[index][field] = value;

    if (field === "itemId" || field === "size") {
      const selectedItem = items.find((i) => i._id === newItems[index].itemId);
      const size = newItems[index].size;
      if (selectedItem && size && sizePriceMap[selectedItem.name]) {
        newItems[index].price = sizePriceMap[selectedItem.name].prices[size];
      }
    }

    setSelectedItems(newItems);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#333" }}>School Dashboard</h2>

      {/* Dispatch Section */}
      <h3 style={{ color: "#007bff" }}>Verify Dispatches</h3>
      {pendingDispatches.length > 0 ? (
        pendingDispatches.map((dispatch) => (
          <div
            key={dispatch._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginBottom: "10px",
              padding: "10px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h4>Dispatch from Supplier</h4>
            <p>
              Dispatched At: {new Date(dispatch.dispatchedAt).toLocaleString()}
            </p>
            <table style={{ width: "100%", marginBottom: "10px" }}>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Size</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {dispatch.items.map((item) => (
                  <tr key={item._id}>
                    <td>{item.itemId.name}</td>
                    <td>{item.size}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() => handleVerifyDispatch(dispatch._id, dispatch.items)}
              style={{
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Verify Dispatch
            </button>
          </div>
        ))
      ) : (
        <p>No pending dispatches to verify.</p>
      )}

      {/* Sale Section */}
      <h3 style={{ color: "#007bff" }}>Sell Items to Student</h3>
      <div>
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={{
            padding: "5px",
            marginRight: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleFetchStudentDetails}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "5px 10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Fetch Student Details
        </button>

        {studentDetails && (
          <div style={{ marginTop: "20px" }}>
            <h4>Student Details</h4>
            <p>Name: {studentDetails.name}</p>
            <p>Class: {studentDetails.class}</p>

            {/* Sale Items */}
            <h5>Add Items to Sale</h5>
            {selectedItems.map((item, index) => {
              const selectedItem = items.find((i) => i._id === item.itemId);
              const availableSizes =
                selectedItem && sizePriceMap[selectedItem.name]
                  ? sizePriceMap[selectedItem.name].sizes
                  : [];

              return (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <label>
                    Select Item:
                    <select
                      value={item.itemId}
                      onChange={(e) =>
                        handleItemChange(index, "itemId", e.target.value)
                      }
                      style={{
                        marginLeft: "10px",
                        padding: "5px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                    >
                      <option value="">Select an Item</option>
                      {items.map((availableItem) => (
                        <option
                          key={availableItem._id}
                          value={availableItem._id}
                        >
                          {availableItem.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    Select Size:
                    <select
                      value={item.size}
                      onChange={(e) =>
                        handleItemChange(index, "size", e.target.value)
                      }
                      style={{
                        marginLeft: "10px",
                        padding: "5px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                      disabled={availableSizes.length === 0}
                    >
                      <option value="">Select Size</option>
                      {availableSizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    Quantity:
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(index, "quantity", e.target.value)
                      }
                      min="0"
                      style={{
                        marginLeft: "10px",
                        padding: "5px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    Price: {item.price}
                  </label>
                  <button
                    onClick={() => handleRemoveItem(index)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      marginLeft: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Remove Item
                  </button>
                </div>
              );
            })}

            <button
              onClick={handleAddItemToSale}
              style={{
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Add Another Item
            </button>

            <h5>Total Bill: {calculateTotalBill()}</h5>

            <button
              onClick={handleProcessSale}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Process Sale
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolDashboard;
