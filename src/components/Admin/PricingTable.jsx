import React from "react";
import './Pricing.scss'
import { AuthenticTableBlock } from '../AuthenticTableBlockv2/AuthenticTableBlockv2';

export function PricingTable(){  
    const headersforpricing = ['PRICING NAME','User count','DATE CREATED','']

    let testPricing = [
      {id:1,name:'name1',count:'123',date:'1'},
      {id:1,name:'name1',count:'123',date:'1'},
      {id:1,name:'name1',count:'123',date:'1'},
      {id:1,name:'name1',count:'123',date:'1'},
    ]

    return <AuthenticTableBlock headers={headersforpricing} myproducts={testPricing} typeoftable='pricing'/>
}