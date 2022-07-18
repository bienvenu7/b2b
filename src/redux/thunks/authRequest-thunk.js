import { createProduct, getBalance, getBrands, orderCreate } from "../../api/authRequest/authRequest-api"
import { initOrder, setAngles, setBalance, setBrands } from "../reducers/authRequest-reducer"

export const getProductTypePropThunk = (id) => async (dispatch) => {
    const response = await getBrands(id)
    dispatch(setBrands(response.data.productTypeBrands))
    dispatch(setAngles(response.data.productTypeAngles))
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

export const getBalanceThunk = () => async (dispatch) => {
    try {
        const response = await getBalance()
        response.status === 200 && dispatch(setBalance(response.data))
    } catch (error) {
        console.log(error)
    }
}