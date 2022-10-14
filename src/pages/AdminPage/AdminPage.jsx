import React from 'react'
import {  Outlet,NavLink } from "react-router-dom";
import './AdminPage.scss'
import {Header} from "../../components/Header/Header";


export const AdminPage = () => {
    return <div className='top'>
        <Header />
        <div className="admin">
            <div className="admin__nav">
                <ul>
                    <li><NavLink className='admin__nav-header' to='/panel/authentication'>Authentication</NavLink></li>
                    <li><NavLink to='/panel/discounts'>Discounts</NavLink></li>
                    <li><NavLink to='/panel/categories'>Categories</NavLink></li>
                    <li><NavLink to='/panel/brands'>Brands</NavLink></li>
                    <li><NavLink to='/panel/certificates'>Certificates of Authenticity</NavLink></li>
                    <li><NavLink className='admin__nav-header' to='/panel/pricing'>Pricing</NavLink></li> 
                    <li><NavLink to='/panel/pricingItem'>PricingItem</NavLink></li> {/* del */}
                    <li><NavLink className='admin__nav-header' to='/panel/usercard'>Users</NavLink></li>
                    <li><NavLink to='/panel/allusers'>All Users</NavLink></li>
                    <li><NavLink to='/panel/credits'>Credits</NavLink></li>
                    <li><NavLink to='/panel/usercreate'>User Accounts: Create</NavLink></li>
                    <li><NavLink to='/panel/useredit'>User Accounts: Edit</NavLink></li>
                    <li><NavLink className='admin__nav-header' to='/panel/orders'>Orders</NavLink></li>
                    <li><NavLink to='/panel/orders/d9322914-27eb-4f47-86d3-407257436e44'>OrdersItem</NavLink></li> {/* del */}
                </ul>
            </div>
            <div className="admin__mainspace">
                <Discount/>
            </div>
        </div>
    </div>
}