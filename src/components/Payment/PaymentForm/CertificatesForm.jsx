import React, { useEffect, useState } from "react"
import { Formik, Form } from 'formik'
import * as NumericInput from "react-numeric-input"
import { useDispatch, useSelector } from "react-redux"
import { getUserId } from "../../../redux/selectors/auth-selectors"
import { getCategoryError, getCosts, getPrice, getUserTariffPackages, getUserCertificatePackage } from "../../../redux/selectors/payment-selectors"
import Select from 'react-select'
import DropdownIndicator from "../../../common/react-select/DropdownIndicator"
import { pushTotal, removePreviewPackage, setCategoryError, setCertificate, setTotalPackage } from "../../../redux/reducers/payment-reducer"
import { useNavigate } from "react-router-dom"

const CertificatesForm = (props) => {

  const [volume, setVolume] = useState(1)
  const [update, setUpdate] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userId = useSelector(getUserId)
  const userTariffPackages = useSelector(getUserTariffPackages)
  const categoryError = useSelector(getCategoryError)
  const cost = useSelector(getPrice)
  const costs = useSelector(getCosts)
  const certificate = useSelector(getUserCertificatePackage)
  const [initial, setInitial] = useState({ volume: null, userId: null })

  console.log(initial, "inicial")

  // const [sum, setSum]  = useState(0);
  //  useEffect(() => {
  //   userTariffPackages.filter(i => i.productType !== '' ).map(e => setSum( sum + e.volume))
  //  }, [])


  // console.log(sum)

  let but = props.but

  //temp info

  const options = [
    { value: 'notneeded', label: 'Not needed' },
    { value: 'include', label: 'Include for each item' },
    { value: 'choose', label: 'Choose other amount' }
  ]


  const [selectedValue, setSelectedValue] = useState(3);

  selectedValue === 'choose' && categoryError != null && dispatch(setCategoryError(null))

  // handle onChange event of the dropdown
  const handleChange = (event) => {
    console.log('hc')
    setSelectedValue(event.value);
    let data = {
      userTariffPackages: [],
      userCertificatePackage: null
    };
    if (event.value === "include") {
      data = {
        userTariffPackages: userTariffPackages,
        userCertificatePackage: {
          volume: 1,
          userId: userId,
        },
      };
      setInitial({volume: 1, userId: userId})
      dispatch(setCertificate(data.userCertificatePackage))
      console.log('hci',data)
      props.cartTotal(data);
    } else if (event.value === "notneeded") {
      data.userTariffPackages = userTariffPackages
      setInitial({volume: null, userId: null})
      dispatch(setCertificate(data.userCertificatePackage))
      console.log('hcn',data)
      props.cartTotal(data);
    } else if (event.value === "choose") {
      data.userCertificatePackage = {
        volume: volume,
        userId: userId,
      }
      const totalData =
        userTariffPackages &&
          userTariffPackages.length === 1 &&
          (userTariffPackages[0].productType === "" ||
            userTariffPackages[0].answerTime === "")
          ? data
          : { ...data, userTariffPackages: userTariffPackages };
      dispatch(setCertificate(data.userCertificatePackage))
      console.log('hcc',data)
      props.cartTotal(totalData);
      setInitial({volume: volume, userId: userId})
    }
    console.log('hcend')
  };

  const handleChangeForNumeric = (e) => {
    setVolume(e)
    let data = { 
      userTariffPackages,
      userCertificatePackage: {
        volume: e,
        userId: userId
      }
    }
    dispatch(setCertificate(data.userCertificatePackage))
    const totalData = userTariffPackages && userTariffPackages.length === 1 && (userTariffPackages[0].productType === '' || userTariffPackages[0].answerTime === '') ? data : { ...data, userTariffPackages: userTariffPackages }
    props.cartTotal(totalData)
  }

  const handlePost = (formik) => {
    let vol = volume
    if (userTariffPackages.length !== costs.length && selectedValue !== '') {
      dispatch(pushTotal(cost.package))
    }
    const lastPack = userTariffPackages[userTariffPackages.length - 1]
    if (lastPack.productType === '' && lastPack.answerTime === '') {
      dispatch(removePreviewPackage(userTariffPackages.length - 1))
    }
    const data = {
      //paymentSystem: "paypal",
      //savePaymentMethod: false,
      //useSavedPaymentMethod: false,
      //successUrl: "https://example.com",
      //cancelUrl: "https://example.com",
      //userTariffPackages: userTariffPackages
    }
    if (selectedValue === 'include') {
      vol = 0
      userTariffPackages.map(e => vol += e.volume)
      data.userCertificatePackage = { userId: userId, volume: vol, isGift: false }

    } else if (selectedValue === 'choose') {
      data.userCertificatePackage = { userId: userId, volume: vol, isGift: false }
    }
    if (selectedValue === 'include' && userTariffPackages.length === 0) {
      dispatch(setCategoryError('Please choose the category'));
      return
    }
    //selectedValue != '' && dispatch(postInvoiceThunk(data))

    if (selectedValue !== '') {
      if (lastPack.productType !== '') {
        dispatch(setTotalPackage({ ...data, userTariffPackages: userTariffPackages }))
        navigate('../payment-first')
      }
      else {
        dispatch(setTotalPackage(data))
        navigate('../payment-first')
      }
    }
    // selectedValue != '' && lastPack.productType != '' && dispatch(setTotalPackage(data)) && navigate('../payment-first')


    setSelectedValue('')
    setVolume(1)


  }

  useEffect(() => {
    const data = {
      userCertificatePackage: certificate
    }
    props.cartTotal(data)
  }, [certificate])


  useEffect(() => {

  }, [props.but])

  return (
    <Formik
      initialValues={{}}
      validate={values => {

      }}
      onChange={() => {
        // console.log('hello')
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
      }}
    >
      {props => (<Form className="payment__form" onChange={props.handleChange} onSubmit={props.handleSubmit}>
        <div className="payment__form-block-container second">
          <label htmlFor="certificates" className="payment__form-label">Authenticity Certificates</label>
          <div className="payment__form-elems-wrapper">
            <div><Select components={{ DropdownIndicator }} classNamePrefix='custom-select' placeholder='Please select option' options={options} onChange={handleChange} /></div>
            {selectedValue === 'choose' &&
              <div className="payment__form-elem number-wrapper" id="cert_count">
                <NumericInput onChange={handleChangeForNumeric} className="payment__form-elem number" id="volume" name="volume" min={1} value={volume} />
                <div className="payment__form-elem info">${cost.certificate / 100}&nbsp;per certificate</div></div>}
            <div className="payment__form-elem number-wrapper">
            </div>
          </div>
          <div className="payment__form-elem upload">
            <div className="payment__form-elem upload-btn">Upload logo</div>
            <div className="payment__form-elem upload-info">It will be added to the certificates</div>
          </div>
        </div>
        {but && handlePost(props)}
      </Form>)}
    </Formik>
  )
}

export default CertificatesForm