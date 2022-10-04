import React from 'react'
import { useSelector } from "react-redux";
import "../../../pages/TopUpBundle/TopUpBundle.scss";
import {
  getCartTotal,
  getUserTariffPackages,
} from "../../../redux/selectors/payment-selectors";
import Balance from "../../Balance/Balance";
import Summary from "../../Summary/Summary";

const RigthSide = ({ toogle, cartTotal }) => {
  const packages = useSelector(getUserTariffPackages);
  const total = useSelector(getCartTotal);

  return (
    <div className="top_up_bundle__right-wrapper">
      <Balance />
      {/* {console.log(total)} */}
      {packages.length > 0 && (
        <div style={{ margin: "84px 0" }}>
          <Summary cartTotal={cartTotal} />
        </div>
      )}
      <div className="top_up_bundle__summary-wrapper"></div>
      <div className="top_up_bundle__total-wrapper">
        
        {total=='error'?
        <div className="top_up_bundle__total-title">To much items</div>
        :
        <>
          <div className="top_up_bundle__total-title">Subtotal</div>
          <div className="top_up_bundle__total-count">${total / 100}</div>
        </>
        // <div className="top_up_bundle__total-count">{total=='error'?'To much':`$${total / 100}`}</div>
      }
      </div>
      <div className='top_up_bundle__buttons-wrapper'>
        <button
          className="top_up_bundle__buttons-button"
          // disabled
          onClick={() => {
            toogle.add !== null && toogle.add()
            console.log(toogle.add);
          }}
          disabled={total=='error'?true:false}
        >
          Add another category
        </button>
        <button
          className="top_up_bundle__buttons-button"
          onClick={() => toogle.pay()}
          disabled={total=='error'?true:false}
        >
          Proceed to payment
        </button>
      </div>
    </div>
  );
};

export default RigthSide