import { useEffect } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import SvgSelector from "../../common/icons/SvgSelector"
import Navigation from "../Navigation/Navigation"
import './Header.scss'

const Header = (props) => {

    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    

    useEffect(()=>{

    },[params.page])

    function goBack(){
        if (location.state && location.state.var !== 'photo-requests'){
            navigate(`../authentications/${location.state.var==='progress' ? 'in-progress' : 'completed'}`, {state: {page: location.state.page, var: location.state.var}})
        }
        else{
            navigate(`../photo-requests/all`, {state: {page: location.state && location.state.page, var: location.state && location.state.var}})
        }
        
    }

    const title = params.id ? <div className="label-go_back" onClick={goBack}><SvgSelector id='yellow-arrow-icon'/>All authentications</div> : params.page === 'completed' ? 'All authentications' : params.page === 'in-progress' ? 'All authentications' : params.page === 'all' && 'Photo requqests'

    return (
        <>
            <div className="header-container">
                <div className="header-wrapper">
                    <Navigation hrefs={[{ label: 'Luxury store' }, { label: 'Authentications' }]} />
                    <label htmlFor="" className="hamburger"><SvgSelector id='bell' /></label>
                </div>
                <div className="header-wrapper mobile">
                    <div className='mobile_header-label'>{title}</div>
                    <div className='hamburger-menu'>
                    <label className="menu__btn" htmlFor="dashboard-open">
                        <span></span>
                    </label>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Header