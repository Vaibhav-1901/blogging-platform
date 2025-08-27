import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider,Route,createBrowserRouter,createRoutesFromElements} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Contact from './pages/Contact.jsx'
import About from './pages/About.jsx'
import Layout from './Layout.jsx'
import Blogs from './pages/Blogs.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'


const router=createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}></Route>
      <Route path='blogs' element={<Blogs/>}></Route>
      <Route path='about' element={<About/>}></Route>
      <Route path='contact' element={<Contact/>}></Route>
    </Route>
    <Route path='signin' element={<SignIn/>}></Route>
    <Route path='signup' element={<SignUp/>}></Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
