import React from "react";
import {useSelector } from 'react-redux';
import {
    takeProducts,
  } from '../../redux/selectors/product-selectors';
  import './Pricing.scss'
  import { AuthenticTableBlock } from '../AuthenticTableBlockv2/AuthenticTableBlockv2';

export function OrderTable(){  
    const products = useSelector(takeProducts);
    const headersforauthentication = ['Item category','Brand','Model name','Status','Answer time','Submission date']

    return <AuthenticTableBlock headers={headersforauthentication} myproducts={products} typeoftable='orders'/>
}