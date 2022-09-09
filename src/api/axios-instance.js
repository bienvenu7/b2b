import * as axios from "axios";
import Cookies from "js-cookie";

export const instance = axios.create({
  baseURL: "http://3.8.69.175:90",
});
