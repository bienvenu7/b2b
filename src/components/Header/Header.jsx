import { useParams } from "react-router-dom"
import SvgSelector from "../../common/icons/SvgSelector"
import Navigation from "../Navigation/Navigation"
import './Header.scss'

const Header = (props) => {

    const params = useParams()
    console.log(params)

    return (
        <>
            <div className="header-container">
                <div className="header-wrapper">
                    <Navigation hrefs={[{ label: 'Luxury store' }, { label: 'Authentications' }]} />
                    <SvgSelector id='bell' />
                </div>
            </div>
        </>
    )

}

export default Header