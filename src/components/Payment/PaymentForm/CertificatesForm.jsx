import { useEffect, useState } from "react"
import { Formik, Form } from 'formik'
import * as NumericInput from "react-numeric-input"
import { useDispatch, useSelector } from "react-redux"
import { getUserId } from "../../../redux/selectors/auth-selectors"
import { getUserTariffPackages } from "../../../redux/selectors/payment-selectors"
import { postInvoiceThunk } from "../../../redux/thunks/payment-thunk"
import React from "react"
import Select from 'react-select'
import DropdownIndicator from "../../../common/react-select/DropdownIndicator"

const CertificatesForm = (props) => {

    const [volume, setVolume] = useState(50)

    const dispatch = useDispatch()

    const userId = useSelector(getUserId)
    const userTariffPackages = useSelector(getUserTariffPackages)

    let but = props.but

    /*const DropdownIndicator = props => {
        return (
          <components.DropdownIndicator {...props}>
            <SvgSelector id='downArrow' />
          </components.DropdownIndicator>
        );
      };*/


    //temp info

    const options = [
        { value: 'notneeded', label: 'Not needed' },
        { value: 'include', label: 'Include for each item' },
        { value: 'choose', label: 'Choose other amount' }
    ]

    const cost = 2

    const [selectedValue, setSelectedValue] = useState(3);

    // handle onChange event of the dropdown
    const handleChange = e => {
        setSelectedValue(e.value);
    }



    const handlePost = (formik) => {
        let vol = volume
        const data = {
            paymentSystem: "paypal", savePaymentMethod: false, useSavedPaymentMethod: false, successUrl: "https://example.com",
            cancelUrl: "https://example.com", userTariffPackages: userTariffPackages
        }
        if (selectedValue == 'include') {
            vol = 0
            userTariffPackages.map(e => vol += e.volume)
            data.userCertificatePackage = { userId: userId, volume: vol, isGift: false }

        } else if (selectedValue == 'choose') {
            data.userCertificatePackage = { userId: userId, volume: vol, isGift: false }
        }
        formik.values.certificates != '' && dispatch(postInvoiceThunk(data))
        formik.values.certificates = ''
        setVolume(50)
    }

    useEffect(() => {

    }, [props.but])

    return (
        <Formik
            initialValues={{}}
            validate={values => {

            }}
            onChange={() => {

            }}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
            }}
        >
            {props => (<Form className="payment__form" onChange={props.handleChange} onSubmit={props.handleSubmit}>
                <div className="payment__form-block-container second">
                    <label htmlFor="certificates" className="payment__form-label">Authenticity Certificates</label>
                    <Select components={{DropdownIndicator}} classNamePrefix='custom-select' placeholder='Please select option' options={options} onChange={handleChange} />
                    {selectedValue == 'choose' &&
                        <div className="payment__form-elem number-wrapper" id="cert_count">
                            <NumericInput onChange={setVolume} className="payment__form-elem number" id="count" name="certCount" min="1" max="50" value={volume} />
                            <div className="payment__form-elem info">${cost}&nbsp;per certificate</div></div>}

                    <div className="payment__form-elem upload">
                        <div className="payment__form-elem upload-btn">Upload logo</div>
                        <div className="payment__form-elem upload-info">This logo will be added to the certificates</div>
                    </div>
                </div>
                {but && handlePost(props)}
            </Form>)}
        </Formik>
    )
}

export default CertificatesForm