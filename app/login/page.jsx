'use client'

import React from 'react'
import { useSupabase } from '../../components/supabase-provider'
import { useRouter } from 'next/navigation'
const login = () => {
  const { supabase, session } = useSupabase()
  const router = useRouter()

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    })

    if(error) throw error
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center bg-gradient-to-br from-rose-500 to bg-purple-600 ">
          {!session && (
            <button 
              onClick={session ? () => signOut() : () => signInWithGoogle()}
              className="rounded-full bg-black/10 px-10 py-3 font-semibold active:bg-black/40 text-gray-100 no-underline transition hover:bg-black/2-">
                Sign in with Google
              </button>
          )}

      </div>
  )
}

export default login