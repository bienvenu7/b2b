import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './Auth.scss'
import SignUp from './Signup/Signup'
import SignIn from './Signin/Signin'
import { ReactComponent as Logo } from '../../common/icons/601.svg'

const Auth = (props) => {
    return (
        <div className="auth-container">
            <div className='auth__menu'>
                <div className='auth__menu__logo'>
                    <div className='image'><Logo/></div>
                    <div className='title'>Business platform</div>
                </div>
                <ul className="auth__menu__buttons">
                    <li className='auth__menu__elem'>Home page</li>
                    <li className='auth__menu__elem'>Real vs Fake Guides</li>
                    <li className='auth__menu__elem'>Reviews</li>
                </ul>
            </div>
            <div className='form__wrapper'>
                {props.page == 'signin' && <SignIn />}
                {props.page == 'signup' && <SignUp />}
            </div>
        </div>
    )
}

export default Auth