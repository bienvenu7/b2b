import { instance } from "../axios-instance";

import Cookies from "js-cookie";

export const getNotification = () => {
    return instance.get('/notifications', {
        params: { 'is-read': false, 'result-status-id':  '4faba4f7-dd01-45e8-855d-e962a66ec0ab', sort: 'DESC', limit: 10, page: 1},    
        headers: { Authorization: "Bearer " + Cookies.get("jwt") }
    });
};