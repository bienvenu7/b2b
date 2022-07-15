import { createProduct, getBrands, orderCreate } from "../../api/authRequest/authRequest-api"
import { initOrder, setBrands } from "../reducers/authRequest-reducer"

export const getBrandsThunk = (id) => async (dispatch) => {
    const response = await getBrands(id)
    dispatch(setBrands(response.data.productTypeBrands))
}

export const createOrderThunk = () => async (dispatch) => {
    try {
        const response = await orderCreate()
        dispatch(initOrder(response.data))
    } catch (error) {
        console.log(error)
    }
}

export const createProductThunk = (data) => async (dispatch) => {
    try {
        const response = await createProduct(data)
    } catch (error) {
        
    }
}