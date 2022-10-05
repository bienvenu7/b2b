import React, { useEffect } from "react";
import { useState } from "react";
import { getProduct } from "../../api/product/product-api";

import "./Notif.scss";
import { useNavigate } from "react-router-dom";


const CardNotif = ({ item, product }) => {
  const navigate = useNavigate();
  const prod = item.product

  return (
    <div className="card-content">
      <div className="card-title">{item.title}</div>
      <div className="card-text">{item.text}</div>
      {prod?.reasons !== null & prod?.systemStatus === 'AWAIT_PHOTOS' ? <button onClick={() => navigate('/request/'+prod.id)} className="card-btn">Add more photos</button> : ''}
    </div>
  );
};

export default CardNotif;
