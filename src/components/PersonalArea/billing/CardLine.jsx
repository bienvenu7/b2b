import React from "react";

import icon from "../../../common/images/download.png";
import "./Billing.scss";

const CardLine = ({ item }) => {
  return (
    <div className="billing-card">
      <div className="billing-date">{item.date}</div>
      <div className="billing-reference">{item.reference}</div>
      <div className="billing-method">{item.method}</div>
      <div className="billing-price">{item.price}</div>
      <div className="billing-download">
        <img src={icon} />
      </div>
    </div>
  );
};

export default CardLine;
