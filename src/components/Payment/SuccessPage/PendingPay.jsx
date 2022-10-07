import React from 'react';
import { SvgSelector } from '../../../common/icons/SvgSelector';
import { Header } from '../../Header/Header';

import logo from '../../../common/images/601.svg';

export const PendingPay = () => {
  return (
    <div className="payment__success-wrapper">
      <div className="payment__success-container">
        <div className="close">
          <SvgSelector id="cross-icon" />
        </div>
        <div className="top">
          <Header />
        </div>
        <div className="payment__success__logo">
          <img alt="" className="logoImage" src={logo} />
        </div>
        <div className="payment__success__message-h1">payment pending</div>
        <div className="payment__success__message-h2">
          We have sent the payment to your Paypal account. Please go to your <br />
          Paypal to finish the purchase of the chosen authentications
        </div>
      </div>
    </div>
  );
};
