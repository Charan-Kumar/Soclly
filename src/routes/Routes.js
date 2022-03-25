import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import New from '../components/Profile/New'
import Landing from '../components/Landing/Landing';

function PrivateRoute({ children }) {
  return ( localStorage.getItem('TOKEN') !== null) ? children : <Navigate to="/" />;
}

export default (childProps) => {
  return (
    <Routes>
      <Route path="/" element={
        <Landing {...childProps} />
      } />
      <Route path="/new_profile" element={
        <New {...childProps} />
      } />
     
    </Routes>
  )
}
