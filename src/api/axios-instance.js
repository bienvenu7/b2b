import * as axios from "axios";
import Cookies from "js-cookie";

export const instance = axios.create({

  baseURL: "http://3.8.69.175:90"//"http://3.8.69.175:90",
})

// https://b2b-portal-dev.herokuapp.com/ api для тестовых данных
// http://3.8.69.175:90 настоящий бэкенд