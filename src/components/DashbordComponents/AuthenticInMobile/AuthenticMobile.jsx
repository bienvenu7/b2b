import React from 'react';
import './AuthenticMobile.scss';
import { BlockComponentLayout } from '../../BlockComponentLayout/BlockComponentLayout';
import burger from '../../../common/icons/burger.svg';

export const AuthenticMobile = () => {
  return (
    <BlockComponentLayout>
      <div className="authentic-mobile__content-block">
        <h3 className="authentic-mobile__title_big">Welcome to LegitGrails Business platform!</h3>
        <p className="authentic-mobile__text_big">
          To start verifying your item right now:
          <ol className="authentic-mobile__list">
            <li>
              Press <img className="authentic-mobile__list_img" src={burger} alt="" /> in the top right
            </li>
            <li>
              Go to{' '}
              <a className="authentic-mobile__list_link" href="/payment" target="_blank">
                Top Up Now
              </a>
            </li>
            <li>Purchase your preferred bundle</li>
            <li>
              Go to{' '}
              <a className="authentic-mobile__list_link" href="authentication-request" target="_blank">
                New Authentication
              </a>
            </li>
            <li>Upload photos of your items</li>
          </ol>
          You can check the progress of each authentication in{' '}
          <a className="authentic-mobile__list_link" href="in-progress" target="_blank">
            All Authentications
          </a>
          !
        </p>
      </div>
    </BlockComponentLayout>
  );
};
