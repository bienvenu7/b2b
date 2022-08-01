import * as axios from 'axios'
import Cookies from 'js-cookie'

console.log(Cookies.get('jwt'))

export const instance = axios.create(
    {
        baseURL: 'https://b2b-portal-dev.herokuapp.com/'
    }
)

export const instancee = ()=> {
    return axios.create(
    
    {
        baseURL: 'https://b2b-portal-dev.herokuapp.com/',
        headers: {'Authorization': 'Bearer ' + Cookies.get('jwt')}
    }
    
)}