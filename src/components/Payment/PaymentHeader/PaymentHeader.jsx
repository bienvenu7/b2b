import '../Payment.scss'
import logo from '../../../common/images/logo-for-mobile.png'

const PaymentHeader = () =>{
    return(
        <div className="payment__header">
            <div className="payment__header__tree">tree</div>
            <div className="payment__header__logo-container">
                <img className='payment__header__logo-image' src={logo} />
                <div className="payment__header__logo-pageName">Authentication - Payment</div>
            </div>
        </div>
    )
}

export default PaymentHeader