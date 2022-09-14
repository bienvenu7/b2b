import React from 'react'
import { useSelector } from "react-redux";
import { takeBalance } from "../../redux/selectors/authRequest-selectors";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Balance.scss";

const Balance = (props) => {
  const navigate = useNavigate();
  const balance = useSelector(takeBalance);
  useEffect(() => {}, [balance]);
  const {pathname} = useLocation()
  // console.log(pathname)

  return (
    <>
    {/* {console.log(balance)} */}
      <div className="balance-container">
        <div className="balance-title">Your authentication balance</div>
        <hr />
        {balance.length > 0 && (
          <div className="balance__elems-wrapper">
            {balance.map(
              (el, index) =>
                el.volume > 0 && (
                  <div key={index} className="balance__elem-wrapper">
                    <div className="balance__elem-title">
                      {el.productType.publicName}
                    </div>
                    {el.answerTime && (
                      <div className="balance__elem-hours">
                        {el.answerTime + " hours"}
                      </div>
                    )}
                    <div className="balance__elem-volume">{el.volume}</div>
                  </div>
                )
            )}
          </div>
        )}
        { pathname === "/payment" && balance.length > 0 && (
          <div className="balance__buttons-wrapper">
            <button className="balance-button" onClick={() => navigate("/authentication-request")}>New authentication</button>
          </div>
        )}
        { pathname === "/authentication-request" && balance.length > 0 && (
          <div className="balance__buttons-wrapper">
            <button className="balance-button top-button" onClick={() => navigate("/payment")}>Top up now</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Balance;
