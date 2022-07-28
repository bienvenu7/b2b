import { addCertificate, getAllAngles, getProduct, getProducts, getProductTypes, getResultsStatuses } from "../../api/product/product-api"
import { setAnglesList, setProduct, setProducts, setProductTypes, setResultStatuses } from "../reducers/product-reducer"
import { getBalanceThunk } from "./authRequest-thunk"
import { getPriceThunk } from "./payment-thunk"

export const getProductTypesThunk = (page, limit) => async (dispatch) => {
    const response = await getProductTypes(page, limit)
    dispatch(setProductTypes(response.data.data))
    dispatch(getPriceThunk(null))
}

export const getProductThunk = (id) => async (dispatch) => {
    try {
        const response = await getProduct(id)
        dispatch(setProduct(response.data))
    } catch (error) {

    }

}

export const getProductsThunk = (data) => async (dispatch) => {
    try {
        const response = await getProducts(data)
        dispatch(setProducts(response.data.entities))
    } catch (error) {

    }
}

export const getResultsStatusesThunk = () => async (dispatch) => {
    try {
        const response = await getResultsStatuses()
        dispatch(setResultStatuses(response.data.data))
        return response.data.data
    } catch (error) {

    }
}

export const getAnglesListThunk = () => async (dispatch) => {
    try {
        const response = await getAllAngles()
        dispatch(setAnglesList(response.data.entities))
    } catch (error) {

    }
}

export const addCertificateThunk = (product) => async (dispatch) => {
    try {
        const balance = await dispatch(getBalanceThunk())
        if (balance > 0){
            await addCertificate(product)
            return true
        }
        else{
            return false
        }
    } catch (error) {

    }
}