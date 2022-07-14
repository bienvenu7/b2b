import './AuthenticationRequest.scss'
import Select from 'react-select'
import logo from '../../common/images/logo-for-mobile.png'
import SvgSelector from '../../common/icons/SvgSelector'

const AuthenticationRequest = () => {
    return (
        <>
            <div className="auth_request__wrapper">
                <div className="auth_request__nav">
                    <div className='auth_request__nav-bar'>navig</div>
                    <div className='auth_request__nav-bell'><SvgSelector id='bell'/></div>
                    </div>
                <div className="auth_request__container">
                    <div className="auth_request__logo">
                        <img src={logo} className='auth_request__logo-image' />
                    </div>
                    <div className="auth_request__form">
                        <div className="auth_request__form-wrapper">

                            <div className='auth_request__form-container first'>

                                <div className='auth_request__form-container-wrapper first'>
                                    <div className='auth_request__form-heading'>Authentication request</div>
                                    <div className='auth_request__form__elem'>
                                        <div className='auth_request__form__elem-label'>Choose the category</div>
                                        <Select classNamePrefix="custom-select" placeholder='Please select the category' />
                                    </div>
                                    <div className='auth_request__form-elem'>
                                        <div className='auth_request__form__elem-label'>Choose the brand</div>
                                        <Select classNamePrefix='custom-select' placeholder='Please select the brand' />
                                    </div>
                                    <div className='auth_request__form__elem'>
                                        <div className='auth_request__form__elem-label'>Include certificate</div>
                                    </div>
                                    <div className='auth_request__form__elem'>
                                        <div className='auth_request__form__radio-group'>
                                            <div className='auth_request__form__radio-button'>Upload logo</div>
                                            <div className='auth_request__form__radio-button'>Use existing one</div>
                                        </div>
                                    </div>
                                    <div className='auth_request__form__elem'>
                                        <div className='auth_request__form__elem-label'>Additional details</div>
                                        <div className='auth_request__form__elem-input-wrapper'>
                                            <input className='auth_request__form__elem-input' placeholder='Type model name here' />
                                            <input className='auth_request__form__elem-input' placeholder='Type supplier name here (optional)' />
                                        </div>
                                    </div>
                                </div>
                                <div className='auth_request__form-container-wrapper second'>
                                    Your Authentication balance
                                </div>
                            </div>
                            <div className='auth_request__form-container second'>
                                <div className='auth_request__form__elem-label'>Upload photos</div>
                                <div className='auth_request__form-desc'>Necessary fields are outlined, please fill them up if details are available</div>
                            </div>
                        </div>
                        <div className="auth_request__form__footer">
                            <div className='auth_request__form__footer-wrapper'>
                                <div className='auth_request__form__footer__info'>
                                    <div className='auth_request__form__footer__info__h1'>Authentication summary</div>
                                    <div className='auth_request__form__footer__info__h2'>
                                        <div className='auth_request__form__footer__info__h2-label'>Authentication requests</div>
                                        <div className='auth_request__form__footer__info__h2-value'>1</div>
                                    </div>
                                    <div className='auth_request__form__footer__info__h2'>
                                        <div className='auth_request__form__footer__info__h2-label'>Answer time</div>
                                        <div className='auth_request__form__footer__info__h2-value'>24 hours</div>
                                    </div>
                                </div>
                                <div className='auth_request__form__footer__button-wrapper'>
                                    
                                    <div className='auth_request__form__footer__button-elem'>Submit</div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthenticationRequest