import React from 'react'

import SvgSelector from '../../../common/icons/SvgSelector'
import Header from '../../Header/Header'


import logo from '../../../common/images/601.svg'
import { useNavigate } from 'react-router-dom'

const Unsuccess = () => {

    const navigate = useNavigate()

  return (
    <div className="payment__success-wrapper">
            <div className="payment__success-container">
                <div className='close'><SvgSelector id='cross-icon'/></div>
                <div className='top'><Header/></div>
                <div className='payment__success__logo'><img alt='' className='logoImage' src={logo} /></div>
                <div className="payment__success__message-h1">Payment unsuccessful!</div>
                <div className="payment__success__message-h2">Unfortunately your payment did not go through, please try again</div>
                {/* <div className="payment__success__message-h2 last-child">нужен текст получше</div> */}
                <div className="payment__success__buttons-wrapper">
                    <div className="payment__success__buttons-elem" onClick={() => navigate('../payment')}>Try Again</div>
                    <div className="payment__success__buttons-elem" onClick={() => navigate('../dashboard')}>Go to Dashboard</div>
                </div>
            </div>
    </div>
  )
}

export default Unsuccess