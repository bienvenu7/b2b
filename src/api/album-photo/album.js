import { instance } from "../axios-instance";

import Cookies from "js-cookie";

export const getAlbum = (id) => {
    return instance.get(`/file/get-photos-by-hash/${id}`, {
        headers: { Authorization: "Bearer " + Cookies.get("jwt") }
    })
}