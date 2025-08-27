import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar.jsx'
import BlogCard from './components/BlogCard.jsx'
import Home from './pages/Home.jsx'

function App() {

  return (
    <>
    <div className=''>
    <Navbar/>
    <Home/>
    
    </div>
    </>
  )
}

export default App
