import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import './Auth.scss'
import SignUp from './Signup/Signup'
import SignIn from './Signin/Signin'
import SvgSelector from '../../common/icons/SvgSelector'
import logo from '../../common/icons/logo.png'
import mobileLogo from '../../common/images/logo-for-mobile.png'
import ForgotPassword from './ForgotPassword/ForgotPassword'
import ResetPassword from './ResetPassword/ResetPassword'
import { useSelector } from 'react-redux'
import { getIsAuth } from '../../redux/selectors/auth-selectors'
import { useEffect } from 'react'
import background from '../../common/images/auth-background-left.png'

const Auth = (props) => {

    const isAuth = useSelector(getIsAuth)

    const navigate = useNavigate()

    useEffect(() => {
        isAuth && navigate('../main')
    }, [isAuth])

    let messageh1 = ''
    let messageh2 = ''

    const messagesSwitch = (param) => {
        switch (param) {
            case 'signup':
                messageh1 = 'Welcome to the LegitGrails Business Platform!'
                messageh2 = 'Sign up to access all the benefits.'
                break;
            case 'signin':
                messageh1 = 'Welcome back to the LegitGrails Business Platform!'
                messageh2 = 'Enter your email and password to continue.'
                break;
            case 'forgot':
                messageh1 = 'Forgot your password?'
                messageh2 = 'No worries, we’ll send you reset instructions.'
                break;
            case 'reset':
                messageh1 = 'Set new password!'
                messageh2 = 'Your password must be different to the previous one.'
                break;
            default:
                break;
        }
    }

    messagesSwitch(props.page)

    return (
        <div className="auth-container">
            <div className='auth__background'>
                <div className='auth__background-left' style={{ backgroundImage: `url(${background})` }}></div>
                <div className='auth__background-right'></div>
            </div>
            <div className='auth__main-container'>
                <div className='auth__menu'>
                    <div className='auth__menu-logo'>
                        <img className='logoImage' src={logo} />
                        <div className='title'>Business platform</div>
                    </div>
                    <ul className="auth__menu-buttons">
                        <li className='auth__menu-elem'>Home page</li>
                        <li className='auth__menu-elem'>Real vs Fake Guides</li>
                        <li className='auth__menu-elem'>Reviews</li>
                    </ul>
                </div>
                <div className='auth__content-wrapper'>
                    <div className='auth__content-promo'>promo</div>
                    <div className='auth__content-form'>
                        <div className='auth__content-form-headers'>
                            <img className='mobileLogo' src={mobileLogo} />
                            { }
                            <div className='message-h1'>{messageh1}</div>
                            <div className='message-h2'>{messageh2}</div>
                        </div>
                        {props.page == 'signin' && <SignIn />}
                        {props.page == 'signup' && <SignUp />}
                        {props.page == 'forgot' && <ForgotPassword />}
                        {props.page == 'reset' && <ResetPassword />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth