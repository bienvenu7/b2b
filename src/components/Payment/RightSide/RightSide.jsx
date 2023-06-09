import React from 'react';
import { useSelector } from 'react-redux';
import '../../../pages/TopUpBundle/TopUpBundle.scss';
import { getCartTotal, getUserTariffPackages } from '../../../redux/selectors/payment-selectors';
import { Balance } from '../../Balance/Balance';
import { Summary } from '../../Summary/Summary';

export const RigthSide = ({ toogle, cartTotal }) => {
  const packages = useSelector(getUserTariffPackages);
  const total = useSelector(getCartTotal);

  return (
    <div className="top_up_bundle__right-wrapper">
      <Balance />
      {packages.length > 0 && (
        <div style={{ margin: '84px 0' }}>
          <Summary cartTotal={cartTotal} />
        </div>
      )}
      <div className="top_up_bundle__summary-wrapper" />
      <div className="top_up_bundle__total-wrapper">
        {total === 'error' ? (
          <div className="top_up_bundle__total-title">To much items</div>
        ) : (
          <>
            <div className="top_up_bundle__total-title">Subtotal</div>
            <div className="top_up_bundle__total-count">${total / 100}</div>
          </>
        )}
      </div>
      <div className="top_up_bundle__buttons-wrapper">
        <button
          className="top_up_bundle__buttons-button"
          onClick={() => {
            toogle.add !== null && toogle.add();
          }}
          disabled={total === 'error'}
        >
          Add another category
        </button>
        <button className="top_up_bundle__buttons-button" onClick={() => toogle.pay()} disabled={total === 'error'}>
          Proceed to payment
        </button>
        <div className="top_up_bundle__buttons-sometext">The credits you purchase will be available for one year.</div>
      </div>
    </div>
  );
};
