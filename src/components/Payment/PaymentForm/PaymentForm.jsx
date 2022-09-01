import CategoryForm from "./CategoryForm"
import CertificatesForm from "./CertificatesForm"
import React from "react"

const PaymentForm = (props) => {

    return (
        <div className="payment__form-wrapper">
            <CategoryForm but={props.btnAdd} cartTotal={props.cartTotal} getPrice={props.getPrice}/>
<<<<<<< HEAD
            <hr/>
=======
            {/*<hr style={{background: '#E1E1E1',
                height: '0.7px',
                border: '0',
                width: '608px',
                margin: '0 auto',
                padding: '0'}}/>*/}
>>>>>>> 142aa109da30d8af55c39f8cab16f0f1b91546c5
            <CertificatesForm but={props.btnPay} cartTotal={props.cartTotal}/>
        </div>


    )
}

export default PaymentForm