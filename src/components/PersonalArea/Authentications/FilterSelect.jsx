import React from 'react';
import Select from 'react-select';

export const FilterSelect = ({ length, handleChange: clickChange, index, mainOptions }) => {
  function handleChange(e) {
    clickChange(e, index, length);
  }

  return (
    <Select
      key={index}
      options={mainOptions}
      classNamePrefix="custom-select__dashboard"
      placeholder="Select filter"
      onChange={(e) => handleChange(e)}
    />
  );
};
