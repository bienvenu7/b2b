import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCosts, getPrice, getUserTariffPackages } from '../../redux/selectors/payment-selectors';

import { pushTotal, removePreviewPackage } from '../../redux/reducers/payment-reducer';
import './SummaryMobile.scss';

export const SummaryMobile = () => {
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
    // TODO
    if (kostyl) {
      dispatch(pushTotal(packages));
      setKostyl(false);
    }
  }, [packages]);
  return (
    <>
      {packages.length > 0 && (
        <div className="summary-container-mobile">
          <div className="summary-title-mobile">Bundle summary</div>
          {packages.map(
            (el, index) =>
              el.productType !== '' && (
                <div key={index} className="summary__elem-wrapper-mobile">
                  <div className="summary__box-right">
                    <div className="summary__elem-name">{el.productType.publicName} bundle</div>
                    {el.answerTime !== '' && <span className="summary__span">{el.answerTime} hours</span>}
                  </div>
                  <div className="summary__box-left">
                    {cost && (
                      <div className="summary__elem-cost">
                        <p>{cost[index] && `$${costs.package / 100} X ${el.volume}`}</p>
                      </div>
                    )}
                    <button className="summary__button" onClick={() => delhendler(index)}>
                      X
                    </button>
                  </div>
                </div>
              ),
          )}
        </div>
      )}
    </>
  );
};
