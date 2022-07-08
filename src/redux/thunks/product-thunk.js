import { getProductTypes } from "../../api/product/product-api"
import { setProductTypes } from "../reducers/product-reducer"

export const getProductTypesThunk = (page, limit) => async (dispatch) => {
    const response = await getProductTypes(page, limit)
    dispatch(setProductTypes(response.data.data))
}