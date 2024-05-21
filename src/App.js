import React, { useState } from 'react';
import Table from './components/Table';
import './App.css';

const initialData = [
  {
    id: 'electronics',
    label: 'Electronics',
    value: 1500,
    children: [
      {
        id: 'phones',
        label: 'Phones',
        value: 800,
      },
      {
        id: 'laptops',
        label: 'Laptops',
        value: 700,
      },
    ],
  },
  {
    id: 'furniture',
    label: 'Furniture',
    value: 1000,
    children: [
      {
        id: 'tables',
        label: 'Tables',
        value: 300,
      },
      {
        id: 'chairs',
        label: 'Chairs',
        value: 700,
      },
    ],
  },
];

function App() {
  const [data, setData] = useState(initialData);

  const updateValue = (id, newValue, type) => {
    const updateData = (rows) => {
      return rows.map((row) => {
        const updatedRow = { ...row };

        if (updatedRow.id === id) {
          const originalValue = updatedRow.value;
          let updatedValue;
          if (type === 'percentage') {
            updatedValue = originalValue + (originalValue * newValue) / 100;
          } else if (type === 'value') {
            updatedValue = newValue;
          }
          updatedRow.value = updatedValue;
          updatedRow.variance = ((updatedValue - originalValue) / originalValue) * 100;
        }

        if (updatedRow.children) {
          updatedRow.children = updateData(updatedRow.children);
          const originalValue = row.value;
          updatedRow.value = updatedRow.children.reduce((sum, child) => sum + child.value, 0);
          updatedRow.variance = ((updatedRow.value - originalValue) / originalValue) * 100;
        }
        return updatedRow;
      });
    };
    setData(updateData(data));
  };

  const grandTotal = data.reduce((sum, row) => sum + row.value, 0);

  return (
    <div className="App">
      <h1>Hierarchical Table</h1>
      <Table data={data} updateValue={updateValue} />
      <div className="grand-total">Grand Total: {grandTotal.toFixed(2)}</div>
    </div>
  );
}

export default App;
