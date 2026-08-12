import React from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useSession = create(persist(
    (set)=>({
        user: null,
        setUser: (payload)=>set(()=>({
            user: payload
        })),
        logout: ()=>set(()=>({
            user:null
        }))
    }),
    {name: "session"}
))
