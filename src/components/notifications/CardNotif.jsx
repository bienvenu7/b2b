import React from "react";

import "./Notif.scss";

const CardNotif = ({ item, product }) => {

  const newArray = product.filter((p) => p.id === item.productId)

  console.log(newArray)

  return (
    <div className="card-content">
      {console.log(item)}
      <div className="card-title">{item.title}</div>
      <div className="card-text">{item.text}</div>
      {newArray?.reasons !== null & newArray?.systemStatus === 'AWAIT_PHOTOS' ? <button className="card-btn">Add more photos</button> : ''}
    </div>
  );
};

export default CardNotif;
