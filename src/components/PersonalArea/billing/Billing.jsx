import React from 'react'
import PersonalAreaLayout from '../PersonalAreaLayout'

import './Billing.scss'
import CardLine from './CardLine'


const infos = [
    {
        date : '02/04/2022',
        reference : '190201092881781',
        method : 'PayPal',
        price : '$200.00'
    },
    {
        date : '02/04/2022',
        reference : '190201092881781',
        method : 'Stripe',
        price : '$200.00'
    },
    {
        date : '02/04/2022',
        reference : '190201092881781',
        method : 'Stripe',
        price : '$200.00'
    },
    {
        date : '02/04/2022',
        reference : '190201092881781',
        method : 'Stripe',
        price : '$200.00'
    },
    {
        date : '02/04/2022',
        reference : '190201092881781',
        method : 'PayPal',
        price : '$200.00'
    }
]



const Billing = () => {
  return (
    <div className='top'>
        <PersonalAreaLayout>
            <div className="billing-container">
                <div className="billing-header">
                    Payment History
                </div>
                <div className="billing-table">
                    <div className="billing-table_header">
                        <div className="billing-date">Date</div>
                        <div className="billing-reference">reference</div>
                        <div className="billing-method">Method</div>
                        <div className="billing-price">price</div>
                    </div>
                    {infos.map((info, index) =>
                    <div key={index} className='billing-table-cards'>
                        <CardLine item={info}/>
                    </div>    
                    )}
                </div>
            </div>
        </PersonalAreaLayout>
    </div>
  )
}

export default Billing