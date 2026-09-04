import React from 'react'
import { useSession } from '../../zustand/useSession'
import { Navigate, Outlet } from 'react-router-dom'

const AuthGuardAdmin = () => {
  const { admin } = useSession(state=>state)

    if(!admin) return <Navigate to="/admin-signup" />
    return <Outlet/>
}

export default AuthGuardAdmin
