import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/Auth/Signup/Signup';
import SignIn from './components/Auth/Signin/Signin';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='signup' element={<SignUp/>}/>
        <Route path='signin' element={<SignIn/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
