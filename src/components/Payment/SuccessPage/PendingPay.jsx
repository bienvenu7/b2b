import React from 'react'
import SvgSelector from '../../../common/icons/SvgSelector'
import Header from '../../Header/Header'


import logo from '../../../common/images/logo-for-mobile.png'
import { useNavigate } from 'react-router-dom'

const PendingPay = () => {

    const navigate = useNavigate()

  return (
    <div className="payment__success-wrapper">
            <div className="payment__success-container">
                <div className='close'><SvgSelector id='cross-icon'/></div>
                <div className='top'><Header/></div>
                <div className='payment__success__logo'><img alt='' className='logoImage' src={logo} /></div>
                <div className="payment__success__message-h1">payment pending</div>
                <div className="payment__success__message-h2">Please finalise your payment with your chosen gateway!</div>
                {/* <div className="payment__success__message-h2 last-child">нужен текст получше</div> */}
                {/* <div className="payment__success__buttons-wrapper">
                    <div className="payment__success__buttons-elem" onClick={() => navigate('../authentication-request')}>Start authentication</div>
                    <div className="payment__success__buttons-elem" onClick={() => navigate('../authentications/completed')}>View all authentications</div>
                </div> */}
            </div>
    </div>
  )
}

export default PendingPay