"use client"
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../components/GlobalContext'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'


const Registerpage = () => {
    const [name, setName] = useState("tester")
    const [email, setEmail] = useState("tester@gmail.com")
    const [password, setPassword] = useState("testeristesting")
    const [phone, setPhone] = useState("911")
    const router = useRouter()
    const { handleGoogle } = useContext(GlobalContext)


    if (useSession().status == "authenticated") return redirect("/")

    async function handleSubmitRegister(ev) {
        ev?.preventDefault()
        if (name == "" || email == "" || password == "" || phone == "") return toast.error("Please fill all fields")
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                body: JSON.stringify({
                    name, email, password, phone
                })
            })
            const data = await response.json()
            if (data.ok == true) {
                toast.success(data.msg)
                return router.push("/login")
            }
            else {
                toast.error(data.msg)
            }
        } catch (error) {
            toast.error(error)
        }
    }


    return (
        <section className='min-h-screen py-5 mx-auto '>
            < form onSubmit={handleSubmitRegister} className='flex flex-col justify-center items-center mx-auto shadow-lg lg:w-[400px] bg-sekunder rounded-md  mt-6 lg:gap-y-2 ' >
                < h1 className='text-4xl mb-4 font-serif font-light ' > Register</ h1>
                <div className="badge badge-info mb-4 text-center mx-auto ">Register with google only currently</div>
                <label className='font-bold' htmlFor="name">
                    <input className='border-2 rounded-md w-[300px] ml-4 h-12 mb-3 bg-slate-200 px-4 text-black' placeholder='Name' value={name} onChange={ev => setName(ev.target.value)} autoFocus type="text" disabled />
                </label>
                <label className='font-bold' htmlFor="Email">
                    <input className='border-2 rounded-md w-[300px] ml-4 h-12 mb-3 bg-slate-200 px-4 text-black' placeholder='Email' type="email" value={email} onChange={(ev) => setEmail(ev.target.value)} disabled />
                </label>
                <label className='font-bold' htmlFor="Password">
                    <input className='border-2 rounded-md w-[300px] ml-4 h-12 mb-3 bg-slate-200 px-4 text-black' type="password" placeholder='Password' value={password} onChange={(ev) => setPassword(ev.target.value)} />
                </label>
                <label className='font-bold' htmlFor="name">
                    <input className='border-2 rounded-md w-[300px] ml-4 h-12 mb-3 bg-slate-200 px-4 text-black' placeholder='Phone' value={phone} onChange={ev => setPhone(ev.target.value)} type="number" disabled />
                </label>
                <button type='submit' className='bg-primer text-black w-full ' disabled>
                    Register
                </button>
                <p className='text-center text-slate-500 '>-Or Login with-</p>
                <button type='button' onClick={handleGoogle} className='bg-sekunder flex justify-center items-center gap-x-5 w-full  hover:bg-slate-200 hover:text-black mb-2 cursor-pointer '>
                    <Image src={"/google.png"} alt='google' width={15} height={15} /> Google
                </button>
                <div className='lg:text-[0.9rem] text-xs'>
                    already have an acoount? {" "}
                    <Link className='text-slate-600 ' href={"/login"} >Login page here &raquo;</Link>
                </div>
            </form >
        </section >
    )
}

export default Registerpage