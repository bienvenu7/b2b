import React from 'react';
import './CheckBlock.scss';
import { BlockComponentLayout } from '../../BlockComponentLayout/BlockComponentLayout';

export const CheckBlock = ({ image, textTop, numberTop, textBottom, numberButtom }) => {
  return (
    <BlockComponentLayout>
      <div className="icon">
        <img src={image} alt="иконка" />
      </div>
      <div className="top-block">
        <p className="text">{textTop}</p>
        <p className="number">{numberTop}</p>
      </div>
      <hr />
      <div className="bottom-block">
        <p className="text">
          {' '}
          <span className="span"> {numberButtom} </span> {textBottom}{' '}
        </p>
      </div>
    </BlockComponentLayout>
  );
};
