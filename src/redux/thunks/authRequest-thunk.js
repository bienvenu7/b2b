import { createProduct, getBalance, getBrands, orderCreate, uploadPhotoForProduct } from "../../api/authRequest/authRequest-api"
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
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const createProductThunk = (data) => async (dispatch) => {
    try {
        const response = await createProduct(data)
        return response
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

export const uploadPhotoForProductThunk = (data) => async (dispatch) => {
    try {
        let formData = new FormData()
        formData.append('productId', data.productId)
        formData.append('angleId', data.angleId)
        formData.append('photo', data.file)
        const response = await uploadPhotoForProduct(formData)
    } catch (error) {
        console.log(error)
    }
}