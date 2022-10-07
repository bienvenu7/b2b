import React from 'react';
import { components } from 'react-select';
import { SvgSelector } from '../icons/SvgSelector';

export const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <SvgSelector id="downArrow" />
    </components.DropdownIndicator>
  );
};
