import React from 'react';
import '../Payment.scss';
import { useNavigate } from 'react-router-dom';
import logo from '../../../common/images/logo-for-mobile.png';
import { SvgSelector } from '../../../common/icons/SvgSelector';

export const PaymentHeader = () => {
  // TODO
  const navigate = useNavigate();

  return (
    <div className="payment__header">
      <div className="payment__header__nav">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
        jsx-a11y/no-static-element-interactions */}
        <div className="payment__header__nav__home" onClick={() => navigate('../main')}>
          <SvgSelector id="home" />
        </div>
        <div className="payment__header__nav__elem">&nbsp;/ Luxury store /&nbsp;</div>
        <div className="payment__header__nav__elem">Authentication Bundle</div>
      </div>
      <div className="payment__header__logo-container">
        <img className="payment__header__logo-image" src={logo} alt="" />
        <div className="payment__header__logo-pageName">Authentication - Payment</div>
      </div>
    </div>
  );
};
