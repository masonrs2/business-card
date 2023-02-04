"use client"

import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import { useEffect, useState } from 'react'
import Hero from './Hero' 
import { useSupabase } from "../components/supabase-provider" 
import { useRouter } from 'next/navigation'


const inter = Inter({ subsets: ['latin'] })

export default function Home({ serverAccessToken }) {
  const [workTitle, setWorkTitle] = useState('')
  const [websiteTitle, setWebsiteTitle] = useState('')

  const { supabase, session } = useSupabase()
  const router=  useRouter()

  useEffect(() => {
     const checkAuth = () => {
      if(!session) {
        console.log("session", session)
        router.push('/login')
      }
     }

     checkAuth();
    }, [session])


  return (
    <div className="bg-gradient-to-br from-rose-500 to to-purple-600 flex flex-col h-[calc(100vh-4rem)] items-center ">
      <div className="w-full h-full justify-center items-center flex flex-col">

        
        <Hero />
      </div>
    </div>
  )
}