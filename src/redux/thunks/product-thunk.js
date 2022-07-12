import { getProductTypes } from "../../api/product/product-api"
import { setProductTypes } from "../reducers/product-reducer"
import { getPriceThunk } from "./payment-thunk"

export const getProductTypesThunk = (page, limit) => async (dispatch) => {
    const response = await getProductTypes(page, limit)
    dispatch(setProductTypes(response.data.data))
    dispatch(getPriceThunk(null))
}