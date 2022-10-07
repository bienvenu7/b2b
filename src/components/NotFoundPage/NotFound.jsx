import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getIsAuth } from '../../redux/selectors/auth-selectors';
import './NotFound.scss';
import src from '../../common/images/404.png';

export const NotFoundPage = () => {
  // TODO
  const navigate = useNavigate();

  const isAuth = useSelector(getIsAuth);

  return (
    <div className="notFoundPage-container">
      <div className="notFoundPage-wrapper">
        <div className="notFoundPage__image">
          <img alt="" src={src} />
        </div>
        <div className="notFoundPage__title">
          The page you are looking for might have been removed, had its name changed or is temporarily unavailable.
        </div>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
        jsx-a11y/no-static-element-interactions */}
        <div
          className="notFoundPage__button"
          onClick={() => {
            isAuth ? navigate('../dashboard') : navigate('../auth/signin');
          }}
        >
          Go to dashboard
        </div>
      </div>
    </div>
  );
};
