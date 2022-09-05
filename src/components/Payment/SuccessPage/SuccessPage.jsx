<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import logo from "../../../common/images/logo-for-mobile.png";
import Header from "../Header/Header";
=======
import { useNavigate } from 'react-router-dom'
import logo from '../../../common/images/logo-for-mobile.png'
import Navigation from '../../Navigation/Navigation'
import Header from '../../Header/Header'
import SvgSelector from '../../../common/icons/SvgSelector'
>>>>>>> b0332b9a35824a366f2d09db5ea538b52b4118f9

const SuccessPage = () => {
  const navigate = useNavigate();

<<<<<<< HEAD
  return (
    <div className="payment__success-wrapper">
      <Header />
      <div className="payment__success-container">
        <div className="payment__success__logo">
          <img alt="" className="logoImage" src={logo} />
=======
    const navigate = useNavigate()

    return (
        <div className="payment__success-wrapper">
            <div className="payment__success-container">
                <div className='close'><SvgSelector id='cross-icon'/></div>
                <div className='top'><Header/></div>
                <div className='payment__success__logo'><img alt='' className='logoImage' src={logo} /></div>
                <div className="payment__success__message-h1">it’S a success!</div>
                <div className="payment__success__message-h2">Your bundle authentication order was successful!</div>
                <div className="payment__success__message-h2 last-child">You can start verifying your items right now, or any other time you prefer,
                    just click on the <p id="target">New authentications</p> tab in the side menu.</div>
                <div className="payment__success__buttons-wrapper">
                    <div className="payment__success__buttons-elem" onClick={() => navigate('../authentication-request')}>Start authentication</div>
                    <div className="payment__success__buttons-elem">View all authentications</div>
                </div>
            </div>
>>>>>>> b0332b9a35824a366f2d09db5ea538b52b4118f9
        </div>
        <div className="payment__success__message-h1">it’S a success!</div>
        <div className="payment__success__message-h2">
          Your bundle authentication order was successful!
        </div>
        <div className="payment__success__message-h2 last-child">
          You can start verifying your items right now, or any other time you
          prefer, just click on the <p id="target">New authentications</p> tab
          in the side menu.
        </div>
        <div className="payment__success__buttons-wrapper">
          <div
            className="payment__success__buttons-elem"
            onClick={() => navigate("../authentication-request")}
          >
            Start authentication
          </div>
          <div className="payment__success__buttons-elem">
            View all authentications
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
