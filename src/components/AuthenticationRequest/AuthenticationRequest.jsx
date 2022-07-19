import './AuthenticationRequest.scss'
import React, { useEffect } from 'react'
import Select from 'react-select'
import logo from '../../common/images/logo-for-mobile.png'
import SvgSelector from '../../common/icons/SvgSelector'
import AuthBalance from '../Payment/AuthBalance/AuthBalance'
import { useDispatch, useSelector } from 'react-redux'
import { getTypesOfProduct } from '../../redux/selectors/product-selectors'
import { useState } from 'react'
import { createOrderThunk, createProductThunk, getProductTypePropThunk } from '../../redux/thunks/authRequest-thunk'
import { takeBrands, takeOrder, takeAngles } from '../../redux/selectors/authRequest-selectors'

const AuthenticationRequest = () => {

    const dispatch = useDispatch()

    const productTypes = useSelector(getTypesOfProduct)
    const brands = useSelector(takeBrands)
    const order = useSelector(takeOrder)
    const angles = useSelector(takeAngles)

    const [certCheck, setCertCheck] = useState(false)

    const [modelTypeValue, setModelTypeValue] = useState('')
    const [supplierTypeValue, setSupplierTypeValue] = useState('')
    const [answerTime, setAnswerTime] = useState(12)
    const [productTypeValue, setProductTypeValue] = useState()
    const [brandValue, setBrandValue] = useState()

    const [photoFiles, setPhotoFiles] = useState([])

    const options = []

    const optionsBrands = []

    const handleChangeCategory = (e) => {
        dispatch(getProductTypePropThunk(e.value))
        setProductTypeValue(e.type)
        setPhotoFiles([])
    }

    function handleChangeBrand(e) {
        setBrandValue(e.brand)
    }

    useEffect(() => {
        photoFiles.length === 0 && angles.map((el, index) => photoFiles.push({ key: index, file: '', imagePreviewUrl: '', }))
    }, [angles])


    productTypes.map(el => options.push({ value: el.id, type: el, label: el.publicName }))
    brands.map(el => optionsBrands.push({ value: el.brand.id, brand: el.brand, label: el.brand.publicName }))

    function handlePost() {
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

    function handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        let index = e.target.id.split('-')[1]

        reader.onloadend = () => {
            setPhotoFiles(
                photoFiles.map(item =>
                    item.key == index ? { ...item, file: file, imagePreviewUrl: reader.result } : item)
            )
        }
        reader.readAsDataURL(file)
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
                                        <Select options={options} classNamePrefix="custom-select" placeholder='Please select the category' onChange={handleChangeCategory} />
                                    </div>
                                    <div className='auth_request__form-elem'>
                                        <div className='auth_request__form__elem-label'>Choose the brand</div>
                                        <Select options={optionsBrands} classNamePrefix='custom-select' placeholder='Please select the brand' onChange={handleChangeBrand} />
                                    </div>
                                    <div className='auth_request__form__elem'>
                                        <input type="checkbox" className="custom-checkbox" id="certificate" name="certificate" checked={certCheck} onChange={() => setCertCheck(!certCheck)} />
                                        <label htmlFor="certificate" id="forCert">Include certificate</label>
                                    </div>
                                    {certCheck && <div className='auth_request__form__elem'>
                                        <div className='auth_request__form__radio-group'>
                                            <div className='auth_request__form__radio-button'>Upload logo</div>
                                            <div className='auth_request__form__radio-button'>Use existing one</div>
                                        </div>
                                    </div>}
                                    <div className='auth_request__form__elem'>
                                        <div className='auth_request__form__elem-label'>Additional details</div>
                                        <div className='auth_request__form__elem-input-wrapper'>
                                            <input className='auth_request__form__elem-input' placeholder='Type model name here' value={modelTypeValue} onChange={(e) => setModelTypeValue(e.target.value)} />
                                            <input className='auth_request__form__elem-input' placeholder='Type supplier name here (optional)' value={supplierTypeValue} onChange={(e) => setSupplierTypeValue(e.target.value)} />
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

                                <div className='auth_request__form__photo-container'>
                                    {angles.map((el, index) =>
                                        <div key={index} className={`auth_request__form__photo-elem ${index}`}>
                                            {photoFiles.length > 0 && photoFiles[index].imagePreviewUrl !== '' ?
                                                <label htmlFor={`photo-${index}`} className='auth_request__form__photo-previewImg' style={{ background: `url(${photoFiles[index].imagePreviewUrl})` }}>
                                                    <input className={`auth_request__form__photo-fileInput ${index}`} type="file" onChange={handleImageChange} id={`photo-${index}`} />
                                                </label>
                                                : <label htmlFor={`photo-${index}`} className={el.necessity == 1 ? 'auth_request__form__photo-photolabel required' : 'auth_request__form__photo-photolabel'}>
                                                    <input className={`auth_request__form__photo-fileInput ${index}`} type="file" onChange={handleImageChange} id={`photo-${index}`} />
                                                </label>}
                                            <div className='auth_request__form__photo-name'>{el.angle.publicName}</div>
                                        </div>)}
                                </div>
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
                                        <div className='auth_request__form__footer__info__h2-value'>12 hours</div>
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