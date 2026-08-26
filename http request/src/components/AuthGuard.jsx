import React from 'react'
import { useSession } from '../../zustand/useSession'
import { Navigate, Outlet } from 'react-router-dom'

const AuthGuard = () => {
    const { user, admin } = useSession(state=>state)

    if(!user) return <Navigate to="/login" />
    if(!admin) return <Navigate to="/login" />
    return <Outlet/>
}

export default AuthGuard
