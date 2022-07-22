import { login, register, getAuth, logout, forgotEmail, forgotPassword } from "../../api/auth/auth-api"
import { setAuth } from '../reducers/auth-reducer'
import Cookies from 'js-cookie'
import { setErrors, setStatusCode } from "../reducers/app-reducer"

export const regThunk = (data) => async (dispatch) => {
    try {
        const postData = {
            email: data.email,
            password: data.password,
            firstName: 'testFirst',
            lastName: 'testLast',
            companyName: data.company
        }
        const response = await register(postData)
        const loginData = {
            email: data.email,
            password: data.password
        }
        if (response.status === 201) {
            dispatch(loginThunk(loginData))
        }
    } catch (error) {
        dispatch(setErrors({ page: 'signup', error: error && error.response && error.response.data && error.response.data.message ? error.response.data.message[0] : null }))
    }
}

export const loginThunk = (data) => async (dispatch) => {
    try {
        const response = await login(data)
        Cookies.set('jwt', response.data.token)
        dispatch(getAuthThunk(response.data.token))
    } catch (error) {

        const data = {
            page: 'signin', error: error && error.response && error.response.data && error.response.data.message ? error.response.data.message[0]
                : error.response.data.errors && error.response.data.errors.password ? error.response.data.errors.password : null
        }
        dispatch(setErrors(data))
    }

}

export const getAuthThunk = (data) => async (dispatch) => {
    try {
        const token = await Cookies.get('jwt')
        if (token == undefined) {
            const response = await getAuth(data)
            dispatch(setAuth(response.data))
        } else {
            const response = await getAuth(token)
            dispatch(setAuth(response.data))
        }
    } catch (error) {

    }
}

export const logoutThunk = () => async (dispatch) => {
    Cookies.remove('jwt')
    dispatch(setAuth(null))
}

export const forgotEmailThunk = (data) => async (dispatch) => {
    try {
        const response = await forgotEmail(data)
        return true
    } catch (error) {
        const data = { page: 'forgot', error: error.response && error.response.data && error.response.data.errors && error.response.data.errors.email ? error.response.data.errors.email : null }
        dispatch(setErrors(data))
        return false
    }
}

export const forgotPasswordThunk = (data) => async (dispatch) => {
    const response = await forgotPassword(data)
    if (response.status == 200) {
        dispatch(setStatusCode(200))
    }
}