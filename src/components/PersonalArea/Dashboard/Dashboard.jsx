import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SvgSelector } from '../../../common/icons/SvgSelector';
import './Dashboard.scss';
import storeLogo from '../../../common/images/logo-of-store.png';
import dashboardIcon from '../../../common/images/dashboard-icon.png';
import { companyname, takeBalance } from '../../../redux/selectors/authRequest-selectors';
import { logoutThunk } from '../../../redux/thunks/auth-thunk';
import logoImg from '../../../common/images/logo-for-mobile.png';
import { MobileNotif } from './MobileNotif';

export const Dashboard = () => {
  // TODO
  const [show, setShow] = useState(true);
  const [show1, setShow1] = useState(true);

  const [showNotif, setShowNotif] = useState(false);
  const [timeoutforfetch, settimeoutforfetch] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const balance = useSelector(takeBalance);
  const companyName = useSelector(companyname);
  const istotalclear = balance.reduce((prew, mycurrent) => prew + mycurrent.volume, 0);

  useEffect(() => {
    setTimeout(() => {
      settimeoutforfetch(false);
    }, 2000);
  }, []);

  return (
    <>
      {showNotif && <MobileNotif setShowNotif={setShowNotif} />}
      <div className="dashboard-container fixed">
        <div className="dashboard-wrapper">
          <div className="dashboard__elem">
            <div className="dashboard__elem__top-wrapper">
              <div className="dashboard__elem__top-img">
                <img alt="" src={storeLogo} />
              </div>
              <div className="dashboard__elem__top-label">
                {companyName} <SvgSelector id="arrow" />
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
                      jsx-a11y/no-noninteractive-element-interactions */}
                <img onClick={() => navigate('../dashboard')} src={dashboardIcon} alt="" />
              </div>
              <div className="dashboard__elem__top__icon-wrapper">
                <div className="dashboard__elem__top__icon-elem">{/* <img src={dashboardIcon} alt="" /> */}</div>
                <div className="dashboard__elem__top__icon-elem">
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
               jsx-a11y/no-static-element-interactions */}
                  <div onClick={() => setShowNotif(!showNotif)}>
                    <SvgSelector id="bell" />
                  </div>
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
               jsx-a11y/no-static-element-interactions */}
                  <div onClick={() => dispatch(logoutThunk())}>
                    <SvgSelector id="logout" />
                  </div>
                </div>
              </div>
            </div>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
               jsx-a11y/no-static-element-interactions */}
            <div onClick={() => navigate('../dashboard')} className="dashboard__elem__child-wrapper">
              <div className="dashboard__elem__child-img">
                <img src={dashboardIcon} alt="" />
              </div>
              <div className="dashboard__elem__child__label">Dashboard</div>
            </div>
          </div>
          <div className="dashboard__elem__auth_balance-wrapper">
            <div className="dashboard__elem__auth_balance-label">
              Authentication balance{' '}
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
               jsx-a11y/no-static-element-interactions */}
              <div onClick={() => setShow1(!show1)}>
                <SvgSelector id={show1 ? 'arrow' : 'arrow-rotate'} />
              </div>
            </div>
            {show1 && (
              <div className="dashboard__elem__auth_balance__balance-wrapper">
                {istotalclear > 0 &&
                  balance
                    .filter((item) => item.volume > 0)
                    .map((el, index) => (
                      <div key={index} className="dashboard__elem__auth_balance__balance__elem">
                        <div className="dashboard__elem__auth_balance__balance-category">
                          {el.productType.publicName}
                        </div>
                        {el.answerTime !== '' && (
                          <div className="dashboard__elem__auth_balance__balance-answer">{el.answerTime} h</div>
                        )}
                        <div className="dashboard__elem__auth_balance__balance-count">{el.volume}</div>
                      </div>
                    ))}
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
               jsx-a11y/no-static-element-interactions */}
                <div className="dashboard__elem__auth_balance__balance-button" onClick={() => navigate('../payment')}>
                  Top up now
                </div>
                {timeoutforfetch || istotalclear > 0 ? (
                  /* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
               jsx-a11y/no-static-element-interactions */
                  <div
                    className="dashboard__elem__auth_balance__balance-button"
                    onClick={() => navigate('../authentication-request')}
                  >
                    New authentication
                  </div>
                ) : (
                  <div className="dashboard__elem__auth_balance__balance-button authenticationdisabled">
                    New authentication
                  </div>
                )}
              </div>
            )}
            {timeoutforfetch || istotalclear > 0 ? null : (
              <div className="textdisabled">
                <span>!</span>Top up to start authentication
              </div>
            )}
          </div>
          <div className="dashboard__elem__authentications-wrapper">
            <div className="dashboard__elem__authentications-label">
              Authentication{' '}
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
               jsx-a11y/no-static-element-interactions */}
              <div onClick={() => setShow(!show)}>
                <SvgSelector id={show ? 'arrow' : 'arrow-rotate'} />
              </div>
            </div>
            {show && (
              <div className="dashboard__elem__authentications-control__elements">
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
               jsx-a11y/no-static-element-interactions */}
                <div
                  className="dashboard__elem__authentications-control__elem-wrapper"
                  onClick={() => navigate('../authentications/completed')}
                >
                  <SvgSelector id="check-icon" />
                  All authentications
                </div>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
               jsx-a11y/no-static-element-interactions */}
                <div
                  className="dashboard__elem__authentications-control__elem-wrapper"
                  onClick={() => navigate('../photo-requests/all')}
                >
                  <SvgSelector id="camera-icon" />
                  Photo requests
                </div>
              </div>
            )}
          </div>
          <div className="dashboard__elem__tools-wrapper">
            <div className="dashboard__elem__tools-label">Tools</div>
            <div className="dashboard__elem__tools-control__elements">
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
               jsx-a11y/no-static-element-interactions */}
              <div
                onClick={() => navigate('../billing-history')}
                className="dashboard__elem__tools-control__elem-wrapper"
              >
                <SvgSelector id="card-icon" />
                Billing
              </div>
            </div>
          </div>
          <div className="dashboard__elem__tools-wrapper two">
            <div className="dashboard__elem__tools-label">Tools</div>
            <div className="dashboard__elem__tools-control__elements">
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
               jsx-a11y/no-static-element-interactions */}
              <div
                onClick={() => navigate('../billing-history')}
                className="dashboard__elem__tools-control__elem-wrapper"
              >
                <SvgSelector id="card-icon" />
                Get help
              </div>
            </div>
          </div>
          {timeoutforfetch || istotalclear > 0 ? (
            /* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
               jsx-a11y/no-static-element-interactions */
            <div
              className="dashboard__elem__auth_balance__balance-button mobile"
              onClick={() => navigate('../authentication-request')}
            >
              New authentication
            </div>
          ) : (
            /* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
               jsx-a11y/no-static-element-interactions */
            <div
              className="dashboard__elem__auth_balance__balance-button mobile authenticationdisabled"
              onClick={() => navigate('../authentication-request')}
            >
              New authentication
            </div>
          )}
          <div className="dashboard__elem__auth_balance__balance-image-placeholder">
            <div className="fixed-image">
              <img src={logoImg} alt="" />
            </div>
          </div>
        </div>
        <label htmlFor="dashboard-open" className="dashboard__cross-container">
          <SvgSelector id="cross-icon" />
        </label>
      </div>
    </>
  );
};
