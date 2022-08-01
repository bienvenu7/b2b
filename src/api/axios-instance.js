import * as axios from 'axios'
import Cookies from 'js-cookie'


export const instance = axios.create(
    {
        baseURL: 'https://b2b-portal-dev.herokuapp.com/'
    }
)
