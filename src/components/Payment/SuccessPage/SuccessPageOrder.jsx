import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../../common/images/logo-for-mobile.png'

const SuccessPageOrder = () => {

    const navigate = useNavigate()

    return(
        <div className="payment__success-wrapper">
            <div className="payment__success-container">
                <div className='payment__success__logo'><img className='logoImage' src={logo} /></div>
                <div className="payment__success__message-h1">it’S a success!</div>
                <div className="payment__success__message-h2">Your authentication order was successful!</div>
                <div className="payment__success__message-h2 last-child">Our team will start the verification process as soon as possible. 
For now, you can start another authentication or go to your dashboard.</div>
                <div className="payment__success__buttons-wrapper">
                    <div className="payment__success__buttons-elem" onClick={()=>navigate('../authentication-request')}>Start another authentication</div>
                    <div className="payment__success__buttons-elem">Go to dashboard</div>
                </div>
            </div>
        </div>
    )
}

export default SuccessPageOrder