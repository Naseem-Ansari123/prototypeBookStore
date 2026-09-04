import React from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useSession = create(persist(
    (set)=>({
        // user
        user: null,
        setUser: (payload)=>set(()=>({
            user: payload
        })),
        logout: ()=>set(()=>({
            user:null
        })),

        // admin
        admin: null,
        setAdmin: (payload)=>set(()=>({
            admin: payload
        })),
        adminLogout: ()=>set(()=>({
            admin:null
        }))
    }),
    {name: "session"}
))
