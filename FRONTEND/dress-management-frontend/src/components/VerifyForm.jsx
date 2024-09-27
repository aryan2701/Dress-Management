// src/components/VerifyForm.jsx
import { useState } from "react";

const VerifyForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    schoolId: "",
    items: [{ itemId: "", quantity: 0 }],
  });

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
    setFormData({ ...formData, items: updatedItems });
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { itemId: "", quantity: 0 }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Verify Dispatch</h3>
      <div>
        <label>School ID:</label>
        <input
          type="text"
          value={formData.schoolId}
          onChange={(e) =>
            setFormData({ ...formData, schoolId: e.target.value })
          }
          required
        />
      </div>

      {formData.items.map((item, index) => (
        <div key={index}>
          <label>Item ID:</label>
          <input
            type="text"
            value={item.itemId}
            onChange={(e) => handleItemChange(index, "itemId", e.target.value)}
            required
          />
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
      ))}

      <button type="button" onClick={handleAddItem}>
        Add Another Item
      </button>

      <button type="submit">Verify Dispatch</button>
    </form>
  );
};

export default VerifyForm;
