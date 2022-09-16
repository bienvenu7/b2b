import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserTariffPackages,
  getCartTotal,
} from "../../redux/selectors/payment-selectors";
import PaymentForm from "../../components/Payment/PaymentForm/PaymentForm";
import {
  getCartTotalThunk,
  getPriceThunk,
} from "../../redux/thunks/payment-thunk";
import { getProductTypesThunk } from "../../redux/thunks/product-thunk";
import { getIsAuth, getUser } from "../../redux/selectors/auth-selectors";
import Balance from "../../components/Balance/Balance";
import "./TopUpBundle.scss";
import Summary from "../../components/Summary/Summary";
import logo from "../../common/images/logo-for-mobile.png";
import RigthSide from "../../components/Payment/RightSide/RightSide";
import Header from "../../components/Payment/Header/Header";
import Header1 from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import SvgSelector from "../../common/icons/SvgSelector";
import PersonalAreaLayout from "../../components/PersonalArea/PersonalAreaLayout";

const TopUpBundle = (props) => {
  const dispatch = useDispatch();
  const packages = useSelector(getUserTariffPackages);
  const total = useSelector(getCartTotal);
  const isAuth = useSelector(getIsAuth);
  const user = useSelector(getUser)

  const [addButState, setAddButState] = useState(false);
  const [payButState, setPayButState] = useState(false);

  const [timerPrice, setTimerPrice] = useState(false);
  const [timerCart, setTimerCart] = useState(false);

  useEffect(() => {
    isAuth && dispatch(getProductTypesThunk(1, 1000));
  }, []);

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

  const calcCartTotal = (data) => {
    // dispatch(getCartTotalThunk(data));
    clearTimeout(timerCart);
    setTimerCart(
      setTimeout(() => {
        if (data.userTariffPackages) {
          if (data.userTariffPackages.length === 1) {
            if (data.userTariffPackages[0].productType !== "") {
              dispatch(getCartTotalThunk(data));
            }
          } else if (data.userTariffPackages.length !== 0) {
            dispatch(getCartTotalThunk(data));
          }
        } else {
          dispatch(getCartTotalThunk(data));
        }
      }, 1000)
    );
  };

  const getPrice = (data) => {
    clearTimeout(timerPrice);
    setTimerPrice(
      setTimeout(() => {
        dispatch(getPriceThunk(data));
      }, 1000)
    );
  };
  return (
    <>
      <div className="top_up_bundle-container">
        <div className="top_up_bundle__left-wrapper">
          <div className="top_up_bundle__left-nav">
            <Navigation
              hrefs={[
                { label: `${user.companyName}` },
                { label: "Authentication Bundle" },
              ]}
            />
            <div className="top_up_bundle__left-mobile">
              <h1>authentication bundle</h1>
              <SvgSelector id="burger" />
            </div>
            <div className="mobile-nav"><PersonalAreaLayout/></div>
          </div>
          <Header />
          <PaymentForm
            btnAdd={addButState}
            btnPay={payButState}
            cartTotal={calcCartTotal}
            getPrice={getPrice}
          />
        </div>
        <RigthSide
          toogle={{ add: btnAddToogleClick, pay: btnPayToogleClick }}
          cartTotal={calcCartTotal}
        />
      </div>
    </>
  );
};

export default TopUpBundle;
