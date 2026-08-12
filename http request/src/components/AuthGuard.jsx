import React from 'react'
import { useSession } from '../../zustand/useSession'
import { Navigate, Outlet } from 'react-router-dom'

const AuthGuard = () => {
    const { user } = useSession(state=>state)

    if(!user) return <Navigate to="/login" />
    return <Outlet/>
}

export default AuthGuard
