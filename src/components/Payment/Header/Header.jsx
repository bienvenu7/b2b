import React from 'react';
import logo from '../../../common/images/logo-for-mobile.png';

export const Header = () => {
  return (
    <div className="top_up_bundle__header">
      <img src={logo} alt="" className="top_up_bundle__header-logo" />
      <div className="top_up_bundle__header__history">
        <div className="top_up_bundle__header__history-text bold">Authentication Bundle</div>
        <div className="top_up_bundle__header__history-text">&nbsp;{'>'}&nbsp;Payment</div>
      </div>
    </div>
  );
};
