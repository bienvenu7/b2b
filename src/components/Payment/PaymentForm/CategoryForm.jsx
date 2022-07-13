import { Formik, Field, Form } from "formik"
import React, { useState, useEffect } from "react"
import * as NumericInput from 'react-numeric-input'
import { useDispatch, useSelector } from "react-redux"
import { addCategory, pushTotal, setCategoryError, setPrice } from "../../../redux/reducers/payment-reducer"
import { getUserId } from "../../../redux/selectors/auth-selectors"
import { getTypesOfProduct } from "../../../redux/selectors/product-selectors"
import Select from 'react-select'
import DropdownIndicator from "../../../common/react-select/DropdownIndicator"
import { getPriceThunk } from "../../../redux/thunks/payment-thunk"
import { getCartTotal, getCategoryError, getPrice, getUserTariffPackages } from "../../../redux/selectors/payment-selectors"

const CategoryForm = (props) => {

    const [volume, setVolume] = useState(1)
    const [errorsForAnswerTime, setErrorForAnswerTime] = useState(null)

    const dispatch = useDispatch()
    const userId = useSelector(getUserId)
    const productTypes = useSelector(getTypesOfProduct)
    const total = useSelector(getCartTotal)
    const cart = useSelector(getUserTariffPackages)
    const categoryError = useSelector(getCategoryError)
    const cost = useSelector(getPrice)


    const toDoll = (num) => {
        num = num
    }

    const options = [
        { value: { name: 'bags', types: { single: productTypes[4] } }, label: "Bags" },
        { value: { name: 'wallets', types: { single: productTypes[5] } }, label: "Wallets" },
        { value: { name: 'hypeShoes', types: { sneakers: productTypes[0], other: productTypes[2] } }, label: 'Hype shoes' },
        { value: { name: 'luxuryShoes', types: { sneakers: productTypes[1], other: productTypes[3] } }, label: 'Luxury shoes' },
        { value: { name: 'jewellery', types: { single: productTypes[7] } }, label: 'Jewellery' },
        { value: { name: 'watches', types: { single: productTypes[8] } }, label: 'Watches' },
    ]

    const [selectedValue, setSelectedValue] = useState(3);

    const handleChange = e => {
        setSelectedValue(e.value);
        dispatch(setCategoryError(null))
    }

    const priceCheck = (formik) => {
        console.log({sel: selectedValue, hours: formik.values.hours, type: formik.values.typeOfShoes})
        
        let id = ''
            if (formik.values.typeOfShoes == 'sneakers') {
                id = selectedValue.types.sneakers.id
            } else if (formik.values.typeOfShoes == 'other') {
                id = selectedValue.types.other.id
            } else if (formik.values.typeOfShoes == '') {
                id = selectedValue.types.single.id
            }

        //console.log(getId(selectedValue, formik))
        let data = {
            id: id,
            volume: volume,
            answerTime: formik.values.hours
        }
        if (selectedValue !== 3 && formik.values.hours !== '0') {
            dispatch(getPriceThunk(data))
            
        }
        data = {}
    }


    //temp info
    //const cost = 2

    //if (selectedValue !=3 && )

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
        let type = selectedValue != 3 && selectedValue.types.single
        if (selectedValue.name == 'hypeShoes') {
            formik.values.typeOfShoes == 'sneakers' ? type = selectedValue.types.sneakers : type = selectedValue.types.other
        } else if (selectedValue.name == 'luxuryShoes') {
            formik.values.typeOfShoes == 'sneakers' ? type = selectedValue.types.sneakers : type = selectedValue.types.other
        }
        const data = { productType: type, answerTime: Number(formik.values.hours), volume: volume, userId: userId, isGift: false }
        //formik.values.hours != '12' || '24' ? setErrorForAnswerTime('Please choose') : dispatch(addCategory(data)) 
        formik.values.hours != '0' && dispatch(addCategory(data)) && dispatch(pushTotal(cost))
        formik.values.hours = '0'
        formik.values.typeOfShoes = ''
        setSelectedValue(3)
        setVolume(1)
        dispatch(setPrice(null))
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
            {props => (<Form className="payment__form" onSubmit={props.handleSubmit} onChange={props.change}>
                <div className="payment__form-block-container first">
                    <label htmlFor="category" className="payment__form-label">Choose the category</label>
                    <Select components={{ DropdownIndicator }} classNamePrefix='custom-select' placeholder='Please select the category' options={options} onChange={handleChange} />

                    {(selectedValue.name == 'hypeShoes' || selectedValue.name == "luxuryShoes") && <div className="payment__form-elem shoes-vars">
                        <label htmlFor="types" className="payment__form-label">Choose the category</label>

                        <div className="payment__form-radio_btn_types-container">
                            <div className="payment__form-radio_btn_types" id="types">
                                <Field type="radio" name="typeOfShoes" value="sneakers" id="sneakers" className='custom-radio' />
                                <label htmlFor="sneakers" />
                                <div className="payment__form-radio_btn_types-label">Sneakers</div>
                            </div>
                            <div className="payment__form-radio_btn_types">
                                <Field type="radio" name="typeOfShoes" value="other" id="other" className='custom-radio' />
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
                            <label htmlFor="12h">12 hours</label>
                        </div>
                        <div className="payment__form-radio_btn">
                            <Field type="radio" name="hours" value="24" id="24h" />
                            <label htmlFor="24h">24 hours</label>
                        </div>
                        {errorsForAnswerTime != null && <div className="payment__form-errors">{errorsForAnswerTime}</div>}
                    </div>
                    <label htmlFor="volume" className="payment__form-label">Choose the volume of authentications</label>
                    <div className="payment__form-elem number-wrapper">
                        <NumericInput onChange={setVolume} className="payment__form-elem number" id="volume" name="volume" min={1} max={50} value={volume} onBlur={() => { priceCheck(props) }} />
                        {!cost != null && <div className="payment__form-elem info">${cost.package/100}&nbsp;per authentication</div>}
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