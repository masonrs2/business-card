import React, { useState } from 'react';
import { HiLightningBolt } from 'react-icons/hi';
import { useSupabase } from "../components/supabase-provider"
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const { supabase, session } = useSupabase()
    const router = useRouter()

    async function signOut() {
        const { error } = await supabase.auth.signOut()

        if(error) throw error;
        router.push('/login')
    }

  return (
    
    <div>
        <nav className=" bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 w-screen  shadow ">
            <div className="px-8 mx-auto max-w-7xl">
                <div className="flex items-center justify-between h-16">
                    <div className=" flex items-center">
                        <a className="flex-shrink-0" href="/">
                            <HiLightningBolt size={30} className="text-purple-500 " /> 
                        </a>
                        <div className="hidden md:block">
                            <div className="flex items-baseline ml-10 space-x-4">
                                <a className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium" href="/">
                                    Home
                                </a>
                                <a className="text-gray-800 dark:text-white  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium" href="/#">
                                    Gallery
                                </a>
                                <a className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium" href="/#">
                                    Content
                                </a>
                                <a className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium" href="/#">
                                    Contact
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="block">
                        <div className="flex items-center ml-4 md:ml-6">
                            <a href="https://github.com/masonrs2" className="p-1 text-gray-400 rounded-full focus:outline-none hover:text-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <span className="sr-only">
                                    View github
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="text-xl transition-colors duration-200 hover:text-gray-800 dark:hover:text-white" viewBox="0 0 1792 1792">
                                    <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z">
                                    </path>
                                </svg>
                            </a>
                            <div className="relative ml-3">
                                <div className="relative inline-block text-left">
                                    <div>
                                        <button onClick={() => setToggle(!toggle)} type="button" className={` flex items-center justify-center w-full rounded-md  px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500` }id="options-menu">
                                            <svg width="27" fill="currentColor" height="27" className="text-gray-800" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z">
                                                </path>
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="absolute right-0 w-40 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                                        <div className={`py-1 w-full relative ${toggle ? "hidden" : ""}` }role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                            <a href="#" className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                                                <span className="flex flex-col ">
                                                    <span>
                                                        Settings
                                                    </span>
                                                </span>
                                            </a>
                                            <a href="#" className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                                                <span className="flex flex-col">
                                                    <span>
                                                        Account
                                                    </span>
                                                </span>
                                            </a>
                                            <a href="#" className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                                                <span className="flex flex-col">
                                                    <span onClick={signOut}>
                                                        Logout
                                                    </span>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
          
        </nav>
    </div>

  )
}

export default Navbar