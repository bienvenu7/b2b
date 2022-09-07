import CategoryForm from "./CategoryForm"
import CertificatesForm from "./CertificatesForm"
import React from "react"

const PaymentForm = (props) => {

    return (
        <div className="payment__form-wrapper">
            <CategoryForm setAdd={props.setAdd} but={props.btnAdd} cartTotal={props.cartTotal} getPrice={props.getPrice}/>
            <hr/>
            <CertificatesForm but={props.btnPay} cartTotal={props.cartTotal}/>
        </div>


    )
}

export default PaymentForm