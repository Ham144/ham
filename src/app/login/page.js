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

    const [email, setEmail] = useState("helloworld")
    const [password, setPassword] = useState("password")
    const { handleGoogle } = useContext(GlobalContext)
    const [loginInProgress, setloginInProgress] = useState(false)

    const { data: session, status } = useSession()
    if (status == "authenticated") {
        return redirect("/")
    }
    async function handleSubmitLogin(ev) {
        ev.preventDefault()
        setloginInProgress(true)
        try {
            console.log(email, password);
            const response = await signIn('credentials', { email, password })
            const data = await response.json()
            if (data.ok == true) {
                return toast.success("Login Success")
            }
            else {
                console.log("right here else")
                return toast.error(data.message)
            }
        } catch (error) {
            console.log("rigth here error", error)
        }
        setloginInProgress(false)
    }


    return (
        <div className='min-h-screen py-5'>
            <form onSubmit={handleSubmitLogin} className='flex flex-col justify-center items-center mx-auto shadow-lg w-[400px] bg-sekunder rounded-md   gap-y-2 '>
                <h1 className='text-4xl mb-4 font-serif font-light '>Login</h1>
                <label className='font-bold' htmlFor="Email">
                    <input className='border-2 rounded-md w-[300px] ml-4 h-12 mb-3 bg-slate-200 px-4 text-black' placeholder='Email' type="text" value={email} onChange={(ev) => setEmail(ev.target.value)} disabled={loginInProgress} />
                </label>
                <label className='font-bold' htmlFor="Password">
                    <input className='border-2 rounded-md w-[300px] ml-4 h-12 mb-3 bg-slate-200 px-4 text-black' type="text" placeholder='Password' value={password} onChange={(ev) => setPassword(ev.target.value)} disabled={loginInProgress} />
                </label>
                <button type='submit' disabled={loginInProgress} className='bg-primer bg-white text-black w-full'>
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
