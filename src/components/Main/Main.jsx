import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getIsAuth } from '../../redux/selectors/auth-selectors'
import { logoutThunk } from '../../redux/thunks/auth-thunk'
import './Main.scss'

const Main = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isAuth = useSelector(getIsAuth)

    useEffect(()=>{
        !isAuth && navigate('../auth/signup')
    },[isAuth])

    return(
        <div className="MainPage-container">Main Page
        <button onClick={()=>{dispatch(logoutThunk())}}>Logout</button>
        </div>
    )
}

export default Main