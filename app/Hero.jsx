"use client"
import React, { useState } from 'react'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className="flex flex-col" >

            <h1 className="text-2xl font-light"> 
              Tell us about yourself
            </h1>

            <div className="flex pt-5 gap-6 ">
                <div className="flex flex-col">
                    <label name="workTitle" htmlFor='workTitle' className="text-lg font-thin pb-1 ">Title</label>

                    <input 
                      type="text"
                      className="px-3 py-1 w-64  rounded bg-white text-black placeholder-black/60 outline-none hover:ring-2 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500 "
                      name="workTitle"
                      id="workTitle"
                      placeholder='Ex: Sr. Software Engineer'
                      onChange={(e) => setWorkTitle(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label name="websiteTitle" htmlFor='workTitle' className="text-lg font-thin pb-1 ">Website</label>

                    <input 
                      type="text"
                      className="px-3 py-1 w-64  rounded bg-white text-black placeholder-black/60 outline-none hover:ring-2 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500 "
                      name="websiteTitle"
                      id="websiteTitle"
                      placeholder='Ex: myportfolio.com'
                      onChange={(e) => setWebsiteTitle(e.target.value)}
                    />
                </div>
            </div>

            <div className="w-full h-60 bg-gradient-to-r mt-8 from-gray-900 via-gray-800 to-gray-700">

              <div className="grid grids-cols-2 gap-4">
                  <Image src={""} alt="logo" />
              </div>
              
            </div>

            <div className="w-full items-center justify-center mt-10 flex">
              
              <button 
                className="rounded-full bg-black/10 px-10 py-3  text-gray-100 font-medium no-underline transition hover:bg-black/25 w-32 active:bg-black/40 ">
                  Publish
                </button>
            </div>
            
        </div>
  )
}

export default Hero