import React from 'react'
import Header from "../../components/Payment/Header/Header";
import SvgSelector from "../../common/icons/SvgSelector";
import Navigation from "../../components/Navigation/Navigation";
import RigthSide from "../../components/Payment/RightSide/RightSide";
import "./Payment.scss";
import { useEffect, useState } from "react";
import {
  getCartTotal,
  getCosts,
  getInvoiceLink,
  getTotalPackage,
  getUserTariffPackages,
} from "../../redux/selectors/payment-selectors";
import { getUser } from '../../redux/selectors/auth-selectors';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { setInvoiceLink } from "../../redux/reducers/payment-reducer";
import { postInvoiceThunk } from "../../redux/thunks/payment-thunk";
import PersonalAreaLayout from "../../components/PersonalArea/PersonalAreaLayout";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [method, setMethod] = useState();
  const [saveBilling, setSaveBilling] = useState(false);
  const [buttonState, setButtonState] = useState(true);
  const totalPackage = useSelector(getTotalPackage);
  const costs = useSelector(getCosts);
  const total = useSelector(getCartTotal);
  const invoiceLink = useSelector(getInvoiceLink);
  const userTariffPackages = useSelector(getUserTariffPackages);
  const user = useSelector(getUser)

  const setPayMethod = (e) => {
    setMethod(e.target.value);
  };

  const postInvoice = async () => {
    if (totalPackage !== {} && method) {
      setButtonState(false);
      
      const data =
        userTariffPackages.length > 0
          ? {
              ...totalPackage,
              userTariffPackages: userTariffPackages,
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
      const response = await dispatch(postInvoiceThunk(data));
      response === true && setButtonState(true);
      // console.log(data);
      method === "paypal" && navigate("../pending-payment");
    }
  };

  if (invoiceLink != null) {
    method === "stripe"
      ? window.open(invoiceLink, "_self")
      : window.open(invoiceLink, "_blank");
    dispatch(setInvoiceLink(null));
  }

  useEffect(() => {
    if (Object.keys(totalPackage).length < 1) {
      navigate("../payment");
    }
  });

  if (Object.keys(totalPackage).length < 1) {
    return <></>;
  }

  if (!buttonState) {
    return <Loader />;
  }

  return (
    <>
      <div className="payment_page-container">
        <div className="payment_page__form">
          
          <div className="top_up_bundle__left-nav">
                    <Navigation hrefs={[{ label: `${user.companyName}` }, { label: 'Authentication Bundle' }]}/>
                    <div className="top_up_bundle__left-mobile">
                        <h1>authentication bundle</h1>
                        <SvgSelector id='burger'/>
                    </div>
                    <div className="mobile-nav"><PersonalAreaLayout/></div>
                </div>
                <Header />
          <div className="payment_page__bundle-wrapper">

            {/* <div className="payment_page__bundle__billing-header">
              Billing information
            </div> */}
            {/* <div className="payment_page__bundle__billing-wrapper">
              <div className="payment_page__bundle__billing-elem">
                <div className="payment_page__bundle__billing-label">
                  Business name
                </div>
                <div className="payment_page__bundle__billing-value">
                  Luxury store
                </div>
                <div className="payment_page__bundle__billing-button">
                  Change
                </div>
              </div>
              <hr />
              <div className="payment_page__bundle__billing-elem">
                <div className="payment_page__bundle__billing-label">
                  Billing address
                </div>
                <div className="payment_page__bundle__billing-value">
                  XXX, XXX, Estonia
                </div>
                <div className="payment_page__bundle__billing-button">
                  Change
                </div>
              </div>
              <hr />
              <div className="payment_page__bundle__billing-elem">
                <div className="payment_page__bundle__billing-label">
                  VAT number
                </div>
                <div className="payment_page__bundle__billing-value">
                  00000000
                </div>
                <div className="payment_page__bundle__billing-button">
                  Change
                </div>
              </div>
            </div> */}
            {/* <div className="payment_page__bundle__checkbox">
              <input
                type="checkbox"
                className="custom-checkbox"
                id="saveBilling"
                name="saveBilling"
                checked={saveBilling}
                onChange={() => setSaveBilling(!saveBilling)}
              />
              <label htmlFor="saveBilling">Save billing information</label>
            </div> */}
            <div className="payment_page__bundle__vars-wrapper">
              <div className="payment_page__bundle__vars-h1">Payment</div>
              <div className="payment_page__bundle__vars-h2">
                All transactions are secure and encrypted
              </div>
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
                  <div className="payment__form-radio_btn_types-label">
                    Stripe
                  </div>
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
                  <div className="payment__form-radio_btn_types-label">
                    Paypal
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RigthSide toogle={{ add: null, pay: postInvoice }} />
      </div>
    </>
  );
};

export default Payment;
