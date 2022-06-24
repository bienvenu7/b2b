import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialApp } from './redux/selectors/app-selectors';
import { initializedSuccess } from './redux/reducers/app-reducer';

function App() {

  return (
    <div className="App">
      hello
    </div>
  );
}

export default App;
