import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserTariffPackages,getCosts, getPrice } from "../../redux/selectors/payment-selectors"

import {pushTotal, removePreviewPackage, updateVolumePackage} from '../../redux/reducers/payment-reducer'
import './SummaryMobile.scss'
import { getCartTotalThunk, getPriceThunk } from "../../redux/thunks/payment-thunk"
import { useEffect } from "react"


const SummaryMobile = (props) =>{

    const [count, setCount] = useState(false)
    const [kostyl,setKostyl] = useState(false)
    const cart = useSelector(getUserTariffPackages)

    const dispatch = useDispatch()
    const packages = useSelector(getUserTariffPackages)
    const cost = useSelector(getCosts)
    const totalPrice = useSelector(getPrice)
    
    // console.log(totalPrice)
    // console.log(cost)

    // const updatPrice = (data) => {
    //     setTimeout(() => {
    //         dispatch(getCartTotalThunk(data));
    //       }, 1000)
    // }

    // useEffect(() => {
    //     const data = {
    //         userTariffPackages: cart
    //     }
    //     cart.length && dispatch(getCartTotalThunk(data))
    // }, [cart])
    function delhendler(index){
        dispatch(removePreviewPackage(index))
        setKostyl(true)
        // console.log(packages);
        // const data = {productType: productType, volume: e, answerTime: answerTime}
        // props.getPrice(data)
    }
    useEffect(()=>{
        if(kostyl){
        console.log()
        dispatch(pushTotal(packages));
        setKostyl(false)
        
    }
    },[packages])
    return(
        <>
        {packages.length > 0 && <div className="summary-container-mobile">
            {<div className="summary-title-mobile">Bundle summary</div>}
                {packages.map((el,index)=>el.productType !== '' && <div key={index} className='summary__elem-wrapper-mobile'>
                    <div className="summary__box-right">
                        <div className="summary__elem-name">{el.productType.publicName} bundle</div>
                        {el.answerTime !== "" && <span className="summary__span">{el.answerTime} hours</span>}
                    </div>                    
                    <div className="summary__box-left">
                        {cost && <p className="summary__elem-cost-mobile">{cost[index] && '$'+cost[index]/100 + ' X ' + el.volume}</p>}
                        <button className="summary__button" onClick={() =>delhendler(index)}>X</button>
                    </div>
                    </div>)}
        </div>}
        </>
    )
}

export default SummaryMobile
