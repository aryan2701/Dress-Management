import React, { useState, useEffect } from "react";
import { getSchools, getItems } from "../api"; // Assume getItems fetches the list of items

const DispatchForm = ({ onSubmit }) => {
  const [schoolId, setSchoolId] = useState("");
  const [schools, setSchools] = useState([]);
  const [items, setItems] = useState([
    { itemId: "", price: "", quantity: "", size: "" },
  ]);
  const [availableItems, setAvailableItems] = useState([]);

  // Fetch schools and items when the component loads
  useEffect(() => {
    const fetchSchoolsAndItems = async () => {
      try {
        const schoolResponse = await getSchools(); // Fetch the list of schools from API
        setSchools(schoolResponse.data);

        const itemResponse = await getItems(); // Fetch the list of items from API
        setAvailableItems(itemResponse.data);
      } catch (err) {
        console.error("Error fetching schools or items", err);
      }
    };
    fetchSchoolsAndItems();
  }, []);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    setItems([...items, { itemId: "", price: "", quantity: "", size: "" }]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!schoolId) {
      alert("Please select a school.");
      return;
    }

    // Ensure all items have values
    for (let item of items) {
      if (!item.itemId || !item.price || !item.quantity || !item.size) {
        alert("Please fill in all fields for each item.");
        return;
      }
    }

    // Call the onSubmit handler from parent component (SupplierDashboard)
    onSubmit({ schoolId, items });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* School Dropdown */}
      <div>
        <label>School:</label>
        <select
          value={schoolId}
          onChange={(e) => setSchoolId(e.target.value)}
          required
        >
          <option value="">Select a School</option>
          {schools.map((school) => (
            <option key={school._id} value={school._id}>
              {school.username} {/* Adjust this if the field is different */}
            </option>
          ))}
        </select>
      </div>

      {/* Item List */}
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            marginBottom: "1em",
            borderBottom: "1px solid #ccc",
            paddingBottom: "1em",
          }}
        >
          <div>
            <label>Item:</label>
            <select
              value={item.itemId}
              onChange={(e) =>
                handleItemChange(index, "itemId", e.target.value)
              }
              required
            >
              <option value="">Select an Item</option>
              {availableItems.map((availableItem) => (
                <option key={availableItem._id} value={availableItem._id}>
                  {availableItem.name}{" "}
                  {/* Adjust this if the field is different */}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              value={item.price}
              onChange={(e) => handleItemChange(index, "price", e.target.value)}
              required
            />
          </div>
          <div>
            <label>Quantity:</label>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", e.target.value)
              }
              required
            />
          </div>
          <div>
            <label>Size:</label>
            <input
              type="text"
              value={item.size}
              onChange={(e) => handleItemChange(index, "size", e.target.value)}
              required
            />
          </div>
          {items.length > 1 && (
            <button type="button" onClick={() => handleRemoveItem(index)}>
              Remove Item
            </button>
          )}
        </div>
      ))}

      {/* Add another item button */}
      <button type="button" onClick={handleAddItem}>
        Add Another Item
      </button>

      {/* Submit button */}
      <button type="submit" style={{ marginTop: "1em" }}>
        Dispatch Items
      </button>
    </form>
  );
};

export default DispatchForm;
