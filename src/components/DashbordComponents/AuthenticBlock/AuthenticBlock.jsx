import React from 'react';
import { BlockComponentLayout } from '../../BlockComponentLayout/BlockComponentLayout';

export const AuthenticBlock = () => {
  return (
    <BlockComponentLayout>
      <div className="container">
        <div className="left-block">
          <h3>Authentic score = 75%</h3>
          <p>Most of your items are authentic yet there is still room for impovement!</p>
          <button className="button">Learn how to improve the score</button>
        </div>
        <div className="right-block">
          <div className="cards">
            <div className="cards__item">
              <h3 className="cards__item__title">Authentic items spotted: 75</h3>
              <p className="cards__item__text">
                Your most common authentic items are Gucci bags and Saint Laurent shoes!
              </p>
            </div>
            <div className="cards__item">
              <h3 className="cards__item__title">Fake items spotted: 25</h3>
              <p className="cards__item__text">Your most common fake items are Prada bags and Dior t-shirts!</p>
            </div>
          </div>
          <button className="button">See all verified items</button>
        </div>
      </div>
    </BlockComponentLayout>
  );
};
