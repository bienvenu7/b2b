import { addCertificate, getAllAngles, getBrandsList, getCheckStatuses, getProduct, getProducts, getProductTypes, getResultsStatuses, updateProduct } from "../../api/product/product-api"
import { setAnglesList, setBrandsList, setCheckStatuses, setProduct, setProducts, setProductTypes, setResultStatuses } from "../reducers/product-reducer"
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

export const updateProductThunk = (productId, data) => async (dispatch) => {
    try {
        const response = await updateProduct(productId,data)
    } catch (error) {
        
    }
}

export const getBrandsListThunk = (page, limit) => async (dispatch) =>{
    try {
        const response = await getBrandsList(page,limit)
        dispatch(setBrandsList(response.data.entities))
    } catch (error) {
        
    }
}

export const getCheckStatusesThunk = () => async (dispatch) => {
    try {
        const response = await getCheckStatuses()
        const arr = [{obj: response.data, arr: []}]
        for (var key in response.data){
            arr.push({value: key, label: response.data[key]})
        }
        dispatch(setCheckStatuses(arr))
    } catch (error) {
        
    }
}