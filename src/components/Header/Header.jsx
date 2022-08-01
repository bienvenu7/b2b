import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import SvgSelector from "../../common/icons/SvgSelector"
import Navigation from "../Navigation/Navigation"
import './Header.scss'

const Header = (props) => {

    const params = useParams()
    const navigate = useNavigate()

    const title = params.id ? <div className="label-go_back" onClick={()=>navigate(-1)}><SvgSelector id='yellow-arrow-icon'/>All authentications</div> : params.page === 'completed' ? 'All authentications' : params.page === 'in-progress' ? 'All authentications' : params.page === 'all' && 'Photo requqests'

    useEffect(()=>{

    },[params.page])

    return (
        <>
            <div className="header-container">
                <div className="header-wrapper">
                    <Navigation hrefs={[{ label: 'Luxury store' }, { label: 'Authentications' }]} />
                    <label htmlFor="dashboard-open" className="hamburger"><SvgSelector id='bell' /></label>
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