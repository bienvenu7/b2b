import { useSelector } from "react-redux";
import "../../../pages/TopUpBundle/TopUpBundle.scss";
import {
  getCartTotal,
  getUserTariffPackages,
} from "../../../redux/selectors/payment-selectors";
import Balance from "../../Balance/Balance";
import Summary from "../../Summary/Summary";

const RigthSide = ({ toogle }) => {
  const packages = useSelector(getUserTariffPackages);
  const total = useSelector(getCartTotal);

  return (
    <>
      <div className="top_up_bundle__right-wrapper">
        <Balance />
        {packages.length > 0 && (
          <div style={{ margin: "84px 0" }}>
            <Summary />
          </div>
        )}
        <div className="top_up_bundle__summary-wrapper"></div>
        <div className="top_up_bundle__total-wrapper">
          <div className="top_up_bundle__total-title">Subtotal</div>
          <div className="top_up_bundle__total-count">${total / 100}</div>
        </div>
        <div className="top_up_bundle__buttons-wrapper">
          <button
            className="top_up_bundle__buttons-button"
            onClick={() => toogle.add !== null && toogle.add()}
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
    </>
  );
};

export default RigthSide;
