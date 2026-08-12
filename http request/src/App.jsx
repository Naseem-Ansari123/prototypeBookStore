import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Footer from './components/Footer'
import Homepage from './pages/Homepage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Admin from './pages/Admin'
import { ToastContainer, toast } from 'react-toastify'
import Profile from './pages/apps/profile'
import AuthGuard from './components/AuthGuard'
import UserLayout from './components/UserLayout'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path='/' element={<Homepage />} />
          <Route path='/admin' element={<Admin />} />
        </Route>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route element={<AuthGuard />}>
          <Route element={<UserLayout />}>
            <Route path='/apps/profile' element={<Profile />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
