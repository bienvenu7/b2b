import React from "react";

import icon from "../../../common/images/download.png";
import "./Billing.scss";

const CardLine = (props) => {
  return (
    <div className="billing-card">
      <div className="billing-info">
        <div className="billing-date">{props.date}</div>
        <div className="billing-reference">{props.reference}</div>
        <div className="billing-method">{props.method}</div>
        <div className="billing-price">{props.price}</div>
      </div>
      <div className="billing-download" onClick={() => window.open(props.source)} >
        <img src={icon} />
      </div>
    </div>
  );
};

export default CardLine;
