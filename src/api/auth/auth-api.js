import * as axios from 'axios'

const instance = axios.create(
    {
        baseURL: 'https://b2b-portal-dev.herokuapp.com/',
    }
)




export const register = (data) => {
    return instance.post('auth/email/register', data)
}

export const login = (data) => {
    return instance.post('auth/email/login', data)
}

export const getAuth = (data) => {
    return instance.get('auth/me', {headers: {'Authorization': 'Bearer ' + data}})
}

