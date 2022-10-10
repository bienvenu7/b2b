import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { takeBalance } from '../../redux/selectors/authRequest-selectors';
import './Balance.scss';

export const Balance = () => {
  const navigate = useNavigate();
  const balance = useSelector(takeBalance);
  const { pathname } = useLocation();
  // eslint-disable-next-line no-empty-function
  useEffect(() => {}, [balance]);

  return (
    <div className="balance-container">
      <div className="balance-title">Your authentication balance</div>
      <hr />
      {balance.length > 0 && (
        <div className="balance__elems-wrapper">
          {balance.map(
            (el, index) =>
              el.volume > 0 && (
                <div key={index} className="balance__elem-wrapper">
                  <div className="balance__elem-title">{el.productType.publicName}</div>
                  {el.answerTime && <div className="balance__elem-hours">{`${el.answerTime} hours`}</div>}
                  <div className="balance__elem-volume">{el.volume}</div>
                </div>
              ),
          )}
        </div>
      )}
      {pathname === '/payment' && balance.length > 0 && (
        <div className="balance__buttons-wrapper">
          <button className="balance-button" onClick={() => navigate('/authentication-request')}>
            New authentication
          </button>
        </div>
      )}
      {pathname === '/authentication-request' && balance.length > 0 && (
        <div className="balance__buttons-wrapper">
          <button className="balance-button top-button" onClick={() => navigate('/payment')}>
            Top up now
          </button>
        </div>
      )}
    </div>
  );
};
