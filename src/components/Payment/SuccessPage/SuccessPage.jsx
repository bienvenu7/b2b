import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../common/images/601.svg';
import { Header } from '../../Header/Header';
import { SvgSelector } from '../../../common/icons/SvgSelector';

export const SuccessPage = () => {
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
        <div className="payment__success__message-h1">it’S a success!</div>
        <div className="payment__success__message-h2">Your bundle authentication order was successful!</div>
        <div className="payment__success__message-h2 last-child">
          You can start verifying your items right now, or any other time you prefer, just click on the{' '}
          <p id="target">New authentications</p> tab in the side menu.
        </div>
        <div className="payment__success__buttons-wrapper">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
          jsx-a11y/no-static-element-interactions */}
          <div className="payment__success__buttons-elem" onClick={() => navigate('../authentication-request')}>
            Start authentication
          </div>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
          jsx-a11y/no-static-element-interactions */}
          <div className="payment__success__buttons-elem" onClick={() => navigate('../authentications/completed')}>
            View all authentications
          </div>
        </div>
      </div>
    </div>
  );
};
