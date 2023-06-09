import React from 'react';
import { useSelector } from 'react-redux';
import { getUserTariffPackages } from '../../../redux/selectors/payment-selectors';

export const PackagesHistory = () => {
  const packages = useSelector(getUserTariffPackages);

  return (
    <div className="packages-container">
      {packages.map(
        (el, index) =>
          el.productType !== '' && (
            <div key={index} className="packages-wrapper">
              <div className="packages__label">authentication bundle #{index + 1}</div>
              <div className="packages__elem">
                <div className="packages__elem__category">{el.productType.publicName}</div>
                {el.answerTime !== '' && <div className="packages__elem__hours">{el.answerTime} hours</div>}
              </div>
            </div>
          ),
      )}
    </div>
  );
};
