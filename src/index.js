import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Chain from './Components/chain';
import Profile from './Components/profile';
import Form from './Components/form'
import Testing from './Components/testing';
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<App/>}/>
    <Route path='/chain' element={<Chain/>}/>
    <Route exact path='/profile' element={<><Profile/></>}></Route>
    <Route exact path='/register' element={<><Form/></>}></Route>
    <Route exact path='/testing' element={<><Testing/></>}></Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
