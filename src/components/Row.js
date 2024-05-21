import React, { useState } from 'react';
import InputField from './InputField';

const Row = ({ row, updateValue }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <tr>
        <td>{row.label}</td>
        <td>{row.value.toFixed(2)}</td>
        <td>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(Number(e.target.value))}
          />
        </td>
        <td>
          <button onClick={() => updateValue(row.id, inputValue, 'percentage')}>
            Apply %
          </button>
        </td>
        <td>
          <button onClick={() => updateValue(row.id, inputValue, 'value')}>
            Apply Val
          </button>
        </td>
        <td>{row.variance ? row.variance.toFixed(2) : 0}%</td>
      </tr>
      {row.children && row.children.map((child) => (
        <Row key={child.id} row={child} updateValue={updateValue} />
      ))}
    </>
  );
};

export default Row;
