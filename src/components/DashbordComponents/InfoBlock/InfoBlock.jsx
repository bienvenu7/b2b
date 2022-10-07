import React from 'react';
import './InfoBlock.scss';
import { BlockComponentLayout } from '../../BlockComponentLayout/BlockComponentLayout';

export const InfoBlock = () => {
  return (
    <BlockComponentLayout>
      <h2 className="info-block__title">How does the LegitGrails platform work?</h2>
      <div className="info-block__container">
        <div className="info-block__card">
          <div className="info-block__img_first" />
          <h3>THE MOST RELIABLE AUTHENTICATION</h3>
          <p>Your items are reviewed by the most experienced authenticators</p>
        </div>
        <div className="info-block__card">
          <div className="info-block__img_second" />
          <h3>COHERENT & STREAMLINED ORGANISATION</h3>
          <p>All authentications are presented in the clearest possible manner</p>
        </div>
        <div className="info-block__card">
          <div className="info-block__img_third" />
          <h3>PRACTICAL DATA & ANALYTICS</h3>
          <p>The data from past authentications can be used to improve your business’ performance</p>
        </div>
      </div>
    </BlockComponentLayout>
  );
};
