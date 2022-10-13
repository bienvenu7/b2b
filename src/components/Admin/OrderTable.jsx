import React, {useState} from "react";
import './Pricing.scss'
import { AuthenticTableBlock } from '../AuthenticTableBlockv2/AuthenticTableBlockv2';
import { useDispatch, useSelector } from 'react-redux';
import {
    getTypesOfProduct,
    takeBrandsList,
    takeCheckStatuses,
    takeProducts,
    takeResultStatuses,
  } from '../../redux/selectors/product-selectors';

export default function Pricing(){  
    const products = useSelector(takeProducts);
    console.log({products1:products});
    const headers1 = ['Item category','Brand','Model name','Status','Answer time','Submission date']
    const headers2 = ['PRICING NAME','User count','DATE CREATED','']

    let testPricing = [
      {id:1,name:'name1',count:'123',date:'1'},
      {id:1,name:'name1',count:'123',date:'1'},
      {id:1,name:'name1',count:'123',date:'1'},
      {id:1,name:'name1',count:'123',date:'1'},
    ]

    return <AuthenticTableBlock headers={headers2} myproducts={testPricing} typeoftable='pricing'/>
}