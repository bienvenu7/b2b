import React from 'react';

import { useNavigate } from 'react-router-dom';
import { SvgSelector } from '../../../common/icons/SvgSelector';
import { Header } from '../../Header/Header';

import logo from '../../../common/images/601.svg';

export const Unsuccess = () => {
  // TODO
  const navigate = useNavigate();

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
        <div className="payment__success__message-h1">Payment unsuccessful!</div>
        <div className="payment__success__message-h2">
          Unfortunately your payment did not go through, please try again
        </div>
        <div className="payment__success__buttons-wrapper">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
          jsx-a11y/no-static-element-interactions */}
          <div className="payment__success__buttons-elem" onClick={() => navigate('../payment')}>
            Try Again
          </div>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
          jsx-a11y/no-static-element-interactions */}
          <div className="payment__success__buttons-elem" onClick={() => navigate('../dashboard')}>
            Go to Dashboard
          </div>
        </div>
      </div>
    </div>
  );
};
