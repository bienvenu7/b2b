import React from 'react';
import { Navigate } from 'react-router-dom';
import { ForgotPassword } from '../components/Auth/ForgotPassword/ForgotPassword';
import { ResetPassword } from '../components/Auth/ResetPassword/ResetPassword';
import { SignIn } from '../components/Auth/Signin/Signin';
import { SignUp } from '../components/Auth/Signup/Signup';
import { Conditions } from '../components/Auth/Conditions/Conditions';
import { AuthenticationRequest } from '../components/AuthenticationRequest/AuthenticationRequest';
import { Payment } from '../pages/Payment/Payment';
import { SuccessPage } from '../components/Payment/SuccessPage/SuccessPage';
import { SuccessPageOrder } from '../components/Payment/SuccessPage/SuccessPageOrder';
import { Authentications } from '../components/PersonalArea/Authentications/Authentications';
import { Card } from '../components/PersonalArea/Card/Card';
import { PhotoRequests } from '../components/PersonalArea/PhotoRequests/PhotoRequests';
import { TopUpBundle } from '../pages/TopUpBundle/TopUpBundle';
import { Billing } from '../components/PersonalArea/billing/Billing';
import { ConfirmEmail } from '../components/Auth/ConfirmEmail/ConfirmEmail';
import { DashboardPage } from '../pages/DashboardPage/DashboardPage';
import { PendingPay } from '../components/Payment/SuccessPage/PendingPay';
import { Unsuccess } from '../components/Payment/SuccessPage/Unsuccess';
import { Order } from '../components/order/Order';
import AdminPage from "../pages/AdminPage/AdminPage";

import Pricing from '../components/Admin/Pricing';
import PricingTable from '../components/Admin/PricingTable';
import OrderDetails from '../components/Admin/OrderDetails';
import OrderTable from '../components/Admin/OrderTable';

export const publicRoutes = [
  { path: '/signin', component: <SignIn /> },
  { path: '/signup', component: <SignUp /> },
  { path: '/conditions', component: <Conditions /> },
  { path: '/forgot-password', component: <ForgotPassword /> },
  { path: '/password-change/:hash', component: <ResetPassword /> },
  { path: '/confirm-email/:hash', component: <ConfirmEmail /> },
  { path: '/album-private/:id', component: <Order /> },
];

export const privateRoutes = [
  { path: '', component: <Navigate to="dashboard" /> },
  { path: 'main', component: <DashboardPage /> },
  { path: 'conditions', component: <Conditions /> },
  {
    path: 'authentications/completed',
    component: <Authentications var="completed" />,
  },
  {
    path: 'authentications/in-progress',
    component: <Authentications var="progress" />,
  },
  { path: 'dashboard', component: <DashboardPage /> },
  { path: 'photo-requests/:page', component: <PhotoRequests /> },
  { path: 'request/:id', component: <Card /> },
  { path: 'payment', component: <TopUpBundle /> },
  { path: 'payment-first', component: <Payment /> },
  { path: 'success', component: <SuccessPage /> },
  { path: 'pending-payment', component: <PendingPay /> },
  { path: 'unsuccess', component: <Unsuccess /> },
  { path: 'success-order', component: <SuccessPageOrder /> },
  { path: 'authentication-request', component: <AuthenticationRequest /> },
  { path: 'pay', component: <Payment /> },
  { path: 'billing-history', component: <Billing /> },
  { path: 'album-private/:id', component: <Order /> },
  { 
    path: "/panel", 
    component: <AdminPage />,
    children: [
    // { path: "/authentication", element: <Home /> },
    { path: "/panel/pricing", component: <PricingTable /> },
    { path: "/panel/pricingitem", component: <Pricing /> },
    { path: "/panel/orders", component: <OrderTable /> },
    { path: "/panel/:id", component: <OrderDetails /> },
    
    ] 
  },
];
