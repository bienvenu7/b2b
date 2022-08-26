import { Navigate } from 'react-router-dom'
import ForgotPassword from '../components/Auth/ForgotPassword/ForgotPassword'
import ResetPassword from '../components/Auth/ResetPassword/ResetPassword'
import Signin from '../components/Auth/Signin/Signin'
import SignUp from '../components/Auth/Signup/Signup'
import AuthenticationRequest from '../components/AuthenticationRequest/AuthenticationRequest'
import Main from '../components/Main/Main'
import Payment from '../pages/Payment/Payment'
import PaymentFirst from '../components/Payment/PaymentFirst/PaymentFirst'
import SuccessPage from '../components/Payment/SuccessPage/SuccessPage'
import SuccessPageOrder from '../components/Payment/SuccessPage/SuccessPageOrder'
import Authentications from '../components/PersonalArea/Authentications/Authentications'
import Card from '../components/PersonalArea/Card/Card'
import PhotoRequests from '../components/PersonalArea/PhotoRequests/PhotoRequests'
import TopUpBundle from '../pages/TopUpBundle/TopUpBundle'
import Dashboard from '../components/Dashbord/Dashboard'
import Billing from '../components/PersonalArea/billing/Billing'


export const publicRoutes = [
    { path: '/signin', component: <Signin /> },
    { path: '/signup', component: <SignUp /> },
    { path: '/forgot-password', component: <ForgotPassword /> },
    { path: '/password-change/:hash', component: <ResetPassword /> },
]

export const privateRoutes = [
    {path: '', component: <Navigate to='main'/>},
    { path: 'main', component: <Main /> },
    { path: 'authentications/completed', component: <Authentications var={'completed'}/>},
    { path: 'authentications/in-progress', component: <Authentications var={'progress'}/>},
    { path: 'photo-requests/:page', component: <PhotoRequests/>},
    { path: 'request/:id', component: <Card/>},
    { path: 'payment', component: <TopUpBundle/>},
    {path: 'payment-first', component: <Payment/>},
    {path: 'success-order', component: <SuccessPage/>},
    {path: 'success-order', component: <SuccessPageOrder/>},
    {path: 'authentication-request', component: <AuthenticationRequest/>},
    {path: 'pay', component: <Payment/>},

    {path: 'home', component: <Dashboard/>},
    {path: 'billing-history', component: <Billing/>}
    
    //{path: 'payment-new', component: <TopUpBundle/>}
]