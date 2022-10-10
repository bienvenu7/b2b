import React from 'react';
import './Notif.scss';
import { useNavigate } from 'react-router-dom';

export const CardNotif = ({ item }) => {
  // TODO
  const navigate = useNavigate();
  const prod = item.product;

  return (
    <div className="card-content">
      <div className="card-title">{item.title}</div>
      <div className="card-text">{item.text}</div>
      {/* eslint-disable-next-line no-bitwise */}
      {(prod?.reasons !== null) & (prod?.systemStatus === 'AWAIT_PHOTOS') ? (
        <button onClick={() => navigate(`/request/${prod.id}`)} className="card-btn">
          Add more photos
        </button>
      ) : (
        ''
      )}
    </div>
  );
};
