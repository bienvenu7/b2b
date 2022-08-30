import '../Payment.scss'
import logo from '../../../common/images/logo-for-mobile.png'
import SvgSelector from '../../../common/icons/SvgSelector'
import { useNavigate } from 'react-router-dom'

const PaymentHeader = () => {
    
    const navigate = useNavigate()
    
    return (
        <>
            {/*<div className="payment__header__mobile">
                <div className='payment__header__mobile-pageName'>
                    Authentication bundle</div>
                <div className='hamburger-menu'>
                    <input id="menu__toggle" type="checkbox" />
                    <label className="menu__btn" htmlFor="menu__toggle">
                        <span></span>
                    </label>
                </div>
    </div>*/}



            <div className="payment__header">
                <div className="payment__header__nav">
                    <div className='payment__header__nav__home' onClick={()=>navigate('../main')}><SvgSelector id="home" /></div>
                    <div className='payment__header__nav__elem'>&nbsp;/ Luxury store /&nbsp;</div>
                    <div className='payment__header__nav__elem'>Authentification Bundle</div>
                </div>
                <div className="payment__header__logo-container">
                    <img className='payment__header__logo-image' src={logo} alt=''/>
                    <div className="payment__header__logo-pageName">Authentification - Payment</div>
                </div>
            </div>
        </>
    )
}

export default PaymentHeader