import * as axios from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create(
    {
        baseURL: 'https://b2b-portal-dev.herokuapp.com/',
    }
)

const token = Cookies.get('jwt')




export const register = (data) => {
    return instance.post('auth/email/register', data)
}

export const login = (data) => {
    return instance.post('auth/email/login', data)
}

export const getAuth = () => {
    return instance.get('auth/me', {headers: {'Authorization': 'Bearer ' + token}})
}

export const removeMe = () => {
    return instance.delete('auth/me', {headers: {'Authorization': 'Bearer ' + token}})
}

export const forgotEmail = (data) => {
    return instance.post('auth/forgot/password', data)
}

export const forgotPassword = (data) => {
    return instance.post('auth/reset/password', data)
}

