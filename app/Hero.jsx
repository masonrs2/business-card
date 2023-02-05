"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSupabase } from '/components/supabase-provider'
import { Configuration, OpenAIApi } from 'openai'
import { useRouter } from 'next/navigation'
import { BsArrowClockwise } from 'react-icons/bs'

const Hero = () => {
    const { supabase, session } = useSupabase()
    const [workTitle, setWorkTitle] = useState('')
    const [websiteTitle, setWebsiteTitle] = useState('')
    const [description, setDescription] = useState('')
    const [cardData, setCardData] = useState(null)

    const router = useRouter()
    const { Configuration, OpenAIApi } = require("openai");

    const configuration = new Configuration({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });

    async function openaiCaller() {

        const openai = new OpenAIApi(configuration);
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Create a two to three sentence or line description that will be placed on a business card. The description should be based off the following parameters given (No name introduction is needed as the users name is already identified on the business card):\n\n ${description} \n`,
            max_tokens: 64,
            temperature: 0,
        });

        console.log(response.data)

        try {
            const { data, error } = await supabase
                .from("card_data")
                .update({
                    description: response.data?.choices[0].text,
                })
                .eq('id', cardData?.id)

            if (error) throw error

        } catch (e) {
            console.log("error", e)
        }

        router.refresh();
        setDescription(response.data?.choices[0].text)
        return response.data?.choices[0].text;

    }

    useEffect(() => {
        async function setDbData() {
            if (workTitle.length < 1) return
            try {
                const { dataCheck, errorCheck } = await supabase
                    .from("card_data")
                    .select('*')
                    .eq('id', cardData?.id)
                console.log("DataCheck", dataCheck)

                if (cardData) {
                    const { data, error } = await supabase
                        .from("card_data")
                        .update({
                            work_title: workTitle === "" ? null : workTitle,
                            website_url: websiteTitle == "" ? null : websiteTitle,
                            user_id: session?.user?.id
                        })
                        .eq('id', cardData?.id)


                    console.log("updateData: ", data)
                } else {
                    const { data, error } = await supabase
                        .from("card_data")
                        .insert({
                            work_title: workTitle,
                            website_url: websiteTitle,
                            user_id: session?.user?.id
                        })

                    console.log("newData: ", data)
                    if (error) throw error
                }


            } catch (e) {
                console.log(e)
            }
        }
        setDbData()

        async function getDbData() {
            try {
                const { data, error } = await supabase
                    .from("card_data")
                    .select("*")
                    .eq("user_id", session?.user?.id)

                if (error) throw error

                if (data) {
                    console.log("*get* card_data:", data[data.length - 1])
                    setCardData(data[data.length - 1])
                }

            } catch (e) {
                console.log("error", e)
            }
        }
        getDbData()


    }, [workTitle, websiteTitle, description])

    return (
        <div className="flex flex-col group perspective" >

            <h1 className="text-2xl font-light">
                Tell us about yourself
            </h1>

            <div className="flex pt-5 gap-6 ">
                <div className="flex flex-col">
                    <label name="workTitle" htmlFor='workTitle' className="text-lg font-thin pb-1 ">Title</label>

                    <input
                        type="text"
                        className="px-3 py-1 w-60  rounded bg-white text-black placeholder-black/60 outline-none hover:ring-2 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500 "
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
                        className="px-3 py-1 w-60  rounded bg-white text-black placeholder-black/60 outline-none hover:ring-2 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500 "
                        name="websiteTitle"
                        id="websiteTitle"
                        placeholder='Ex: johndoeswebsite.com'
                        onChange={(e) => setWebsiteTitle(e.target.value)}
                    />
                </div>
            </div>

            <label htmlFor="about" className="block text-lg font-thin mt-2 tracking-wide ">
                Descriptors
            </label>
            <div className="mt-1 text-lg">
                <textarea
                    id="articleMessage"
                    name="articleMessage"
                    rows={3}
                    onChange={(e) => setDescription(e.target.value)}
                    className="p-3 pl-5 mb-5 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm  bg-gray-500/60 outline outline-gray-500 active:bg-gray-500/70 text-gray-300 active:ring active:ring-blue-600 active:hover-none text-lg h-20"
                    placeholder="Type the company you work for and the type of work you do. We will then generate a descriptive text based on your input that'll be displayed on the business card."
                    defaultValue={''}
                />
            </div>

            <button
                onClick={openaiCaller}
                className="rounded-lg bg-black/10 py-2 text-gray-100 font-medium no-underline transition hover:bg-black/25 w-32 active:bg-black/40 ">
                Generate
            </button>

            <div className="grid grid-cols-3 gap-4 w-full h-60 bg-gradient-to-r mt-8 from-gray-900 via-gray-800 to-gray-700 cursor-pointer relative group-hover:my-rotate-y-180 duration-1000 preserve-3d">


                <div className="w-11 overflow-hidden inline-block absolute right-0 backface-hidden ">
                    <div className=" h-16 bg-gray-600 -rotate-45 transform origin-top-left">
                        <BsArrowClockwise className="absolute cursor-pointer hover:text-gray-300 active:scale-105 active:duration-105 right-5 top-5 text-gray-400 " size={20} />
                    </div>
                </div>

                <div className="col-span-1 flex justify-center pb-16 items-center backface-hidden ">
                    <Image
                        src={session?.user.user_metadata.avatar_url}
                        width={75}
                        height={35}
                        alt="logo"
                        className="rounded-full "
                    />
                </div>

                <div className="col-span-2 flex flex-col pb-28 justify-center backface-hidden ">
                    <h1 className="text-2xl text-gray-200 font-light mt-10 backface-hidden " >{session?.user.user_metadata.name}</h1>

                    <h3 className="text-gray-300 font-light">{cardData?.work_title}</h3>
                    <p className="w-80 text-sm mt-4 text-gray-400">{cardData?.description}</p>
                </div>

                <div className=" absolute my-rotate-y-180 w-full h-full backface-hidden flex " >

                    <div className="w-6 h-full py-2  flex flex-col gap-[5px] text-sm bg-gray-600 mr-28 text-gray-500">
                        <div className="ml-2 mt-1">1</div>
                        <div className="ml-2">2</div>
                        <div className="ml-2">3</div>
                        <div className="ml-2">4</div>
                        <div className="ml-2">5</div>
                        <div className="ml-2">6</div>
                        <div className="ml-2">7</div>
                        <div className="ml-2">8</div>
                        <div className="ml-2">9</div>
                    </div>

                    <div className="w-11  overflow-hidden inline-block absolute right-0  ">
                        <div className=" h-16 bg-gray-700 -rotate-45 transform origin-top-left">
                            <BsArrowClockwise className="absolute cursor-pointer hover:text-gray-400 active:scale-105 active:duration-105 right-5 top-5 text-gray-500 " size={20} />
                        </div>
                    </div>

                    <div className="text-sm mt-8 flex flex-col gap-[3px] ">
                        <span className="text-purple-400 flex" >
                            const
                            <p className="text-yellow-400 ml-2">aboutMe <span className="mx-1 text-gray-400" > {"="} </span> <span className="text-gray-400" >{"{"}</span> </p>
                        </span>

                        <span className="text-red-400 flex ml-6">
                            name <span className="text-blue-300">:</span> <p className="ml-2 text-green-200">'{session?.user?.user_metadata?.name}'</p>
                        </span>

                        <span className="text-red-400 flex ml-6">
                            title <span className="text-blue-300">:</span> <p className="ml-2 text-green-200">'{cardData?.work_title}'</p>
                        </span>

                        <span className="text-red-400 flex ml-6">
                            contact <span className="text-blue-300">:</span> <span className="text-gray-400 ml-2 " >{"{"}</span>
                        </span>

                        <span className="text-red-400 flex ml-12">
                            email <span className="text-blue-300">:</span> <p className="ml-2 text-green-200">'{session?.user?.user_metadata?.email}'</p>
                        </span>

                        <span className="text-red-400 flex ml-12">
                            website: <span className="text-blue-300">:</span> <p className="ml-2 text-green-200">'{cardData?.website_url}'</p>
                        </span>

                        <span className="text-gray-400 ml-6" >{"}"}</span>
                        <span className="text-gray-400 " >{"}"}</span>

                    </div>
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