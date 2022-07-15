import './AuthenticationRequest.scss'
import React from 'react'
import Select from 'react-select'
import logo from '../../common/images/logo-for-mobile.png'
import SvgSelector from '../../common/icons/SvgSelector'
import AuthBalance from '../Payment/AuthBalance/AuthBalance'
import PaymentHeader from '../Payment/PaymentHeader/PaymentHeader'
import { useDispatch, useSelector } from 'react-redux'
import { getTypesOfProduct } from '../../redux/selectors/product-selectors'
import { useEffect, useMemo, useState } from 'react'
import { createOrderThunk, createProductThunk, getBrandsThunk } from '../../redux/thunks/authRequest-thunk'
import { takeBrands, takeOrder } from '../../redux/selectors/authRequest-selectors'

const AuthenticationRequest = () => {

    const dispatch = useDispatch()

    const productTypes = useSelector(getTypesOfProduct)
    const brands = useSelector(takeBrands)
    const order = useSelector(takeOrder)

    const [certCheck, setCertCheck] = useState(false)
    
    const [modelTypeValue, setModelTypeValue] = useState('')
    const [supplierTypeValue, setSupplierTypeValue] = useState('')
    const [answerTime, setAnswerTime] = useState(12)
    const [productTypeValue, setProductTypeValue] = useState()
    const [brandValue, setBrandValue] = useState()

    const options = []

    const optionsBrands = []

    const handleChangeCategory = (e) =>{
        dispatch(getBrandsThunk(e.value))
        setProductTypeValue(e.type)
    }
    
    function handleChangeBrand(e){
        setBrandValue(e.brand)
    }

    
    order == null && dispatch(createOrderThunk())
    
    productTypes.map(el => options.push({ value: el.id, type: el, label: el.publicName }))
    brands.map(el=> optionsBrands.push({value: el.brand.id, brand: el.brand, label: el.brand.publicName }))

    function handlePost(){
        const data = {
            order: order,
            productType: productTypeValue,
            brand: brandValue,
            modelName: modelTypeValue,
            supplier: supplierTypeValue,
            certificateNeeded: certCheck,
            answerTime: answerTime,
        }
        dispatch(createProductThunk(data))
    }
    

    return (
        <>
            <div className="auth_request__wrapper">

                <div className="auth_request__nav">
                    <div className='auth_request__nav-bar'>navig</div>
                    <div className='auth_request__nav-bell'><SvgSelector id='bell' /></div>
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
                                        <Select options={options} classNamePrefix="custom-select" placeholder='Please select the category' onChange={handleChangeCategory}/>
                                    </div>
                                    <div className='auth_request__form-elem'>
                                        <div className='auth_request__form__elem-label'>Choose the brand</div>
                                        <Select options={optionsBrands} classNamePrefix='custom-select' placeholder='Please select the brand' onChange={handleChangeBrand}/>
                                    </div>
                                    <div className='auth_request__form__elem'>
                                        {/*<div className='auth_request__form__elem-label'>Include certificate</div>*/}
                                        <input type="checkbox" className="custom-checkbox" id="certificate" name="certificate" checked={certCheck} onChange={() => setCertCheck(!certCheck)} />
                                        <label htmlFor="certificate" id="forCert">Include certificate</label>
                                    </div>
                                    {certCheck &&<div className='auth_request__form__elem'>
                                        <div className='auth_request__form__radio-group'>
                                            <div className='auth_request__form__radio-button'>Upload logo</div>
                                            <div className='auth_request__form__radio-button'>Use existing one</div>
                                        </div>
                                    </div>}
                                    <div className='auth_request__form__elem'>
                                        <div className='auth_request__form__elem-label'>Additional details</div>
                                        <div className='auth_request__form__elem-input-wrapper'>
                                            <input className='auth_request__form__elem-input' placeholder='Type model name here' value={modelTypeValue} onChange={(e)=>setModelTypeValue(e.target.value)}/>
                                            <input className='auth_request__form__elem-input' placeholder='Type supplier name here (optional)' value={supplierTypeValue} onChange={(e)=>setSupplierTypeValue(e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className='auth_request__form-container-wrapper second'>
                                    <AuthBalance mt={0} />
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

                                    <div className='auth_request__form__footer__button-elem' onClick={handlePost}>Submit</div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo(AuthenticationRequest)