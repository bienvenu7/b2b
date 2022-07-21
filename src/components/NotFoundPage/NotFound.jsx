import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getIsAuth } from "../../redux/selectors/auth-selectors"
import './NotFound.scss'

const NotFoundPage = () => {

    const navigate = useNavigate()
    
    const isAuth = useSelector(getIsAuth)

    return (
        <>
            <div className="notFoundPage-container">
                <div className="notFoundPage-wrapper">
                    <div className="notFoundPage__title">404 page not found</div>
                    <div className="notFoundPage__button" onClick={()=>{isAuth ? navigate('../main') : navigate('../auth/signin')}}>Go away</div>
                </div>
            </div>
        </>
    )
}

export default NotFoundPage