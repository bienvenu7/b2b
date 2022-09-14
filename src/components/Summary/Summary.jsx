import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserTariffPackages,getCosts, getPrice } from "../../redux/selectors/payment-selectors"

import {pushTotal, removePreviewPackage, updateVolumePackage} from '../../redux/reducers/payment-reducer'
import './Summary.scss'
import { getCartTotalThunk, getPriceThunk } from "../../redux/thunks/payment-thunk"
import { useEffect } from "react"


const Summary = (props) =>{

    const [count, setCount] = useState(false)

    const cart = useSelector(getUserTariffPackages)

    const dispatch = useDispatch()
    const packages = useSelector(getUserTariffPackages)
    const cost = useSelector(getCosts)
    const totalPrice = useSelector(getPrice)
    console.log(totalPrice)
    console.log(cost)

    // const updatPrice = (data) => {
    //     setTimeout(() => {
    //         dispatch(getCartTotalThunk(data));
    //       }, 1000)
    // }

    useEffect(() => {
        const data = {
            userTariffPackages: cart
        }
        dispatch(getCartTotalThunk(data))

        console.log(count)
    }, [count])


    return(
        <>
        {console.log(packages)}
        {packages.length > 0 && <div className="summary-container">
            {packages[0].productType !== '' && <div className="summary-title">Summary</div>}
                {packages.map((el,index)=>el.productType !== '' && <div key={index} className='summary__elem-wrapper'>
                    <div className="box">
                        <button onClick={() => { dispatch(removePreviewPackage());
                            cost.splice(index, 1)
                        }}>remove</button>
                        <div className="summary__elem-name">{el.productType.publicName} bundle</div>
                        {el.answerTime !== "" && <span>{el.answerTime} h</span>}
                    </div>
                    <div className="box">
                        <button onClick={() => 
                            el.volume > 1 && dispatch(updateVolumePackage({index: index, volume: el.volume - 1}))
                        }>-</button>
                        <div className="summary__elem-cost">{cost && cost[index] && cost[index]/100 + ' X ' + el.volume}</div>
                        <button onClick={() => {
                            setCount(true)
                            dispatch(updateVolumePackage({index: index, volume: el.volume + 1}));
                        }}>+</button>
                    </div>
                    </div>)}
        </div>}
        </>
    )
}

export default Summary
