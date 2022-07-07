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
        },1000)
    }

    return (
        <div className="payment__form-wrapper">
            <CategoryForm />
            <CertificatesForm but={but}/>
            <button onClick={()=> set()}>Eto ya</button>
        </div>


    )
}

export default PaymentForm