import * as axios from 'axios'
import Cookies from 'js-cookie'
import { instance } from '../axios-instance'

/*const token = Cookies.get('jwt')

const instance = axios.create(
    {
        baseURL: 'https://b2b-portal-dev.herokuapp.com/'
    }
)*/


export const register = (data) => {
    return instance.post('auth/email/register', data)
}

export const login = (data) => {
    return instance.post('auth/email/login', data)
}

export const getAuth = (data) => {
    return instance.get('auth/me', {headers: {'Authorization': 'Bearer ' + data}})
}

export const removeMe = () => {
    return instance.delete('auth/me')
}

export const forgotEmail = (data) => {
    return instance.post('auth/forgot/password', data)
}

export const forgotPassword = (data) => {
    return instance.post('auth/reset/password', data)
}

