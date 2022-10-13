import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../../pages/TopUpBundle/TopUpBundle.scss';
import '../Payment.scss';
import {
  getCartTotal,
  getInvoiceLink,
  getTotalPackage,
  getUserTariffPackages,
} from '../../../redux/selectors/payment-selectors';
import { postInvoiceThunk } from '../../../redux/thunks/payment-thunk';
import { setInvoiceLink } from '../../../redux/reducers/payment-reducer';
import { SummaryMobile } from '../../SummaryMobile/SummaryMobile';

export const RigthSideMobile = ({ toogle, cartTotal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const packages = useSelector(getUserTariffPackages); 
  const totalPackage = useSelector(getTotalPackage);
  const total = useSelector(getCartTotal);
  const userTariffPackages = useSelector(getUserTariffPackages);
  const invoiceLink = useSelector(getInvoiceLink);

  const [method, setMethod] = useState();
  const [saveBilling] = useState(false);

  const setPayMethod = (e) => {
    setMethod(e.target.value);
  };

  const postInvoice = async () => {
    if (totalPackage !== {} && method) {
      const data =
        userTariffPackages.length > 0
          ? {
              ...totalPackage,
              userTariffPackages,
              paymentSystem: method,
              savePaymentMethod: saveBilling,
              useSavedPaymentMethod: false,
            }
          : {
              ...totalPackage,
              paymentSystem: method,
              savePaymentMethod: saveBilling,
              useSavedPaymentMethod: false,
            };
      await dispatch(postInvoiceThunk(data));

      method === 'paypal' && navigate('../pending-payment');
    }
  };

  if (invoiceLink != null) {
    method === 'stripe' ? window.open(invoiceLink, '_self') : window.open(invoiceLink, '_blank');
    dispatch(setInvoiceLink(null));
  }

  return (
    <div className="top_up_bundle__right-mobile">
      {packages.length > 0 && (
        <div style={{ margin: '26px 0' }}>
          <SummaryMobile cartTotal={cartTotal} />
        </div>
      )}
      <div className="top_up_bundle__total-wrapper">
        <div className="top_up_bundle__total-title">Total</div>
        <div className="top_up_bundle__total-count">{total === 'error' ? 'To much' : `$${total / 100}`}</div>
      </div>

      <div className="top_up_bundle__payment-block">
        <div className="payment_page__bundle__vars-radio-wrapper">
          <div className="payment_page__bundle__vars-radio__elem">
            <input
              type="radio"
              name="payMethod"
              value="stripe"
              id="stripe"
              className="custom-radio"
              onChange={setPayMethod}
            />
            <label htmlFor="stripe" />
            <div className="payment__form-radio_btn_types-label">Stripe</div>
          </div>
          <div className="payment_page__bundle__vars-radio__elem">
            <input
              type="radio"
              name="payMethod"
              value="paypal"
              id="paypal"
              className="custom-radio"
              onChange={setPayMethod}
            />
            <label htmlFor="paypal" />
            <div className="payment__form-radio_btn_types-label">Paypal</div>
          </div>
        </div>
      </div>
      <div className={`${total === 'error' ? 'dn' : ''} top_up_bundle__buttons-wrapper`}>
        <button
          className="top_up_bundle__buttons-button"
          // disabled
          disabled={total == 'error'}
          onClick={() => {
            toogle.add !== null && toogle.add();
          }}
        >
          Add another category
        </button>
        <button
          className="top_up_bundle__buttons-button"
          onClick={postInvoice}
          disabled={total == 'error' || method == undefined}
        >
          Proceed to payment
        </button>
        <div className="top_up_bundle__buttons-sometext">The credits you purchase will be available for one year.</div>
      </div>
    </div>
  );
};
