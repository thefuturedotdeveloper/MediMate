import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const privateComponent = () => {
  return (
    <Outlet/>
  )
}

export default privateComponent
