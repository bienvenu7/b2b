import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Main from './components/Main/Main';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthThunk } from './redux/thunks/auth-thunk';
import { getIsAuth } from './redux/selectors/auth-selectors';
import { initialApp } from './redux/thunks/app-thunk';
import { getInitialApp } from './redux/selectors/app-selectors';

function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isAuth = useSelector(getIsAuth)
  const appInit = useSelector(getInitialApp)

    useEffect(() => {
        appInit && !isAuth && navigate('/auth/signin')
    }, [isAuth])

  useEffect(()=>{
    dispatch(initialApp())
  },[])


  if (!appInit){
    return <div></div>
  }


  return (
    <div className="App">
        <Routes>
          <Route path='main' element={<Main/>}/>
          <Route path='auth/signin' element={<Auth page='signin'/>} />
          <Route path='auth/signup' element={<Auth page='signup'/>} />
          <Route path='auth/forgot' element={<Auth page='forgot'/>} />
          <Route path='password-change/:hash' element={<Auth page='reset'/>} />
        </Routes>
    </div>
  );
}

export default App;
