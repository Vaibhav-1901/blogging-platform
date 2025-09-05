import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Contact from './pages/Contact.jsx'
import About from './pages/About.jsx'
import Layout from './Layout.jsx'
import Blogs from './pages/Blogs.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import CreateBlog from './components/CreateBlog.jsx'
import BlogDetail from './components/BlogDetail.jsx'
import BlogEdit from './components/BlogEdit.jsx'
import { BlogProvider } from './context/BlogContext.jsx'
import { ToastContainer } from 'react-toastify'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Home />}></Route>
        <Route path='blogs' element={<Blogs />}></Route>
        <Route path='blogs/:slug' element={<BlogDetail />} />
        <Route path='about' element={<About />}></Route>
        <Route path='contact' element={<Contact />}></Route>
        <Route path='create-blog' element={<CreateBlog />}></Route>
        <Route path='/blogs/:slug/edit' element={<BlogEdit />}></Route>
      </Route>
      <Route path='signin' element={<SignIn />}></Route>
      <Route path='signup' element={<SignUp />}></Route>


    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BlogProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BlogProvider>
    </AuthProvider>
  </StrictMode>
)
