import { Formik, Field, Form } from "formik"
import React, { useState, useEffect } from "react"
import * as NumericInput from 'react-numeric-input'
import { useDispatch, useSelector } from "react-redux"
import { addCategory, initPackage, pushTotal, removePreviewPackage, setCategoryError, setPrice, updateCurrentPackage, updateHoursPackage, updateTypePackage, updateVolumePackage } from "../../../redux/reducers/payment-reducer"
import { getUserId } from "../../../redux/selectors/auth-selectors"
import { getTypesOfProduct } from "../../../redux/selectors/product-selectors"
import Select from 'react-select'
import DropdownIndicator from "../../../common/react-select/DropdownIndicator"
import { getPriceThunk } from "../../../redux/thunks/payment-thunk"
import { getCartTotal, getCategoryError, getPrice, getUserTariffPackages } from "../../../redux/selectors/payment-selectors"

const CategoryForm = (props) => {

    const [volume, setVolume] = useState(1)
    const [errorsForAnswerTime, setErrorForAnswerTime] = useState(null)
    const [packageEditNumber, setPackageEdit] = useState(0)

    const dispatch = useDispatch()
    const userId = useSelector(getUserId)
    const productTypes = useSelector(getTypesOfProduct)
    const total = useSelector(getCartTotal)
    const cart = useSelector(getUserTariffPackages)
    const categoryError = useSelector(getCategoryError)
    const cost = useSelector(getPrice)

    const cartTotal = props.cartTotal




    const options = [
        { value: { name: 'bags', types: { single: productTypes[4] } }, label: "Bags" },
        { value: { name: 'wallets', types: { single: productTypes[5] } }, label: "Wallets" },
        { value: { name: 'hypeShoes', types: { sneakers: productTypes[0], other: productTypes[2] } }, label: 'Hype shoes' },
        { value: { name: 'luxuryShoes', types: { sneakers: productTypes[1], other: productTypes[3] } }, label: 'Luxury shoes' },
        { value: { name: 'jewellery', types: { single: productTypes[7] } }, label: 'Jewellery' },
        { value: { name: 'watches', types: { single: productTypes[8] } }, label: 'Watches' },
    ]

    const [selectedValue, setSelectedValue] = useState(3);

    const handleChange = (e, formik) => {
        setSelectedValue(e.value);
        dispatch(setCategoryError(null))
        updateType(e.value, formik)
    }

    const handleChangeForNumeric = (e, formik) => {
        setVolume(e)
        dispatch(updateVolumePackage({index: packageEditNumber, volume: e}))
    }

    const updateType = (e, typeOfShoes) => {
        if (e != null){
            let type = e != 3 && e.types.single
            if (e.name == 'hypeShoes') {
                typeOfShoes == 'sneakers' ? type = e.types.sneakers : type = e.types.other
            } else if (e.name == 'luxuryShoes') {
                typeOfShoes == 'sneakers' ? type = e.types.sneakers : type = e.types.other
            }
            e.value != 3 && dispatch(updateTypePackage({index: packageEditNumber, type: type}))
            const data = {productType: type, volume: volume, answerTime: 12}
            dispatch(getPriceThunk(data))
        }
        
    }

    const updateHours = (value, data) =>{
        dispatch(updateHoursPackage({index: packageEditNumber,hours:value}))
        props.cartTotal(data)
    }

    cart.length < 1 && dispatch(initPackage(userId))

    useEffect(() => {

    }, [props.but])

    useEffect(() => {
        const data = {
            userTariffPackages: cart
        }
        cart.length > 0 && props.cartTotal(data)
    }, [cart])

    let but = props.but

    const handlePost = (formik) => {
        /*let type = selectedValue != 3 && selectedValue.types.single
        if (selectedValue.name == 'hypeShoes') {
            formik.values.typeOfShoes == 'sneakers' ? type = selectedValue.types.sneakers : type = selectedValue.types.other
        } else if (selectedValue.name == 'luxuryShoes') {
            formik.values.typeOfShoes == 'sneakers' ? type = selectedValue.types.sneakers : type = selectedValue.types.other
        }
        const data = { productType: type, answerTime: Number(formik.values.hours), volume: volume, userId: userId, isGift: false }
        //formik.values.hours != '12' || '24' ? setErrorForAnswerTime('Please choose') : dispatch(addCategory(data)) 
        formik.values.hours != '0' && selectedValue != 3 && dispatch(addCategory({index: 0, package: data})) && dispatch(pushTotal(cost))
        //&& dispatch(removePreviewPackage(cart.length-1))
        formik.values.hours = '0'
        formik.values.typeOfShoes = ''
        setSelectedValue(3)
        setVolume(1)
        dispatch(setPrice(null))*/
    }

    return (<>
        <Formik
            initialValues={{ hours: '0', typeOfShoes: '' }}
            validate={values => {

            }}
            change={() => {
            }}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
            }}
        >
            {(props) => (<Form className="payment__form" onSubmit={props.handleSubmit} onChange={props.change}>
                <div className="payment__form-block-container first">
                    <label htmlFor="category" className="payment__form-label">Choose the category</label>
                    <Select components={{ DropdownIndicator }} classNamePrefix='custom-select' placeholder='Please select the category' options={options} onChange={(e)=>handleChange(e, props.values.typeOfShoes)} />

                    {(selectedValue.name == 'hypeShoes' || selectedValue.name == "luxuryShoes") && <div className="payment__form-elem shoes-vars">
                        <label htmlFor="types" className="payment__form-label">Choose the category</label>

                        <div className="payment__form-radio_btn_types-container">
                            <div className="payment__form-radio_btn_types" id="types">
                                <Field type="radio" name="typeOfShoes" value="sneakers" id="sneakers" className='custom-radio' onChange={(e)=>{updateType(selectedValue, e.target.value)}}/>
                                <label htmlFor="sneakers" />
                                <div className="payment__form-radio_btn_types-label">Sneakers</div>
                            </div>
                            <div className="payment__form-radio_btn_types">
                                <Field type="radio" name="typeOfShoes" value="other" id="other" className='custom-radio' onChange={(e)=>{updateType(selectedValue, e.target.value)}}/>
                                <label htmlFor="other" />
                                <div className="payment__form-radio_btn_types-label">Other</div>
                            </div>
                        </div>
                    </div>}
                    {categoryError != null && <div className="payment__form-error">{categoryError}</div>}
                    <label htmlFor="hours" className="payment__form-label">Choose answer time</label>
                    <div className="payment__form-elem hours">
                        <div className="payment__form-radio_btn">
                            <Field type="radio" name="hours" value="12" id="12h" />
                            <label htmlFor="12h" onClick={()=>updateHours(12, cart)}>12 hours</label>
                        </div>
                        <div className="payment__form-radio_btn">
                            <Field type="radio" name="hours" value="24" id="24h"/>
                            <label htmlFor="24h" onClick={()=>updateHours(24, cart)} value="24">24 hours</label>
                        </div>
                        {errorsForAnswerTime != null && <div className="payment__form-errors">{errorsForAnswerTime}</div>}
                    </div>
                    <label htmlFor="volume" className="payment__form-label">Choose the volume of authentications</label>
                    <div className="payment__form-elem number-wrapper">
                        <NumericInput onChange={(e) => handleChangeForNumeric(e, props)} className="payment__form-elem number" id="volume" name="volume" min={1} max={50} value={volume}/>
                        {!cost != null && <div className="payment__form-elem info">${cost.package / 100}&nbsp;per authentication</div>}
                    </div>
                    <div className="payment__form-href" onClick={() => { console.log('navto') }}>How does our pricing work?</div>
                </div>
                {but && handlePost(props)}
            </Form>)}
        </Formik>
    </>
    )
}

export default React.memo(CategoryForm)