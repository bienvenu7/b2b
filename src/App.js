import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Auth from './components/Auth/Auth';
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

function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isAuth = useSelector(getIsAuth)
  const appInit = useSelector(getInitialApp)
  const paymentLink = useSelector(getInvoiceLink)

  useEffect(() => {
    appInit && !isAuth && navigate('/auth/signin')
    
  }, [isAuth])

  useEffect(() => {
    dispatch(initialApp())
    dispatch(getProductTypesThunk(1,1000))
  }, [])


  if (!appInit) {
    return <div></div>
  }


  return (
    <div className="App">
      <Routes>
        <Route path='main' element={<Main />} />
        <Route path='auth/signin' element={<Auth page='signin' />} />
        <Route path='auth/signup' element={<Auth page='signup' />} />
        <Route path='auth/forgot' element={<Auth page='forgot' />} />
        <Route path='password-change/:hash' element={<Auth page='reset' />} />
        <Route path='payment' element={<Payment/>} />
        <Route path='success' element={<SuccessPage/>}/>
        <Route path='invoice' component={() => { window.location.href = {paymentLink}; return null;} }/>
        <Route path='payment-first' element={<PaymentFirst/>}/>
        <Route path='authentication-request' element={<AuthenticationRequest/>}/>
      </Routes>
    </div>
  );
}

export default App;
