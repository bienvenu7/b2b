import { createProduct, getBalance, getBalanceCert, getBrands, orderCreate, uploadPhotoForProduct } from "../../api/authRequest/authRequest-api"
import { setErrors, setStatusCode } from "../reducers/app-reducer"
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
        console.log(error)
        dispatch(setErrors({ page: 'authrequest', error: error.response && error.response.data && error.response.data.message ? error.response.data.message : null }))
        return true
    }
}

export const getBalanceThunk = () => async (dispatch) => {
    try {
        const response = await getBalance()
        const next = await getBalanceCert()
        if (next.status === 200) {
            dispatch(setBalance([...response.data, { productType: { publicName: 'Certificate' }, answerTime: '', volume: next.data }]))
            return next.data
        }
    }
    catch (error) {
        console.log(error)
    }
}

export const uploadPhotoForProductThunk = (data, count, idx) => async (dispatch) => {
    try {
        console.log(data.angle)
        let formData = new FormData()
        formData.append('productId', data.productId)
        formData.append('angleId', data.angleId)
        formData.append('photo', data.file)
        const response = await uploadPhotoForProduct(formData)
        if (idx + 1 === count) {
            dispatch(setStatusCode(response.status))
            return true
        }
    } catch (error) {
        console.log(error)
        return true
    }
}