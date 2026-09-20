import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Footer from './components/Footer'
import Homepage from './pages/Homepage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Admin from './pages/Admin'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import AuthGuard from './components/AuthGuard'
import UserLayout from './components/UserLayout'
import AdminLayout from './components/AdminLayout'
import AdminDashboard from './pages/adminPortal/AdminDashboard'
import AdminOrders from './pages/adminPortal/AdminOrders'
import Checkout from './pages/user/Checkout'
import AdminSignup from './pages/adminPortal/AdminSignup'
import AdminLogin from './pages/adminPortal/AdminLogin'
import AuthGuardAdmin from './components/AuthGuardAdmin'

import BookStores from './pages/user/BookStores'
import Home from './pages/user/Home'
import Wishlist from './pages/user/Wishlist'
import Cart from './pages/user/Cart'
import MyOrders from './pages/user/MyOrders'
import Books from './pages/user/Books'

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
            <Route path="/user/stores" element={<BookStores />} />
            <Route path="/user/wishlist" element={<Wishlist />} />
            <Route path="/user/books" element={<Books />} />
            <Route path="/user/cart" element={<Cart />} />
            <Route path="/user/checkout" element={<Checkout />} />
            <Route path="/user/orders" element={<MyOrders />} />
            <Route path="/user/home" element={<Home />} />
          </Route>
        </Route>

        {/* admin */}
        <Route path='/admin' element={<Admin />} />
        {/* admin authguard */}
        <Route element={<AuthGuardAdmin />}>
          <Route element={<AdminLayout />}>
            <Route path='admin/admindashboard' element={<AdminDashboard />} />
            <Route path='admin/orders' element={<AdminOrders />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
