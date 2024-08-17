"use client"
import { useSession } from 'next-auth/react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../components/GlobalContext'
import { redirect } from 'next/navigation'
import toast from 'react-hot-toast'
import twitterlogo from "/public/assets/twitter.svg"

export default function Loginpage() {

    const [email, setEmail] = useState("tester@gmail.com")
    const [password, setPassword] = useState("testeristesting")
    const { handleGoogle, handleTwitter } = useContext(GlobalContext)
    const [loginInProgress, setloginInProgress] = useState(false)

    const { data: session, status } = useSession()
    if (status == "authenticated") {
        return redirect("/")
    }

    async function handleSubmitLogin(e) {
        // await handleSubmitLogin(e, setloginInProgress(false), email, password, signIn)
        toast.success("trying to log in..")
        try {
            const response = await signIn("credentials", { email, password, callbackUrl: "/" })
            console.log(response)
        } catch (error) {
            console.log("error occured when log in", error)
        }
    }


    return (
        <div className='min-h-screen py-5 flex flex-col justify-center max-md:px-10 items-center'>

            {/* <form onSubmit={handleSubmitLogin} className='flex flex-col justify-center items-center mx-auto shadow-lg lg:w-[400px] w-full bg-sekunder rounded-md gap-y-2 '>
                <h1 className='text-4xl mb-4 font-serif font-light '>Login</h1>
                <div className="badge badge-info mb-4 text-center mx-auto ">Login with google only currently</div>

                <label className='font-bold' htmlFor="Email">
                    <input className='border-2 rounded-md w-[300px]  h-12 mb-3 bg-slate-200 px-4 text-black mt-auto' placeholder='Email' type="text" value={email} onChange={(ev) => setEmail(ev.target.value)} disabled={loginInProgress} />
                </label>
                <label className='font-bold' htmlFor="Password">
                    <input className='border-2 rounded-md w-[300px]  h-12 mb-3 bg-slate-200 px-4 text-black mt-auto' type="text" placeholder='Password' value={password} onChange={(ev) => setPassword(ev.target.value)} disabled={loginInProgress} />
                </label>
                <button type='submit' disabled={true} className='bg-primer bg-white text-black w-full' >
                    Login
                </button>
                <p className='text-center text-slate-500'>-Or Login with-</p> */}
            <div className='flex flex-col justify-center items-center glass shadow-lg rounded-lg
            px-5 py-2 hover:bg-slate-200 gap-y-4
            '>
                <h2 className='text-center font-bold mb-4'>Click below to login with google</h2>
                <button type='button' onClick={handleGoogle} className='bg-sekunder flex justify-center items-center gap-x-5 w-full  hover:bg-slate-200 hover:text-black mb-2 cursor-pointer '>
                    <Image src={"/google.png"} alt='google' width={15} height={15} /> Google
                </button>
                <button type='button' onClick={handleTwitter} className='bg-sekunder flex justify-center items-center gap-x-5 w-full  hover:bg-slate-200 hover:text-black mb-2 cursor-pointer '>
                    <Image src={twitterlogo} alt='google' width={15} height={15} /> X
                </button>
            </div>
            {/* <div className='lg:text-[1.1rem] text-xs'>
                    no account yet? {" "}
                    <Link className='text-slate-600 ' href={"/register"} >Registration page here &raquo;</Link>
                </div>
            </form> */}
        </div>
    )
}
