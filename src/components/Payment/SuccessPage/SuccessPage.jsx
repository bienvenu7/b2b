import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../../../common/images/logo-for-mobile.png'

const SuccessPage = () => {

    return(
        <div className="payment__success-wrapper">
            <div className="payment__success-container">
                <div className='payment__success__logo'><img className='logoImage' src={logo} /></div>
                <div className="payment__success__message-h1">it’S a success!</div>
                <div className="payment__success__message-h2">Your bundle authentication order was successful!</div>
                <div className="payment__success__message-h2 last-child">You can start verifying your items right now, or any other time you prefer, 
                just click on the <p id="target">New Authentications</p> tab in the side menu.</div>
                <div className="payment__success__buttons-wrapper">
                    <a href='' className="payment__success__buttons-elem">Start authentication</a>
                    <div className="payment__success__buttons-elem">View all authentications</div>
                </div>
            </div>
        </div>
    )
}

export default SuccessPage