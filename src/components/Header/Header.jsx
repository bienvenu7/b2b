import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import SvgSelector from "../../common/icons/SvgSelector";
import { getUser } from "../../redux/selectors/auth-selectors";
import Navigation from "../Navigation/Navigation";

import Notification from "../notifications/Notifications";
import "./Header.scss";

//icon header
import header_icon from "../../common/icons/logoMobile.png";
import { logoutThunk } from "../../redux/thunks/auth-thunk";
import { useDispatch, useSelector } from "react-redux";
import { takeProducts } from "../../redux/selectors/product-selectors";

const Header = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const {pathname, state} = useLocation();
  // console.log(pathname)

  //for notifications
  const [showNotif, setShowNotif] = useState(false);
  const cardRef = useRef();

  const dispatch = useDispatch()
  const user = useSelector(getUser)

  useEffect(() => {
    const handle = (event) => {
      !cardRef.current.contains(event.target) && setShowNotif(false);

      document.addEventListener("mousedown", handle)}

    return () => document.addEventListener("mousedown", handle);

  });

  useEffect(() => {}, [params.page]);



  // Хардкод путей для хлебных крошек
  let path
  if(pathname ==='/photo-requests/all') path = "Photo requests"
  if(pathname ==='/dashboard') path = "Dashboard"
  if(pathname ==='/authentication-request') path = "Authentication request"
  if(pathname ==='/authentications/completed') path = "Completed authentications"
  if(pathname ==='/authentications/in-progress') path = "In progress authentications"
  if(pathname ==='/billing-history') path = "Billing history"
  if(pathname === '/pending-payment') path = "Pending payment"
  if(pathname ==='/success') path = "Success"
  if(pathname ==='/unsuccess') path = "Unsuccess"
  if(pathname.split('/')[1] ==="request") path = "Request"
  // console.log({pathname:pathname.split('/')[1]}); //маленький костыль

  function goBack() {
    if (state && state.var !== "photo-requests") {
      navigate(
          `../authentications/${
              state.var === "progress" ? "in-progress" : "completed"
          }`,
          { state: { page: state.page, var: state.var } }
      );
    } else {
      navigate(`../photo-requests/all`, {
        state: {
          page: state && state.page,
          var: state && state.var,
        },
      });
    }
  }

  const title = params.id ? (
      <div className="label-go_back" onClick={goBack}>
        <SvgSelector id="yellow-arrow-icon" />
        All authentications
      </div>
  ) : params.page === "completed" ? (
      "All authentications"
  ) : params.page === "in-progress" ? (
      "All authentications"
  ) : (
      params.page === "all" && "Photo requqests"
  );

  const titleMap = {
    "/photo-requests/all": "Photo requests",
    "/dashboard": "Dashboard",
    "/authentication-request": "Authentication request",
    "/authentications/completed": "All authentications",
    "/billing-history": "Billing",
    "/payment": "Authentication bundle",
  };

  const titleName = titleMap[pathname];

  return (
      <>
        <div className="header-container">
          <div className="header-wrapper">
            <Navigation
                hrefs={[{ label: `${user.companyName}` }, { label: `${path}` }]}
            />
            <div className="right-nav">
              <label
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                      showNotif ? setShowNotif(false) : setShowNotif(true)
                  }
                  htmlFor=""
                  className="hamburger"
              >
                <SvgSelector id="bell" />
              </label>
              <div style={{cursor: 'pointer'}} onClick={() => dispatch(logoutThunk())} ><SvgSelector id="logout" /></div>
            </div>
          </div>
          <div className="header-wrapper mobile">
            <div className="mobile_header-label">
              {titleName}
            </div>
            <div className="hamburger-menu">
              <label className="menu__btn" htmlFor="dashboard-open">
                <span></span>
              </label>
            </div>
          </div>
          <div ref={cardRef}>
            {showNotif && <Notification setShow={setShowNotif} />}
          </div>
        </div>
      </>
  );
};

export default Header;