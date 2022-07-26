import * as axios from 'axios'
import Cookies from 'js-cookie'

const token = Cookies.get('jwt')

const instance = axios.create(
    {
        baseURL: 'https://b2b-portal-dev.herokuapp.com/',
        headers: {'Authorization': 'Bearer ' + token}
    }
)




export const getProducts = (data) => {
    
    return instance.post('products/get-products', data)
}

export const getResultsStatuses = () => {
    return instance.get('result-statuses', {params: {page: 1, limit: 100}})
}

