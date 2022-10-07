import React from 'react';
import './MobileHeader.scss';

export const MobileHeader = ({ label }) => {
  return (
    <div className="mobile_header-container">
      <div className="mobile_header-wrapper">
        <div className="mobile_header-label">{label}</div>
        <div className="hamburger-menu">
          <input id="menu__toggle" type="checkbox" />
          <label className="menu__btn" htmlFor="menu__toggle">
            <span />
          </label>
        </div>
      </div>
    </div>
  );
};
