import { instance } from "../axios-instance";
import Cookies from "js-cookie";

export const postInvoices = (data) => {
  return instance.post("invoices", data, {
    headers: { Authorization: "Bearer " + Cookies.get("jwt") },
  });
};

export const cartTotal = (data) => {
  if(data.userTariffPackages) {
    let temparr = data.userTariffPackages.filter((e) => e.productType != '')
    data.userTariffPackages = temparr
  }
  

  return instance.post("invoices/get-cart-total", data, {
    headers: { Authorization: "Bearer " + Cookies.get("jwt") },
  });
};

export const getPrice = (data) => {
  if (data == null) {
    return instance.get(`tariff-packages/get-price`, {
      headers: { Authorization: "Bearer " + Cookies.get("jwt") },
    });
  }
  return instance.get(
    `tariff-packages/get-price?productTypeId=${data.id}&volume=${data.volume}&answerTime=${data.answerTime}`,
    { headers: { Authorization: "Bearer " + Cookies.get("jwt") } }
  );
};
