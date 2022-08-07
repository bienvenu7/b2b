import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getIsAuth } from '../../redux/selectors/auth-selectors'
import { logoutThunk } from '../../redux/thunks/auth-thunk'
import './Main.scss'

const Main = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <>
            <div className="MainPage-container">Main Page
                <button onClick={() => { dispatch(logoutThunk()) }}>Logout</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                <button onClick={() => navigate('/payment')}>Payment</button>
                <button onClick={() => navigate('/authentication-request')}>Authentication request</button>
                <button onClick={() => navigate('/authentications/completed')}>Dashboard</button>
            </div>
        </>
    )
}

export default Main