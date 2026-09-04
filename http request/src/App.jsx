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
import AdminLayout from './components/AdminLayout'
import AdminDashboard from './pages/adminPortal/AdminDashboard'
import AdminSignup from './pages/adminPortal/AdminSignup'
import AdminLogin from './pages/adminPortal/AdminLogin'
import AuthGuardAdmin from './components/AuthGuardAdmin'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path='/' element={<Homepage />} />
        </Route>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin-signup' element={<AdminSignup />} />
        <Route path='/admin-login' element={<AdminLogin />} />
        {/*  user authguard */}
        <Route element={<AuthGuard />}>
          <Route element={<UserLayout />}>
            <Route path='/apps/profile' element={<Profile />} />
          </Route>
        </Route>

         {/* admin */}
        <Route path='/admin' element={<Admin />} />
        {/* admin authguard */}
        <Route element={<AuthGuardAdmin />}>
          <Route element={<AdminLayout />}>
            <Route path='admin/admindashboard' element={<AdminDashboard />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
