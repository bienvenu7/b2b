import { useSelector } from "react-redux"
import { getIsAuth } from "../../../redux/selectors/auth-selectors"
import CategoryForm from "./CategoryForm"
import CertificatesForm from "./CertificatesForm"
import React, { useRef, useState } from "react"

const PaymentForm = (props) => {

    const [but, setButState] = useState(false)

    const set = () =>{
        setButState(true)
        setTimeout(()=>{
            setButState(false)
        },1)
    }

    return (
        <div className="payment__form-wrapper">
            <CategoryForm but={props.btnAdd} cartTotal={props.cartTotal} getPrice={props.getPrice}/>
            <CertificatesForm but={props.btnPay} cartTotal={props.cartTotal}/>
        </div>


    )
}

export default PaymentForm