import * as axios from 'axios'
import Cookies from 'js-cookie'

const token = Cookies.get('jwt')

export const instance = axios.create(
    {
        baseURL: 'https://b2b-portal-dev.herokuapp.com/',
        headers: {'Authorization': 'Bearer ' + token}
    }
)