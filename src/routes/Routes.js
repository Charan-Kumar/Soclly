import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import New from '../components/Profile/New'
import Landing from '../components/Landing/Landing';
import Home from '../components/Home/Home';
import Meet from '../components/Jitsi/Meet';
import ViewProfile from '../components/Profile/ViewProfile';

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

      <Route path="/profile/:handle" element={
        <PrivateRoute>
          <ViewProfile {...childProps} />
        </PrivateRoute>
      } />

      <Route path="/meet" element={
        <PrivateRoute>
          <Meet {...childProps} />
        </PrivateRoute>
      } />
     
    </Routes>
  )
}
