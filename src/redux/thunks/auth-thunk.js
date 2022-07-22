import { login, register, getAuth, logout, forgotEmail, forgotPassword } from "../../api/auth/auth-api"
import { setAuth } from '../reducers/auth-reducer'
import Cookies from 'js-cookie'
import { setErrors, setStatusCode } from "../reducers/app-reducer"

export const regThunk = (data) => async (dispatch) => {
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
}

export const loginThunk = (data) => async (dispatch) => {
    try {
        const response = await login(data)
        Cookies.set('jwt', response.data.token)
        dispatch(getAuthThunk())
    } catch (error) {
        const data = {page: 'signin', error: error && error.response && error.response.data && error.response.data.message ? error.response.data.message[0] : null}
        dispatch(setErrors(data))
    }    
    
}

export const getAuthThunk = () => async (dispatch) => {
    try {
        const token = Cookies.get('jwt')
        const response = await getAuth(token)
        dispatch(setAuth(response.data))
    } catch (error) {
        
    }
}

export const logoutThunk = () => async (dispatch) => {
    Cookies.remove('jwt')
    dispatch(setAuth(null))
}

export const forgotEmailThunk = (data) => async (dispatch) => {
    const response = await forgotEmail(data)
}

export const forgotPasswordThunk = (data) => async (dispatch) => {
    const response = await forgotPassword(data)
    if (response.status == 200){
        dispatch(setStatusCode(200))
    }
}