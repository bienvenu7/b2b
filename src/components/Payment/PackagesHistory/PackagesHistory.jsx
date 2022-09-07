import { useSelector } from "react-redux";
import { getUserTariffPackages } from "../../../redux/selectors/payment-selectors";

const PackagesHistory = () => {
  const packages = useSelector(getUserTariffPackages);

  return (
    <>
      <div className="packages-container">
        {packages.map(
          (el, index) =>
            el.productType !== "" && (
              <div key={index} className="packages-wrapper">
                <div className="packages__label">
                  Authentication bundle #{index + 1}
                </div>
                <div className="packages__elem">
                  <div className="packages__elem__category">
                    {el.productType.publicName}
                  </div>
                  {el.answerTime !== "" && (
                    <div className="packages__elem__hours">
                      {el.answerTime} hours
                    </div>
                  )}
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
};

export default PackagesHistory;
