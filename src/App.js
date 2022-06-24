import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialApp } from './redux/selectors/app-selectors';
import { initializedSuccess } from './redux/reducers/app-reducer';
import Auth from './components/Auth/Auth';

function App() {

  return (
    <div className="App">
      <Auth/>
    </div>
  );
}

export default App;
