import { initializedSuccess } from "../reducers/app-reducer"
import { getAuthThunk } from "./auth-thunk"

export const initialApp = () => (dispatch) => {
    let promise = dispatch(getAuthThunk())
    promise.then(()=>{
        dispatch(initializedSuccess())
    })
}