'use client'

import { createContext, useContext, useState } from 'react'
import { createClient } from '../utils/supabase-browser'
import { useEffect } from 'react'  
import { useRouter } from 'next/navigation'


const Context = createContext()

export default function SupabaseProvider({ children }) {
  const [supabase] = useState(() => createClient())
  const router = useRouter()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== supabase.auth?.accessToken) {
        router.refresh()
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth?.accessToken])

  return (
    <Context.Provider value={{ supabase }}>
      <>{children}</>
    </Context.Provider>
  )
}

export const useSupabase = () => useContext(Context)