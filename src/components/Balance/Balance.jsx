import { useSelector } from "react-redux";
import { takeBalance } from "../../redux/selectors/authRequest-selectors";
import "./Balance.scss";

const Balance = (props) => {
  const balance = useSelector(takeBalance);

  return (
    <>
      <div className="balance-container">
        <div className="balance-title">
          Your authentication balance
          <hr />
        </div>
        {balance.length > 0 && (
          <div className="balance__elems-wrapper">
            {balance.map(
              (el, index) =>
                el.volume > 0 && (
                  <div key={index} className="balance__elem-wrapper">
                    <div className="balance__elem-title">
                      {el.productType.publicName}
                    </div>
                    <div className="balance__elem-hours">
                      {el.answerTime + " hours"}
                    </div>
                    <div className="balance__elem-volume">{el.volume}</div>
                  </div>
                )
            )}
          </div>
        )}
        {/* <div className="balance__buttons-wrapper">
          <button className="balance-button top">Top up now</button>
          <button className="balance-button">New authentication</button>
        </div> */}
      </div>
    </>
  );
};

export default Balance;
