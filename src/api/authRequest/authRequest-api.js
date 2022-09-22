import * as axios from "axios";
import Cookies from "js-cookie";
import {instance} from "../axios-instance";

export const getBrands = (id) => {
  return instance.get(`product-types/${id}`, {
    headers: { Authorization: "Bearer " + Cookies.get("jwt") },
  });
};

export const orderCreate = () => {
  return instance.post(
    `orders`,
    {},
    { headers: { Authorization: "Bearer " + Cookies.get("jwt") } }
  );
};

export const createProduct = (data) => {
  return instance.post(`products`, data, {
    headers: { Authorization: "Bearer " + Cookies.get("jwt") },
  });
};

export const getBalance = () => {
  return instance.get(`user-tariff-packages/get-balance`, {
    headers: { Authorization: "Bearer " + Cookies.get("jwt") },
  });
};

export const getBalanceCert = () => {
  return instance.get("user-certificate-packages/get-balance", {
    headers: { Authorization: "Bearer " + Cookies.get("jwt") },
  });
};

export const uploadPhotoForProduct = (data) => {
  //console.log(data)
  //return instance.post('file/photo', {productId: data.productId, angleId: data.angleId, photo: data.file}, {headers: {'Authorization': 'Bearer ' + token}})
  return instance.post("file/photo", data, {
    headers: { Authorization: "Bearer " + Cookies.get("jwt") },
  });
};

export const completedAuthentification = () => {
  return instance.get("products/get-dashboard", {
    headers: { Authorization: "Bearer " + Cookies.get("jwt") },
  });
} ;

export const billingInfo = () => {
  return instance.get("invoices", {
    headers: { Authorization: "Bearer " + Cookies.get("jwt") },
  });
};
