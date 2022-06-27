import { login, register, getAuth } from "../../api/auth/auth-api"
import { setAuth } from '../reducers/auth-reducer'

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
    dispatch(setAuth(response.data))
}

export const getAuthThunk = (data) => async (dispatch) => {
    const response = await getAuth(data)
}