import Cookies from "js-cookie";
import { initializedSuccess } from "../reducers/app-reducer";
import { getAuthThunk } from "./auth-thunk";
import { getBalanceThunk } from "./authRequest-thunk";
import { getAnglesListThunk, getResultsStatusesThunk } from "./product-thunk";

export const initialApp = () => (dispatch) => {
  dispatch(getAnglesListThunk());
  let promise = dispatch(getAuthThunk());
  let promise1 = promise.then(() => {
    if (Cookies.get("jwt")) {
      dispatch(getBalanceThunk());
      dispatch(getResultsStatusesThunk());
    }
  });
  promise1.then(() => {
    dispatch(initializedSuccess());
  });
};
