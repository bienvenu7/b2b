import '../Payment.scss'
import logo from '../../../common/images/logo-for-mobile.png'
import SvgSelector from '../../../common/icons/SvgSelector'

const PaymentHeader = () =>{
    return(
        <div className="payment__header">
            <div className="payment__header__nav">
                <div className='payment__header__nav__home'><SvgSelector id="home"/></div>
                <div className='payment__header__nav__elem'>&nbsp;/ Luxury store /&nbsp;</div>
                <div className='payment__header__nav__elem'>Authentication Bundle</div>
                </div>
            <div className="payment__header__logo-container">
                <img className='payment__header__logo-image' src={logo} />
                <div className="payment__header__logo-pageName">Authentication - Payment</div>
            </div>
        </div>
    )
}

export default PaymentHeader