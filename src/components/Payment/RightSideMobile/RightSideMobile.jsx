import React from 'react'
import { useSelector } from "react-redux";
import "../../../pages/TopUpBundle/TopUpBundle.scss";
import {
  getCartTotal,
  getUserTariffPackages,
} from "../../../redux/selectors/payment-selectors";
import SummaryMobile from '../../SummaryMobile/SummaryMobile';

const RigthSideMobile = ({ toogle, cartTotal }) => {
  const packages = useSelector(getUserTariffPackages);
  const total = useSelector(getCartTotal);

  return (
    <div className="top_up_bundle__right-mobile">
      {/* {console.log(total)} */}
      {packages.length > 0 && (
        <div style={{ margin: "26px 0" }}>
          <SummaryMobile cartTotal={cartTotal} />
        </div>
      )}
      {/* <div className="top_up_bundle__summary-wrapper"></div> */}
      <div className="top_up_bundle__total-wrapper">
        <div className="top_up_bundle__total-title">Total</div>
        <div className="top_up_bundle__total-count">${total / 100}</div>
      </div>
      <div className="top_up_bundle__buttons-wrapper">
        <button
          className="top_up_bundle__buttons-button"
          // disabled
          onClick={() => {
            toogle.add !== null && toogle.add()
            console.log(toogle.add);
          }}
        >
          Add another category
        </button>
        <button
          className="top_up_bundle__buttons-button"
          onClick={() => toogle.pay()}
        >
          Proceed to payment
        </button>
      </div>
    </div>
  );
};

export default RigthSideMobile