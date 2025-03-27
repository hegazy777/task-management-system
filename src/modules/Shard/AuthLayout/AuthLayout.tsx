import React from 'react'
import { Outlet } from 'react-router-dom'
import Button from 'react-bootstrap/Button';

export default function AuthLayout() {
  return (
    <>
  
        <Outlet/>
    </>
  )
}
