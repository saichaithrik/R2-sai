import React from 'react';

const InputField = ({ row, inputValue, setInputValue, updateValue }) => {
  return (
    <div>
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(Number(e.target.value))}
      />
      <button onClick={() => updateValue(row.id, inputValue, 'percentage')}>
        Apply %
      </button>
      <button onClick={() => updateValue(row.id, inputValue, 'value')}>
        Apply Val
      </button>
    </div>
  );
};

export default InputField;