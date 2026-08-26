import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default AdminLayout
