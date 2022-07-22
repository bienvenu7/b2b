import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getIsAuth } from "../../redux/selectors/auth-selectors"
import './NotFound.scss'
import src from '../../common/images/404.png'

const NotFoundPage = () => {

    const navigate = useNavigate()
    
    const isAuth = useSelector(getIsAuth)

    return (
        <>
            <div className="notFoundPage-container">
                <div className="notFoundPage-wrapper">
                    <div className="notFoundPage__image"><img src={src}/></div>
                    <div className="notFoundPage__title">The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</div>
                    <div className="notFoundPage__button" onClick={()=>{isAuth ? navigate('../main') : navigate('../auth/signin')}}>Go to dashboard</div>
                </div>
            </div>
        </>
    )
}

export default NotFoundPage