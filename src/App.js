import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Main from './components/Main/Main';
import { useDispatch, useSelector } from 'react-redux';
import { getIsAuth } from './redux/selectors/auth-selectors';
import { initialApp } from './redux/thunks/app-thunk';
import { getInitialApp } from './redux/selectors/app-selectors';
import Payment from './components/Payment/Payment';
import SuccessPage from './components/Payment/SuccessPage/SuccessPage';
import { getProductTypesThunk } from './redux/thunks/product-thunk';
import { getInvoiceLink } from './redux/selectors/payment-selectors';
import PaymentFirst from './components/Payment/PaymentFirst/PaymentFirst';
import AuthenticationRequest from './components/AuthenticationRequest/AuthenticationRequest';
import SuccessPageOrder from './components/Payment/SuccessPage/SuccessPageOrder';
import NotFoundPage from './components/NotFoundPage/NotFound';
import Authentications from './components/PersonalArea/Authentications/Authentications';
import PhotoRequests from './components/PersonalArea/PhotoRequests/PhotoRequests';
import Card from './components/PersonalArea/Card/Card';
import SignIn from './components/Auth/Signin/Signin';
import SignUp from './components/Auth/Signup/Signup';
import ForgotPassword from './components/Auth/ForgotPassword/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword/ResetPassword';

function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isAuth = useSelector(getIsAuth)
  const appInit = useSelector(getInitialApp)
  const paymentLink = useSelector(getInvoiceLink)

  function redirect(){
    appInit && !isAuth && navigate('/auth/signin')
  }

  useEffect(() => {
    redirect()

  }, [isAuth])

  useEffect(() => {
    !appInit && dispatch(initialApp())
    dispatch(getProductTypesThunk(1, 1000))
  },[])


  if (!appInit) {
    return <div></div>
  }


  return (
    <div className="App">
      <Routes>
        <Route path='main' element={<Main />} />
        <Route path='auth/signin' element={<SignIn/>} />
        <Route path='auth/signup' element={<SignUp/>} />
        <Route path='auth/forgot' element={<ForgotPassword/>} />
        <Route path='password-change/:hash' element={<ResetPassword/>} />
        <Route path='payment' element={<Payment />} />
        <Route path='success' element={<SuccessPage />} />
        <Route path='success-order' element={<SuccessPageOrder/>} />
        <Route path='payment-first' element={<PaymentFirst />} />
        <Route path='authentication-request' element={<AuthenticationRequest />} />
        <Route path='*' element={<NotFoundPage/>}/>
        <Route path='authentications/:page' element={<Authentications/>}/>
        <Route path='authentications/:page' element={<Authentications/>}/>
        <Route path='photo-requests/:page' element={<PhotoRequests/>}/>
        <Route path='request/:id' element={<Card/>}/>
      </Routes>
    </div>
  );
}

export default App;
