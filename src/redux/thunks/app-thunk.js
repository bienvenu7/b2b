import { initializedSuccess } from "../reducers/app-reducer"
import { getAuthThunk } from "./auth-thunk"
import { getBalanceThunk } from "./authRequest-thunk"

export const initialApp = () => (dispatch) => {
    let promise = dispatch(getAuthThunk())
    let promise1 = promise.then(()=>{
        dispatch(initializedSuccess())
    })
    promise1.then(()=>dispatch(getBalanceThunk()))
}