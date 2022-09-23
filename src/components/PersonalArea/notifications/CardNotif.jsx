import React from "react";

import "./Notif.scss";

const CardNotif = ({ item }) => {
  return (
    <div className="card-content">
      {console.log(item)}
      <div className="card-title">{item.title}</div>
      <div className="card-text">{item.text}</div>
      <button className="card-btn">Add more photos</button>
    </div>
  );
};

export default CardNotif;
