import React from 'react'
import { LogOut, Menu } from 'lucide-react'
import { useState } from 'react'
import { useSession } from '../../zustand/useSession'
import { Outlet, useNavigate } from 'react-router-dom'

const UserLayout = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const { user, logout } = useSession(state=>state)

    const handleLogout = () =>{
        logout();
        navigate('/login')
    }
    
  return (
    <div className='h-[100vh] flex'>
      <div className='h-[100%] w-[15%] bg-blue-600'></div>
      <div className='w-[85%] bg-whitemin-h-[100%]'>
        <nav className='flex px-10 py-2 justify-between items-center border-b border-gray-300'>
            <h1 className='text-xl font-bold'>Codingott</h1>
            <ul className='flex items-center justify-center gap-3 relative'>
                <li><Menu className='w-7 h-7 mt-2'/></li>
                <li onClick={()=>setShow(!show)} className='bg-gray-400 rounded-full p-1'><img className='w-10 h-10' src="https://api.dicebear.com/7.x/bottts/svg?seed=lulijJbr2GN2zgp2Ps_hM" alt="img" /></li>
                {
                    user && show &&
                    <div className='px-2 py-1 bg-white rounded absolute top-12 right-1 shadow border border-gray-100'>
                        <p className='p-0.5 rounded hover:bg-gray-200 capitalize '>{user.user.username}</p>
                        <p className='p-0.5 rounded hover:bg-gray-200'>{user.user.email}</p>
                        <p onClick={handleLogout} className='flex items-center gap-1 p-0.5 rounded hover:bg-gray-200'><LogOut className='w-5 h-5' />Logout</p>
                    </div>
                }
            </ul>
        </nav>

        <Outlet/>

      </div>
    </div>
  )
}

export default UserLayout
