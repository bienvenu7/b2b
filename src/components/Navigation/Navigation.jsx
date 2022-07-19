import SvgSelector from "../../common/icons/SvgSelector"
import './Navigation.scss'

const Navigation = (props) =>{

    return(
        <>
        <div className="header__nav">
                    <div className='header__nav__home'><SvgSelector id="home" /></div>
                    {props.hrefs && props.hrefs.map((el,index)=> <div className='header__nav__elem'>&nbsp;/&nbsp;{el.label}</div>)}
                </div>
        </>
    )
}

export default Navigation