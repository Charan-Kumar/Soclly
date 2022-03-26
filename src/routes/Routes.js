import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import New from '../components/Profile/New'
import Landing from '../components/Landing/Landing';
import Home from '../components/Home/Home';

function PrivateRoute({ children }) {
  return ( localStorage.getItem('access_token') !== null) ? children : <Navigate to="/" />;
}

export default (childProps) => {
  return (
    <Routes>
      <Route path="/" element={
        <Landing {...childProps} />
      } />
      <Route path="/new_profile" element={
        <PrivateRoute>
          <New {...childProps} />
        </PrivateRoute>
      } />
      <Route path="/home" element={
        <PrivateRoute>
          <Home {...childProps} />
        </PrivateRoute>
      } />
     
    </Routes>
  )
}
