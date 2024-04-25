"use client"
import mongoose from 'mongoose'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast, { Toast, Toaster } from 'react-hot-toast'

const Profilepage = () => {
    let session = useSession()

    const [zoomin, setZoomin] = useState(false)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("") //ilegal change
    const [phone, setPhone] = useState("")



    async function handleRefresh() {
        const response = await fetch("/api/profile")
        const data = await response.json()
        setName(prev => prev = data.name)
        setEmail(prev => prev = data.email)
        setPhone(prev => prev = data.phone)
    }
    useEffect(() => {
        handleRefresh()
    }, [])


    async function handleSave(ev) {
        ev.preventDefault()
        toast("saving..")
        try {
            const response = await fetch("/api/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, phone
                })
            })
            const data = await response.json()
            // console.log(data)
            if (response.ok) toast.success("Saved")
            return
        } catch (error) {
            toast.error("failed saving")
            console.log(error)
        }

    }

    function handleChangePicture(ev) {

    }

    if (session?.status === "unauthenticated") {
        return <div>
            Ilegal move, this page is for authorized user, login first {" "}
            <Link className='font-bold underline' href={"/login"}>here</Link>
        </div>
    }


    return (
        <section className='flex w-full px-4 '>
            <Toaster />
            <div className='flex md:w-[50%] w-full mt-6 border-t-8  border-yellow-500 mx-auto py-5 px-12  bg-slate-100 min-h-[500px] rounded-b-md shadow-md gap-x-5 max-md:flex-col  justify-center  md:items-start items-center'  >
                <Image onClick={() => setZoomin((prev) => setZoomin(!zoomin))} style={zoomin ? { position: "absolute", width: "1680px", height: "1000px", borderRadius: "0", objectFit: "contain", border: "none", padding: "15%", backgroundColor: "rgba(23,23,23,0.3)", zIndex: "20", alignSelf: "center", cursor: "zoom-out" } : ""} className='w-[50%] h-[50%]  rounded-full border-4 border-yellow-500 cursor-zoom-in' src={session?.data?.user?.image || "/profile.png"} alt='profile pic' width={1000} height={1000} />
                <div className='mt-3
                 md:absolute md:translate-x-[-220px]  md:translate-y-[580%]'>
                    <input type="file" className='bg-primer' />
                </div>
                <form onSubmit={handleSave} className='flex flex-col w-full gap-y-5 h-[120%] '>
                    <button type='button' onClick={handleRefresh} className='shadow-md active:shadow-none px-6 py-2'>Refresh</button>
                    <div className='flex justify-between items-center'>
                        <label htmlFor="name" className='text-primer'>Name </label>
                        <input type="text" id='name' className='px-3  bg-slate-200 w-[70%] h-11 rounded-full duration-500 font-extrabold mb-4 focus:shadow-lg' value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className='flex justify-between items-center' onClick={() => toast(" Email is not changeable")}>
                        <label htmlFor="email" className='text-primer'  >Email</label>
                        <input type="text" id='email' disabled value={email} className='px-3  bg-gray-400 w-[70%] h-11 rounded-full duration-500 font-extrabold mb-4 focus:shadow-lg' />

                    </div>


                    {/* <div className='flex justify-between items-center'>
                        <label htmlFor="password" className='text-primer'>Password</label>
                        <input type="password" disabled id='password' className='px-3  bg-slate-200 w-[70%] h-11 rounded-full duration-500 font-extrabold mb-4 focus:shadow-lg' />
                    </div>
                    <div className='flex justify-between items-center'>
                        <label htmlFor="newpassword" className='text-primer max-md:text-sm '>new Password</label>
                        <input type="password" id='newpassword' className='px-3  bg-slate-200 w-[70%] max-sm:w-[80%] h-11 rounded-full duration-500 font-extrabold mb-4 focus:shadow-lg' />
                    </div>

                    <div className='flex justify-between items-center'>
                        <label htmlFor="confirm" className='text-primer  text-wrap max-md:text-sm'>Confirm Password</label>
                        <input type="password" id='confirmnewpassword' className='px-3  bg-slate-200  w-[70%] max-sm:w-[100%] h-11 rounded-full duration-500 font-extrabold mb-4 focus:shadow-lg' />
                    </div>

                */}
                    <div className='flex justify-between items-center'>
                        <label htmlFor="phone" className='text-primer'>phone </label>
                        <input type="text" id='phone' className='px-3  bg-slate-200 w-[70%] h-11 rounded-full duration-500 font-extrabold mb-4 focus:shadow-lg' value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>

                    <input type="submit" className='bg-primer' />
                </form>
            </div>
        </section >
    )
}

export default Profilepage