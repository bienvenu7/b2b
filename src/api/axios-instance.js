import * as axios from "axios";
import Cookies from "js-cookie";

export const instance = axios.create({

  baseURL: "http://business.legitgrails.com/api"//"http://3.8.69.175:90",
})


// http://business.legitgrails.com/api - ИСПОЛЬЗОВАТЬ ЭТО!!!!!
// https://b2b-portal-dev.herokuapp.com/ api для тестовых данных
// http://3.8.69.175:90 настоящий бэкенд