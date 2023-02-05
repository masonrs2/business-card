"use client"

import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import { useEffect, useState } from 'react'
import Hero from './Hero' 
import { useSupabase } from "../components/supabase-provider" 
import { useRouter } from 'next/navigation'
import Navbar from './Navbar'


const inter = Inter({ subsets: ['latin'] })

export default function Home({ serverAccessToken }) {
  

  const { supabase, session } = useSupabase()
  const router=  useRouter()

  useEffect(() => {
     const checkAuth = () => {
      if(!session) {
        console.log("session", session)
        router.push('/login')
      }
      console.log("session", session)
     }

     checkAuth();
    }, [session])


  return (
    <div className="bg-gradient-to-br from-rose-500 to to-purple-600 flex flex-col h-screen items-center ">
      <Navbar />
      <div className="w-full h-full justify-center items-center flex flex-col">


        <Hero />
      </div>
    </div>
  )
}