import { useDispatch } from 'react-redux'
import { logoutThunk } from '../../redux/thunks/auth-thunk'
import './Main.scss'

const Main = () => {

    const dispatch = useDispatch()

    return(
        <div className="MainPage-container">Main Page
        <button onClick={()=>{dispatch(logoutThunk())}}/>
        </div>
    )
}

export default Main