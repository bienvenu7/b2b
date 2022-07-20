import './AuthenticationRequest.scss'
import React, { useEffect } from 'react'
import Select from 'react-select'
import logo from '../../common/images/logo-for-mobile.png'
import SvgSelector from '../../common/icons/SvgSelector'
import AuthBalance from '../Payment/AuthBalance/AuthBalance'
import { useDispatch, useSelector } from 'react-redux'
import { getTypesOfProduct } from '../../redux/selectors/product-selectors'
import { useState } from 'react'
import { createOrderThunk, createProductThunk, getProductTypePropThunk, uploadPhotoForProductThunk } from '../../redux/thunks/authRequest-thunk'
import { takeBrands, takeOrder, takeAngles } from '../../redux/selectors/authRequest-selectors'
import Navigation from '../Navigation/Navigation'
import DropdownIndicator from '../../common/react-select/DropdownIndicator'
import MobileHeader from '../Mobile/MobileHeader/MobileHeader'

const AuthenticationRequest = () => {

    const dispatch = useDispatch()

    const productTypes = useSelector(getTypesOfProduct)
    const brands = useSelector(takeBrands)
    const order = useSelector(takeOrder)
    const angles = useSelector(takeAngles)

    const [productEditNumber, setProductEditNumber] = useState(0)

    const [certCheck, setCertCheck] = useState(false)

    const [modelTypeValue, setModelTypeValue] = useState('')
    const [supplierTypeValue, setSupplierTypeValue] = useState('')
    const [answerTime, setAnswerTime] = useState(12)
    const [productTypeValue, setProductTypeValue] = useState()
    const [brandValue, setBrandValue] = useState()

    //errors

    const [photoError, setPhotoError] = useState(false)


    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedBrand, setSelectedBrand] = useState('')

    const [photoFiles, setPhotoFiles] = useState([])

    const options = []

    const optionsBrands = []

    const handleChangeCategory = (e) => {
        dispatch(getProductTypePropThunk(e.value))
        setProductTypeValue(e.type)
        setSelectedCategory(e.key)
        setPhotoFiles([])
        console.log(e)
    }

    function handleChangeBrand(e) {
        setBrandValue(e.brand)
        setSelectedBrand(e.key)
    }

    useEffect(() => {
        photoFiles.length === 0 && angles.map((el, index) => photoFiles.push({ key: index, file: '', imagePreviewUrl: '', angleId: el.angle.id, necessity: el.necessity, error: false}))
    }, [angles])


    productTypes.map((el, index) => options.push({ key: index, value: el.id, type: el, label: el.publicName }))
    brands.map((el,index) => optionsBrands.push({ key: index, value: el.brand.id, brand: el.brand, label: el.brand.publicName }))

    function checkNecessity(){
        setPhotoFiles(photoFiles.map((el, index) => el.necessity == 1 && el.file !== '' ? {...el, error: false} : {...el, error: true}))
        !photoFiles.find(el=> el.error === true) && setPhotoError(false)
        console.log(photoFiles)
    }

    const handlePost = async () => {
        let onlineOrder = {}
        const photo = [{file: '', error: false},{file: 'fds', error: true},{file: 'fd', error: false}]
        if(photoFiles.find(el=> el.file == '' && el.necessity == 1)){
            setPhotoFiles(
                photoFiles.map((el,index)=> el.file == '' && el.necessity == 1 ? {...el, error: true} : el)
            )
            setPhotoError(true)
            return
        }
        if (!order) {
            const response = await dispatch(createOrderThunk())
            onlineOrder = response
        }
        const data = {
            order: !order ? onlineOrder : order,
            productType: productTypeValue,
            brand: brandValue,
            modelName: modelTypeValue,
            supplier: supplierTypeValue,
            certificateNeeded: certCheck,
            answerTime: answerTime,
        }
        //console.log(photoFiles[1].file)
        //setSelectedCategory('')
        const response = await dispatch(createProductThunk(data))
        photoFiles.map((el,index)=> el.file !== '' && dispatch(uploadPhotoForProductThunk({productId: response.data.id, file: el.file, angleId: el.angleId})))
        setModelTypeValue('') 
        setSupplierTypeValue('')
        setCertCheck(false)
        setProductEditNumber(productEditNumber+1)
    }

    

    function handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        let index = e.target.id.split('-')[1]

        reader.onloadend = () => {
            setPhotoFiles(
                photoFiles.map(item =>
                    item.key == index ? { ...item, file: file, imagePreviewUrl: reader.result, error: false } : item)
            )
        }
        reader.readAsDataURL(file)
        checkNecessity()
    }

    return (
        <>
        <MobileHeader/>
            <div className="auth_request__wrapper">
                <div className="auth_request__nav">
                    <div className='auth_request__nav-bar'>
                        <Navigation hrefs={[{label: 'Luxury store'},{label: 'New authentication'}]}/>
                        <div className='auth_request__nav-label'>Authentication request</div>
                    </div>
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
                                        <Select key={productEditNumber} components={{ DropdownIndicator }} options={options} classNamePrefix="custom-select" placeholder='Please select the category' onChange={handleChangeCategory} />
                                    </div>
                                    <div className='auth_request__form-elem'>
                                        <div className='auth_request__form__elem-label'>Choose the brand</div>
                                        <Select key={productEditNumber} components={{ DropdownIndicator }} options={optionsBrands} classNamePrefix='custom-select' placeholder='Please select the brand' onChange={handleChangeBrand} />
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
                                {photoError && <div className='auth_request__form-desc'>Required fields are outlined, please fill them up if details are available</div>}

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