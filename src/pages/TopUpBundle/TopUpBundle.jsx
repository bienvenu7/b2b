import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCertificatePackage, getUserTariffPackages } from '../../redux/selectors/payment-selectors';
import { PaymentForm } from '../../components/Payment/PaymentForm/PaymentForm';
import { getCartTotalThunk, getPriceThunk } from '../../redux/thunks/payment-thunk';
import { getProductTypesThunk } from '../../redux/thunks/product-thunk';
import { getIsAuth, getUser } from '../../redux/selectors/auth-selectors';
import './TopUpBundle.scss';
import { RigthSide } from '../../components/Payment/RightSide/RightSide';
import { RigthSideMobile } from '../../components/Payment/RightSideMobile/RightSideMobile';
import { Header } from '../../components/Payment/Header/Header';
import { Navigation } from '../../components/Navigation/Navigation';
import { SvgSelector } from '../../common/icons/SvgSelector';
import { PersonalAreaLayout } from '../../components/PersonalArea/PersonalAreaLayout';

export const TopUpBundle = () => {
  const dispatch = useDispatch();
  const packages = useSelector(getUserTariffPackages);
  const certificate = useSelector(getUserCertificatePackage);
  const isAuth = useSelector(getIsAuth);
  const user = useSelector(getUser);

  const [addButState, setAddButState] = useState(false);
  const [payButState, setPayButState] = useState(false);

  const [timerPrice, setTimerPrice] = useState(false);
  const [timerCart, setTimerCart] = useState(false);

  useEffect(() => {
    isAuth && dispatch(getProductTypesThunk(1, 1000));
  }, [isAuth]);

  // eslint-disable-next-line no-empty-function
  useEffect(() => {}, [packages.length]);

  const btnAddToogleClick = () => {
    setAddButState(true);
    setTimeout(() => {
      setAddButState(false);
    }, 1);
  };

  const btnPayToogleClick = () => {
    setPayButState(true);
    setTimeout(() => {
      setPayButState(false);
    }, 1);
  };

  const calcCartTotal = () => {
    const data = {
      userTariffPackages: packages,
      userCertificatePackage: certificate,
    };

    clearTimeout(timerCart);
    setTimerCart(
      setTimeout(() => {
        if (data.userTariffPackages) {
          if (data.userTariffPackages.length === 1) {
            if (data.userTariffPackages[0].productType !== '') {
              dispatch(getCartTotalThunk(data));
            }
          } else if (data.userTariffPackages.length !== 0) {
            dispatch(getCartTotalThunk(data));
          }
        } else {
          dispatch(getCartTotalThunk(data));
        }
      }, 1000),
    );
  };

  const getPrice = (data) => {
    clearTimeout(timerPrice);
    setTimerPrice(
      setTimeout(() => {
        dispatch(getPriceThunk(data));
      }, 1000),
    );
  };
  return (
    <div className="top_up_bundle-container">
      <div className="top_up_bundle__left-wrapper">
        <div className="top_up_bundle__left-nav">
          <Navigation hrefs={[{ label: `${user.companyName}` }, { label: 'Authentication Bundle' }]} />
          <div className="top_up_bundle__left-mobile">
            <h1>authentication bundle</h1>
            <SvgSelector id="burger" />
          </div>
          <div className="mobile-nav">
            <PersonalAreaLayout />
          </div>
        </div>
        <Header />
        <PaymentForm btnAdd={addButState} btnPay={payButState} cartTotal={calcCartTotal} getPrice={getPrice} />
      </div>
      <RigthSide toogle={{ add: btnAddToogleClick, pay: btnPayToogleClick }} cartTotal={calcCartTotal} />
      <RigthSideMobile toogle={{ add: btnAddToogleClick, pay: btnPayToogleClick }} cartTotal={calcCartTotal} />
    </div>
  );
};
