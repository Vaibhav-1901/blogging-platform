import React, { Children } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'

function Layout() {
  return (
    <>
    <Navbar/>
    <main>
        <Outlet/>
    </main>                 
    </>
  )
}

export default Layout