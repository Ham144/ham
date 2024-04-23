"use client"
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Profilepage = () => {
    const session = useSession()
    console.log(session)
    const user = session?.data?.user

    function handleSave(ev) {
        ev.preventDefault()
        console.log("test")
    }

    if (session?.status === "unauthenticated") {
        return <div>
            Ilegal move, this page is for authorized user, login first {" "}
            <Link className='font-bold underline' href={"/login"}>here</Link>
        </div>
    }


    return (
        <section className='flex w-full px-4 '>
            <div className='flex md:w-[50%] w-full mt-6 border-t-8  border-yellow-500 mx-auto py-5 px-12  bg-slate-100 min-h-[500px] rounded-b-md shadow-md'>
                <form onSubmit={handleSave} className='flex flex-col w-full gap-y-5 h-[120%] '>
                    <div className='flex justify-between items-center'>
                        <label htmlFor="name" className='text-primer'>Name </label>
                        <input type="text" id='name' className='px-3  bg-slate-200 w-[70%] h-11 rounded-full duration-500 font-extrabold mb-4 focus:shadow-lg' />
                    </div>
                    <div className='flex justify-between items-center'>
                        <label htmlFor="email" className='text-primer'>Email</label>
                        <input type="text" id='email' disabled value={user?.email} className='px-3  bg-slate-200 w-[70%] h-11 rounded-full duration-500 font-extrabold mb-4 focus:shadow-lg' />
                    </div>
                    <div className='flex justify-between items-center'>
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
                    <div className='flex justify-between items-center'>
                        <label htmlFor="phone" className='text-primer'>Phone </label>
                        <input type="text" id='phone' className='px-3  bg-slate-200 w-[70%] h-11 rounded-full duration-500 font-extrabold mb-4 focus:shadow-lg' />
                    </div>

                    <input type="submit" className='bg-primer' />
                </form>
            </div>
        </section>
    )
}

export default Profilepage