import React from 'react';

import icon from '../../../common/images/download.png';
import './Billing.scss';

export const CardLine = ({ date, method, price, reference, source }) => {
  // TODO
  return (
    <div className="billing-card">
      <div className="billing-info">
        <div className="billing-date">{date}</div>
        <div className="billing-reference">{reference}</div>
        <div className="billing-method">{method}</div>
        <div className="billing-price">{price}</div>
      </div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
                  jsx-a11y/no-static-element-interactions */}
      <div className="billing-download" onClick={() => window.open(source)}>
        <img src={icon} alt="" />
      </div>
    </div>
  );
};
