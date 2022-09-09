import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getIsAuth } from "../../redux/selectors/auth-selectors";
import { logoutThunk } from "../../redux/thunks/auth-thunk";
import "./Main.scss";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div
        className="MainPage-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        Main Page
        <button
          onClick={() => {
            dispatch(logoutThunk());
          }}
        >
          Logout
        </button>
        <button onClick={() => {navigate("/dashboard")}}>
          Dashboard
        </button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <button onClick={() => navigate("/payment")}>Payment</button>
          <button onClick={() => navigate("/authentication-request")}>
            Authentication request
          </button>
          <button onClick={() => navigate("/authentications/completed")}>
            All authentication
          </button>
          {/* <button onClick={() => navigate("/home")}>Main dashboard</button> */}
        </div>
      </div>
    </>
  );
};

export default Main;
