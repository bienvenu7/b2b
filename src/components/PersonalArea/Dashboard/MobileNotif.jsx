import React from 'react';
import { SvgSelector } from '../../../common/icons/SvgSelector';
import { Notification } from '../../Notifications/Notifications';

export const MobileNotif = ({ setShowNotif }) => {
  return (
    <div className="mobile-notif__wrapper">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
                  jsx-a11y/no-static-element-interactions */}
      <div className="remove" onClick={() => setShowNotif(false)}>
        <SvgSelector id="cross-icon" />
      </div>
      <div className="mobile-notif__card-wraper">
        <Notification />
      </div>
    </div>
  );
};
