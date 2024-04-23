"use client"
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { GlobalContext } from '../components/GlobalContext'


const Registerpage = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("test1@example.com")
    const [password, setPassword] = useState("hammbebe")
    const [phone, setPhone] = useState("")
    const router = useRouter()
    const { handleGoogle } = useContext(GlobalContext)

    async function handleSubmitRegister(ev) {
        ev.preventDefault()
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, password, phone
            })
        })
        if (response.ok) return router.push("/login")
    }

    return (
        <section>
            <form onSubmit={handleSubmitRegister} className='flex flex-col justify-center items-center mx-auto shadow-lg w-[400px] bg-sekunder rounded-md  mt-6 gap-y-2 '>
                <h1 className='text-4xl mb-4 font-serif font-light '>Register</h1>
                <label className='font-bold' htmlFor="name">
                    <input className='border-2 rounded-md w-[300px] ml-4 h-12 mb-3 bg-slate-200 px-4 text-black' placeholder='Name' value={name} onChange={ev => setName(ev.target.value)} autoFocus type="text" />
                </label>
                <label className='font-bold' htmlFor="Email">
                    <input className='border-2 rounded-md w-[300px] ml-4 h-12 mb-3 bg-slate-200 px-4 text-black' placeholder='Email' type="text" value={email} onChange={(ev) => setEmail(ev.target.value)} />
                </label>
                <label className='font-bold' htmlFor="Password">
                    <input className='border-2 rounded-md w-[300px] ml-4 h-12 mb-3 bg-slate-200 px-4 text-black' type="text" placeholder='Password' value={password} onChange={(ev) => setPassword(ev.target.value)} />
                </label>
                <label className='font-bold' htmlFor="name">
                    <input className='border-2 rounded-md w-[300px] ml-4 h-12 mb-3 bg-slate-200 px-4 text-black' placeholder='Phone' value={phone} onChange={ev => setPhone(ev.target.value)} type="text" />
                </label>
                <button type='submit' className='bg-primer text-black w-full'>
                    Register
                </button>
                <p className='text-center text-slate-500'>-Or Login with-</p>
                <button onClick={handleGoogle} className='bg-sekunder flex justify-center items-center gap-x-5 w-full  hover:bg-slate-200 hover:text-black mb-2'>
                    <Image src={"/google.png"} alt='google' width={15} height={15} /> Google
                </button>
                <div>
                    already have an acoount? {" "}
                    <Link className='text-slate-600 ' href={"/login"} >Login page here &raquo;</Link>
                </div>
            </form>
        </section>
    )
}

export default Registerpage