import { login, register, getAuth, logout, forgotEmail, forgotPassword } from "../../api/auth/auth-api"
import { setAuth } from '../reducers/auth-reducer'
import Cookies from 'js-cookie'
import { setStatusCode } from "../reducers/app-reducer"

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
        const response = await login(data)
        Cookies.set('jwt', response.data.token)
        dispatch(setAuth(response.data.user))
}

export const getAuthThunk = () => async (dispatch) => {
    try {
        const response = await getAuth()
        dispatch(setAuth(response.data))
    } catch (error) {
        console.log(error)
    }
}

export const logoutThunk = () => async (dispatch) => {
    Cookies.remove('jwt')
}

export const forgotEmailThunk = (data) => async (dispatch) => {
    const response = await forgotEmail(data)
}

export const forgotPasswordThunk = (data) => async (dispatch) => {
    const response = await forgotPassword(data)
    if (response.statusCode == 200){
        dispatch(setStatusCode(200))
    }
}