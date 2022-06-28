import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/Auth/Signup/Signup';
import SignIn from './components/Auth/Signin/Signin';
import Auth from './components/Auth/Auth';
import Main from './components/Main/Main';
import { useDispatch } from 'react-redux';
import { getAuthThunk } from './redux/thunks/auth-thunk';

function App() {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getAuthThunk())
  },[])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='main' element={<Main/>}/>
          <Route path='auth/signin' element={<Auth page='signin'/>} />
          <Route path='auth/signup' element={<Auth page='signup'/>} />
          <Route path='auth/forgot' element={<Auth page='forgot'/>} />
          <Route path='auth/reset/password-change/:hash' element={<Auth page='reset'/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
