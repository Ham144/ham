"use client"
import { useSession } from 'next-auth/react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { GlobalContext } from '../components/GlobalContext'
import mongoose from 'mongoose'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'

export default function Loginpage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { handleGoogle, handleCredentials } = useContext(GlobalContext)
    const [loginInProgress, setloginInProgress] = useState(true)

    const { data: session, status } = useSession()
    if (status == "authenticated") {
        return redirect("/")
    }

    async function handleSubmitLogin(e) {
        await handleSubmitLogin(e, setloginInProgress, email, password, signIn)
    }

    return (
        <div className='min-h-screen py-5 flex flex-col items-center'>

            <form onSubmit={handleSubmitLogin} className='flex flex-col justify-center items-center mx-auto shadow-lg w-[400px] bg-sekunder rounded-md   gap-y-2 '>
                <h1 className='text-4xl mb-4 font-serif font-light '>Login</h1>
                <div className="badge badge-info mb-4 text-center mx-auto ">Login with google only currently</div>

                <label className='font-bold' htmlFor="Email">
                    <input className='border-2 rounded-md w-[300px] ml-4 h-12 mb-3 bg-slate-200 px-4 text-black' placeholder='Email' type="text" value={email} onChange={(ev) => setEmail(ev.target.value)} disabled={loginInProgress} />
                </label>
                <label className='font-bold' htmlFor="Password">
                    <input className='border-2 rounded-md w-[300px] ml-4 h-12 mb-3 bg-slate-200 px-4 text-black' type="text" placeholder='Password' value={password} onChange={(ev) => setPassword(ev.target.value)} disabled={loginInProgress} />
                </label>
                <button type='submit' disabled={true} className='bg-primer bg-white text-black w-full' >
                    Login
                </button>
                <p className='text-center text-slate-500'>-Or Login with-</p>
                <button type='button' onClick={handleGoogle} className='bg-sekunder flex justify-center items-center gap-x-5 w-full  hover:bg-slate-200 hover:text-black mb-2 cursor-pointer'>
                    <Image src={"/google.png"} alt='google' width={15} height={15} /> Google
                </button>
                <div>
                    no account yet? {" "}
                    <Link className='text-slate-600 ' href={"/register"} >Registration page here &raquo;</Link>
                </div>
            </form>
        </div>
    )
}
