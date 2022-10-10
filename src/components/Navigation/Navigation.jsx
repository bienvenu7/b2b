import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SvgSelector } from '../../common/icons/SvgSelector';
import './Navigation.scss';

export const Navigation = ({ hrefs }) => {
  // TODO
  const navigate = useNavigate();

  return (
    <div className="header__nav">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
      jsx-a11y/no-static-element-interactions */}
      <div className="header__nav__home" onClick={() => navigate('../dashboard')}>
        <SvgSelector id="home" />
      </div>
      {hrefs &&
        hrefs.map((el, index) => (
          <div key={index} className="header__nav__elem">
            &nbsp;/&nbsp;{el.label}
          </div>
        ))}
    </div>
  );
};
