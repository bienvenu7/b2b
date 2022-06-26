import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './Auth.scss'
import SignUp from './Signup/Signup'
import SignIn from './Signin/Signin'
import SvgSelector from '../../common/icons/SvgSelector'
import logo from '../../common/icons/logo.png'

const Auth = (props) => {
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
                            <div className='message-h1'>Welcome to the LegitGrails Business Platform!</div>
                            <div className='message-h2'>Sign up to access all the benefits.</div>
                        </div>
                            {props.page == 'signin' && <SignIn />}
                            {props.page == 'signup' && <SignUp />}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Auth