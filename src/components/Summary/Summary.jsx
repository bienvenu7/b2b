import { useState } from "react";
import { useSelector } from "react-redux";
import {
  getUserTariffPackages,
  getCosts,
} from "../../redux/selectors/payment-selectors";
import "./Summary.scss";

const Summary = (props) => {
  const packages = useSelector(getUserTariffPackages);
  const cost = useSelector(getCosts);

  return (
    <>
      {packages.length > 0 && (
        <div className="summary-container">
          {packages[0].productType !== "" && (
            <div className="summary-title">Summary</div>
          )}
          {packages.map(
            (el, index) =>
              el.productType !== "" && (
                <div key={index} className="summary__elem-wrapper">
                  <div className="summary__elem-name">
                    {el.productType.publicName} bundle
                  </div>
                  <div className="summary__elem-cost">
                    {cost &&
                      cost[index] &&
                      cost[index] / 100 + " X " + el.volume}
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </>
  );
};

export default Summary;
