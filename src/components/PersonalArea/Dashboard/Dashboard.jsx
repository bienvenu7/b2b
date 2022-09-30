import SvgSelector from "../../../common/icons/SvgSelector";
import React, { useEffect } from 'react'
import "./Dashboard.scss";
import storeLogo from "../../../common/images/logo-of-store.png";
import dashboardIcon from "../../../common/images/dashboard-icon.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { takeBalance,companyname } from "../../../redux/selectors/authRequest-selectors";
import { getProductsThunk } from "../../../redux/thunks/product-thunk";
import { logoutThunk } from "../../../redux/thunks/auth-thunk";
import logo_img from '../../../common/images/logo-for-mobile.png'
import { useState } from "react";
import MobileNotif from "./MobileNotif";

const Dashboard = (props) => {
  const [show, setShow] = useState(true)
  const [show1, setShow1] = useState(true)

  const [showNotif, setShowNotif] = useState(false)
  const [timeoutforfetch, settimeoutforfetch] = useState(true)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const balance = useSelector(takeBalance);
  // console.log({balance:balance});
  const companyName = useSelector(companyname);
  // console.log(companyName);
  // const balance = [];
  useEffect(()=>{
  //   balance = null
  setTimeout(() => {
    // console.log("Delayed for 1 second.");
    settimeoutforfetch(false)
  },2000)
  },[])
  //temp

  return (
    <>
    {showNotif && <MobileNotif setShowNotif={setShowNotif}/>}
      <div className="dashboard-container fixed">
      <div className="dashboard-wrapper">
        <div className="dashboard__elem">
          <div className="dashboard__elem__top-wrapper">
            <div className="dashboard__elem__top-img">
              <img alt="" src={storeLogo} />
            </div>
            <div className="dashboard__elem__top-label">
              {companyName} <SvgSelector id="arrow" />
              <img onClick={() => navigate("../dashboard")} src={dashboardIcon} alt="" />
            </div>
            <div className="dashboard__elem__top__icon-wrapper">
              <div className="dashboard__elem__top__icon-elem">
                {/* <img src={dashboardIcon} alt="" /> */}
              </div>
              <div className="dashboard__elem__top__icon-elem">
                <div onClick={() => setShowNotif(!showNotif)}><SvgSelector  id="bell" /></div>
                <div onClick={() => dispatch(logoutThunk())} ><SvgSelector id="logout" /></div>
              </div>
            </div>
          </div>
          <div onClick={() => navigate("../dashboard")} className="dashboard__elem__child-wrapper">
            <div className="dashboard__elem__child-img">
              <img src={dashboardIcon} alt="" />
            </div>
            <div className="dashboard__elem__child__label">Dashboard</div>
          </div>
        </div>
        <div className="dashboard__elem__auth_balance-wrapper">
          <div className="dashboard__elem__auth_balance-label">
            Authentication balance <div onClick={() => setShow1(!show1)}><SvgSelector id={show1 ? "arrow" : "arrow-rotate"} /></div>
          </div>
          {show1 && <div className="dashboard__elem__auth_balance__balance-wrapper">
            {balance.length > 0 &&
              balance.filter(item => item.volume > 0).map((el, index) => (
                <div
                  key={index}
                  className="dashboard__elem__auth_balance__balance__elem"
                >
                  <div className="dashboard__elem__auth_balance__balance-category">
                    {el.productType.publicName}
                  </div>
                  {el.answerTime !== "" && (
                    <div className="dashboard__elem__auth_balance__balance-answer">
                      {el.answerTime} h
                    </div>
                  )}
                  <div className="dashboard__elem__auth_balance__balance-count">
                    {el.volume}
                  </div>
                </div>
              ))}
            {/* <div
                className="dashboard__elem__auth_balance__balance-button"
                onClick={() => navigate("../payment")}
              >
                Top up now
              </div> */}
            <div
              className="dashboard__elem__auth_balance__balance-button"
              onClick={() => navigate("../payment")}
            >
              Top up now
            </div>
            {(timeoutforfetch || balance.length > 0) ? <div
              className="dashboard__elem__auth_balance__balance-button"
              onClick={() => navigate("../authentication-request")}
            >
              New authentication
            </div>
            :
            <div
              className="dashboard__elem__auth_balance__balance-button authenticationdisabled"
            >
              New authentication
            </div>
            }
            {/* {
                (timeoutforfetch || balance.length > 0) ? (
                  <button
                    className="dashboard__elem__auth_balance__balance-button"
                    onClick={() => navigate("../authentication-request")}
                  >
                    New authentication
                  </button>
                ) : (
                  <div
                    className="dashboard__elem__auth_balance__balance-button"
                    onClick={() => navigate("../payment")}
                  >
                    Top up now
                  </div>
                    )
              } */}

          </div>}
          {(timeoutforfetch || balance.length > 0) ?null:<div className="textdisabled"><span>!</span>Top up to start autentification</div>}
        </div>
        <div className="dashboard__elem__authentications-wrapper">
          <div className="dashboard__elem__authentications-label">
            Authentication <div onClick={() => setShow(!show)}><SvgSelector id={show ? "arrow" : "arrow-rotate"} /></div>
          </div>
          {show && <div className="dashboard__elem__authentications-control__elements">
            <div
              className="dashboard__elem__authentications-control__elem-wrapper"
              onClick={() => navigate("../authentications/completed")}
            >
              <SvgSelector id="check-icon" />
              All authentications
            </div>
            <div
              className="dashboard__elem__authentications-control__elem-wrapper"
              onClick={() => navigate("../photo-requests/all")}
            >
              <SvgSelector id="camera-icon" />
              Photo requests
            </div>
          </div>}
        </div>
        <div className="dashboard__elem__tools-wrapper">
          <div className="dashboard__elem__tools-label">Tools</div>
          <div className="dashboard__elem__tools-control__elements">
            <div
              onClick={() => navigate("../billing-history")}
              className="dashboard__elem__tools-control__elem-wrapper"
            >
              <SvgSelector id="card-icon" />
              Billing
            </div>
          </div>
        </div>
        <div className="dashboard__elem__tools-wrapper two">
          <div className="dashboard__elem__tools-label">Tools</div>
          <div className="dashboard__elem__tools-control__elements">
            <div
              onClick={() => navigate("../billing-history")}
              className="dashboard__elem__tools-control__elem-wrapper"
            >
              <SvgSelector id="card-icon" />
              Get help
            </div>
          </div>
        </div>
        {(timeoutforfetch || balance.length > 0) ? <div
          className="dashboard__elem__auth_balance__balance-button mobile"
          onClick={() => navigate("../authentication-request")}
        >
          New authentication
        </div>
        :
        <div
          className="dashboard__elem__auth_balance__balance-button mobile authenticationdisabled"
          onClick={() => navigate("../authentication-request")}
        >
          New authentication
        </div>}
        <div className="dashboard__elem__auth_balance__balance-image-placeholder">
          <div className="fixed-image">
            <img src={logo_img} alt="" />
          </div>
        </div>
      </div>
      <label htmlFor="dashboard-open" className="dashboard__cross-container">
        <SvgSelector id="cross-icon" />
      </label>
    </div>
    </>
  );
};

export default Dashboard;
