import AuthBalance from "./AuthBalance/AuthBalance"
import PaymentForm from "./PaymentForm/PaymentForm"
import PaymentHeader from "./PaymentHeader/PaymentHeader"

const Payment = () =>{
    return(
        <div className="payment-wrapper">
            <PaymentHeader/>
            <div className="payment__content-container">
            <PaymentForm/>
            <AuthBalance/>
            </div>
        </div>
    )
}

export default Payment