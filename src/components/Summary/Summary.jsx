import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCosts, getPrice, getUserTariffPackages } from '../../redux/selectors/payment-selectors';

import { pushTotal, removePreviewPackage } from '../../redux/reducers/payment-reducer';
import './Summary.scss';

export const Summary = () => {
  // TODO
  const [kostyl, setKostyl] = useState(false);

  const dispatch = useDispatch();
  const packages = useSelector(getUserTariffPackages);
  const cost = useSelector(getCosts);
  const costs = useSelector(getPrice);

  function delhendler(index) {
    dispatch(removePreviewPackage(index));
    setKostyl(true);
  }

  useEffect(() => {
    if (kostyl) {
      dispatch(pushTotal(packages));
      setKostyl(false);
    }
  }, [packages]);

  return (
    <>
      {packages.length > 0 && (
        <div className="summary-container">
          <div className="summary-title">Summary</div>
          {packages.map(
            (el, index) =>
              el.productType !== '' && (
                <div key={index} className="summary__elem-wrapper">
                  <div className="box">
                    <div className="summary__elem-name">{el.productType.publicName} bundle</div>
                    {cost && (
                      <div className="summary__elem-cost">
                        <p>{cost[index] && `$${costs.package / 100} X ${el.volume}`}</p>
                        {el.answerTime !== '' && <span>{el.answerTime} h</span>}
                      </div>
                    )}
                  </div>
                  <button onClick={() => delhendler(index)}>X</button>
                </div>
              ),
          )}
        </div>
      )}
    </>
  );
};
