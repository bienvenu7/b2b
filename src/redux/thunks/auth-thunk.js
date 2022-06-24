import { login, register, getAuth } from "../../api/auth/auth-api"
import { setAuth } from '../reducers/auth-reducer'

export const regThunk = (data) => async (dispatch) => {
    const response = await register(data)
    const loginData = {
        email: data.email,
        password: data.password
    }
    if (response.statusCode === 201){
        dispatch(loginThunk(loginData))
    }
}

export const loginThunk = (data) => async (dispatch) => {
    const response = await login(data)
    dispatch(setAuth(response))
}

export const getAuthThunk = (data) => async (dispatch) => {
    const response = await getAuth(data)
    console.log(response)
}