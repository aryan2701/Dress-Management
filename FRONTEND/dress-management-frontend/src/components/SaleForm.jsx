// src/components/SaleForm.jsx
import { useState } from "react";

const SaleForm = ({ onSubmit }) => {
  const [saleData, setSaleData] = useState({
    items: [{ itemId: "", quantity: 0 }],
  });

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...saleData.items];
    updatedItems[index][field] = value;
    setSaleData({ ...saleData, items: updatedItems });
  };

  const handleAddItem = () => {
    setSaleData({
      ...saleData,
      items: [...saleData.items, { itemId: "", quantity: 0 }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(saleData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Record Sale</h3>
      {saleData.items.map((item, index) => (
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

      <button type="submit">Record Sale</button>
    </form>
  );
};

export default SaleForm;
