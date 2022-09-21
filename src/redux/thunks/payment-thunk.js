import {
  cartTotal,
  getPrice,
  postInvoices,
} from "../../api/payment/payment-api";
import {
  setInvoiceLink,
  setPrice,
  setPriceForCertificate,
  setTotal,
} from "../reducers/payment-reducer";

export const postInvoiceThunk = (obj) => async (dispatch) => {
  try {
    const host = window.location.protocol + "//" + window.location.host;
    const data = {
      ...obj,
      successUrl: host + "/success",
      cancelUrl: window.location.href,
    };

    const response = await postInvoices(data);
    response.status === 201 && dispatch(setInvoiceLink(response.data));
    return true;
  } catch (error) {
    return true;
  }
};

export const getCartTotalThunk = (data) => async (dispatch) => {
  
  const response = await cartTotal(data);
  response.status === 201 && dispatch(setTotal(response.data.total));
};

export const getPriceThunk = (data) => async (dispatch) => {
  // console.log(data);
  if (data == null) {
    const response = await getPrice(data);
    response.status === 200 &&
      dispatch(setPriceForCertificate(response.data.certificate));
  } else {
    const response = await getPrice({
      id: data.productType.id,
      volume: data.volume,
      answerTime: data.answerTime,
    });
    response.status === 200 &&
      dispatch(setPrice(response.data.tariffPackage.price));
  }
};
