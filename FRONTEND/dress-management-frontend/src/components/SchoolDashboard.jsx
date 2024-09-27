import React, { useEffect, useState } from "react";
import {
  getPendingDispatches,
  verifyDispatch,
  getStudentDetails,
  sellItemsToStudent,
  getItems,
} from "../api";
import mongoose from "mongoose";

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
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      alert("Invalid Student ID format.");
      return;
    }

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

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#333" }}>School Dashboard</h2>

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

            <h5>Add Items to Sale</h5>
            {selectedItems.map((item, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <label>
                  Select Item:
                  <select
                    value={item.itemId}
                    onChange={(e) => {
                      const newItems = [...selectedItems];
                      newItems[index].itemId = e.target.value;
                      setSelectedItems(newItems);
                    }}
                    style={{
                      marginLeft: "10px",
                      padding: "5px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <option value="">Select an Item</option>
                    {items.map((availableItem) => (
                      <option key={availableItem._id} value={availableItem._id}>
                        {availableItem.name} - ₹{availableItem.price}
                      </option>
                    ))}
                  </select>
                </label>
                <input
                  type="text"
                  placeholder="Size"
                  value={item.size}
                  onChange={(e) => {
                    const newItems = [...selectedItems];
                    newItems[index].size = e.target.value;
                    setSelectedItems(newItems);
                  }}
                  style={{
                    marginLeft: "10px",
                    padding: "5px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) => {
                    const newItems = [...selectedItems];
                    newItems[index].quantity = parseInt(e.target.value, 10);
                    setSelectedItems(newItems);
                  }}
                  style={{
                    marginLeft: "10px",
                    padding: "5px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) => {
                    const newItems = [...selectedItems];
                    newItems[index].price = parseFloat(e.target.value);
                    setSelectedItems(newItems);
                  }}
                  style={{
                    marginLeft: "10px",
                    padding: "5px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
                {selectedItems.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Remove Item
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddItemToSale}
              style={{
                marginTop: "10px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Add Another Item
            </button>

            <h5>Total Bill: ₹ {calculateTotalBill().toFixed(2)}</h5>

            <button
              type="button"
              onClick={handleProcessSale}
              style={{
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                padding: "5px 10px",
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
