import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartTotal, getUserTariffPackages } from '../../redux/selectors/payment-selectors';
import { PackagesHistory } from './PackagesHistory/PackagesHistory';
import { PaymentForm } from './PaymentForm/PaymentForm';
import { PaymentHeader } from './PaymentHeader/PaymentHeader';
import { getCartTotalThunk, getPriceThunk } from '../../redux/thunks/payment-thunk';
import { MobileHeader } from '../Mobile/MobileHeader/MobileHeader';
import { getProductTypesThunk } from '../../redux/thunks/product-thunk';
import { getIsAuth } from '../../redux/selectors/auth-selectors';
import { Balance } from '../Balance/Balance';

export const Payment = () => {
  const dispatch = useDispatch();
  const packages = useSelector(getUserTariffPackages);
  const total = useSelector(getCartTotal);
  const isAuth = useSelector(getIsAuth);

  const [addButState, setAddButState] = useState(false);
  const [payButState, setPayButState] = useState(false);
 
  // eslint-disable-next-line no-empty-function
  useEffect(() => {}, [total, packages.length]);

  useEffect(() => {
    isAuth && dispatch(getProductTypesThunk(1, 1000));
  }, [isAuth]);

  // TODO исправить, смысла нет?
  const btnAddToogleClick = () => {
    setAddButState(true);
  };

  const btnPayToogleClick = () => {
    setPayButState(true);
  };

  const calcCartTotal = (data) => {
    dispatch(getCartTotalThunk(data));
  };

  const getPrice = (data) => {
    dispatch(getPriceThunk(data, 'pay1'));
  };

  // Оставить на ПАМЯТЬ!!!
  //
  // const calcCartTotal = (data) => {
  //   clearTimeout(timerCart);
  //   setTimerCart(
  //     setTimeout(() => {
  //       if (data.userTariffPackages) {
  //         if (data.userTariffPackages.length === 1) {
  //           if (data.userTariffPackages[0].productType !== "") {
  //             dispatch(getCartTotalThunk(data));
  //           }
  //         } else if (data.userTariffPackages.length !== 0) {
  //           dispatch(getCartTotalThunk(data));
  //         }
  //       } else {
  //         dispatch(getCartTotalThunk(data));
  //       }
  //     }, 1000)
  //   );
  // };
  //
  // const getPrice = (data) => {
  //   clearTimeout(timerPrice);
  //   setTimerPrice(
  //     setTimeout(() => {
  //       dispatch(getPriceThunk(data));
  //     }, 1000)
  //   );
  // };

  return (
    <>
      <MobileHeader label="Authentication bundle" />
      <div className="payment-wrapper">
        <PaymentHeader />
        <div className="payment__content-container">
          {packages.length > 0 && <PackagesHistory />}
          <PaymentForm btnAdd={addButState} btnPay={payButState} cartTotal={calcCartTotal} getPrice={getPrice} />
          <Balance />
        </div>
        <div className="payment__footer">
          <div className="payment__footer-container">
            <div className="payment__footer-cost">
              <label className="payment__footer-cost-label">Subtotal</label>
              <div className="payment__footer-cost-count" id="count">
                ${total / 100}
              </div>
            </div>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
            jsx-a11y/no-static-element-interactions */}
            <div className="payment__footer-btn_add" onClick={() => btnAddToogleClick()}>
              Add another category
            </div>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
            jsx-a11y/no-static-element-interactions */}
            <div className="payment__footer-btn_submit" onClick={() => btnPayToogleClick()}>
              Proceed to payment
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
