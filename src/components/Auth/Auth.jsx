import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './Auth.scss'
import SignUp from './Signup/Signup'
import SignIn from './Signin/Signin'
import SvgSelector from '../../common/icons/SvgSelector'
import logo from '../../common/icons/logo.png'
import mobileLogo from '../../common/images/logo-for-mobile.png'
import ForgotPassword from './ForgotPassword/ForgotPassword'
import ResetPassword from './ResetPassword/ResetPassword'

const Auth = (props) => {

    let messageh1 = ''
    let messageh2 = ''

    const switche = (param) => {
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

    switche(props.page)

    return (
        <div className="auth-container">
            <div className='auth__menu'>
                <div className='auth__menu-logo'>
                    <img className='logoImage' src={logo} />
                    <div className='title'>Business platform</div>
                </div>
                <ul className="auth__menu-buttons">
                    <li className='auth__menu-elem'>Home page<SvgSelector id='arrowsDown' /></li>
                    <li className='auth__menu-elem'>Real vs Fake Guides<SvgSelector id='arrowsDown' /></li>
                    <li className='auth__menu-elem'>Reviews<SvgSelector id='arrowsDown' /></li>
                </ul>
            </div>
            <div className='auth__content'>
                <div className='auth__content-left'>
                </div>
                <div className='auth__content-right'>
                    <div className='auth__content-right-wrapper'>
                        <div className='auth__content-right-messages'>
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