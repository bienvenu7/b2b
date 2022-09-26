import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SvgSelector from '../../../common/icons/SvgSelector'
import logo from '../../../common/images/601.svg'
import { getBalanceThunk } from '../../../redux/thunks/authRequest-thunk'
import Header from '../../Header/Header'

const SuccessPageOrder = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getBalanceThunk())
    })

    return(
        <div className="payment__success-wrapper">
            <div className="payment__success-container">
                <div className='close'><SvgSelector id='cross-icon'/></div>
                <div className='top'><Header/></div>
                <div className='payment__success__logo'><img className='logoImage' src={logo} alt=''/></div>
                <div className="payment__success__message-h1">it’S a success!</div>
                <div className="payment__success__message-h2">Your authentication request was successful!</div>
                <div className="payment__success__message-h2 last-child">Our team will start the verification process as soon as possible.<br/> 
                    For now, you can start another authentication or go to your dashboard.</div>
                <div className="payment__success__buttons-wrapper">
                    <div className="payment__success__buttons-elem" onClick={()=>navigate('../authentication-request')}>Start another authentication</div>
                    <div className="payment__success__buttons-elem" onClick={()=>navigate('../authentications/completed')}>Go to dashboard</div>
                </div>
            </div>
        </div>
    )
}

export default SuccessPageOrder