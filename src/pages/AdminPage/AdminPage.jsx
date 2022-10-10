import React,{useState,useRef} from 'react'
import './AdminPage.scss'
import Header from "../../components/Header/Header";
import Pricing from '../../components/Admin/Pricing';

const AdminPage = () => {

    const [adminnav,setAdnimnav] = useState('Authentication')

    return <div className='top'>
        <Header />
        <div className="admin">
            <div className="admin__nav">
                <ul onClick={(e)=>console.log(e.target)}>
                    <li onClick={()=>setAdnimnav('Authentication')} className={(adminnav=='Authentication'?'admin__nav-active':'')+' admin__nav-header'}>Authentication</li>
                    <li onClick={()=>setAdnimnav('Discounts')} className={adminnav=='Discounts'?'admin__nav-active':''}>Discounts</li>
                    <li onClick={()=>setAdnimnav('Categories')} className={adminnav=='Categories'?'admin__nav-active':''}>Categories</li>
                    <li onClick={()=>setAdnimnav('Brands')} className={adminnav=='Brands'?'admin__nav-active':''}>Brands</li>
                    <li onClick={()=>setAdnimnav('Certificates of Authenticity')} className={adminnav=='Certificates of Authenticity'?'admin__nav-active':''}>Certificates of Authenticity</li>
                    <li onClick={()=>setAdnimnav('Pricing')} className={(adminnav=='Pricing'?'admin__nav-active':'')+' admin__nav-header'}>Pricing</li>
                    <li onClick={()=>setAdnimnav('Users')} className={(adminnav=='Users'?'admin__nav-active':'')+' admin__nav-header'}>Users</li>
                    <li onClick={()=>setAdnimnav('All Users')} className={adminnav=='All Users'?' admin__nav-active':''}>All Users</li>
                    <li onClick={()=>setAdnimnav('Credits')} className={adminnav=='Credits'?' admin__nav-active':''}>Credits</li>
                    <li onClick={()=>setAdnimnav('User Accounts: Create')} className={adminnav=='User Accounts: Create'?'admin__nav-active':''}>User Accounts: Create</li>
                    <li onClick={()=>setAdnimnav('User Accounts: Edit')} className={adminnav=='User Accounts: Edit'?'admin__nav-active':''}>User Accounts: Edit</li>
                    <li onClick={()=>setAdnimnav('Orders')} className={(adminnav=='Orders'?'admin__nav-active':'')+' admin__nav-header'}>Orders</li>
                </ul>
            </div>
            <div className="admin__mainspace">
                <Pricing></Pricing>
            </div>
        </div>
    </div>
}

export default AdminPage