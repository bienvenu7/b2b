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
    dispatch(getAuthThunk("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksInJvbGUiOnsiaWQiOjIsIm5hbWUiOiJ1c2VyIiwiX19lbnRpdHkiOiJSb2xlIn0sImlhdCI6MTY1NjM0MzgzMiwiZXhwIjoxNjU2NDMwMjMyfQ.TH-4J9CBeqtb02KQrOuq2zTDffk30f9_Vp1u7vGYFtk"))
  },[])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='main' element={<Main/>}/>
          <Route path='auth/signin' element={<Auth page='signin'/>} />
          <Route path='auth/signup' element={<Auth page='signup'/>} />
          <Route path='auth/forgot' element={<Auth page='forgot'/>} />
          <Route path='auth/reset' element={<Auth page='reset'/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
