import { getProducts, getResultsStatuses } from "../../api/requests/requests-api"
import { setRequests, setResultStatuses } from "../reducers/dashboard-reducer"
import Cookies from "js-cookie"

console.log(Cookies.get('jwt'))

export const getProductsThunk = (data) => async (dispatch) => {
    try {
        console.log(data)
        const response = await getProducts(data)
        console.log(response)
        dispatch(setRequests(response.data.entities))
    } catch (error) {
        
    }
}

export const getResultsStatusesThunk = () => async (dispatch) => {
    try {
        const response = await getResultsStatuses()
        dispatch(setResultStatuses(response.data.data))
        
    } catch (error) {
        
    }
}
