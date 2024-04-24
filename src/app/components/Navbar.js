"use client"
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect } from 'react'
import { GlobalContext } from './SessionContext'

const Navbar = () => {
    const path = usePathname()
    const router = useRouter()
    const session = useSession() //data return authentication semua disini

    // console.log(session)

    return (
        <nav className='flex justify-between items-center md:px-5 px-1 py-4 w-full  border-b-2 '>
            <div >
                <Image className='hover:animate-bounce' src={"/main-logo.png"} alt='logo' width={70} height={70} />
            </div>
            <div className='md:flex  max-md:mx-auto max-md:fixed max-md:flex max-md:justify-around max-md:w-screen max-md:border-t-2 max-md:pt-4 max-md:duration-500 max-md:rounded-xl max-md:bg-red-500 max-md:py-3 max-md:bottom-0  md:items-center md:justify-between md:gap-x-5  
            z-20
            '>
                <Link className={`font-semibold ${path === "/" ? "bg-sekunder max-md:border-none max-md:border-t-2" : ""} border-b-black hover:font-extrabold hover:border-b-2 duration-150`} href={"/"}>Home</Link>
                <Link className={`font-semibold ${path === "/menu" ? "bg-sekunder max-md:border-none max-md:border-t-2" : ""} border-b-black hover:font-extrabold hover:border-b-2 duration-150`} href={"/menu"}>Menu</Link>
                <Link className={`font-semibold ${path === "/about" ? "bg-sekunder max-md:border-none max-md:border-t-2 " : ""} border-b-black hover:font-extrabold hover:border-b-2 duration-150`} href={"/about"}>About</Link>
                <Link className={`font-semibold ${path === "/contact" ? "bg-sekunder max-md:border-none max-md:border-t-2" : ""} border-b-black hover:font-extrabold hover:border-b-2 duration-150`} href={"/contact"}>Contact</Link>
            </div >
            <div className='flex items-center gap-x-5'>
                <button className='rounded-full  bg-yellow-400' onClick={() => session?.status === "authenticated" ? router.push("/profile") : router.push("/login")}>
                    <Image src="/profile.png" alt="profile" width={40} height={40} />
                </button>
                {session?.status !== "authenticated" ?
                    <div className='flex gap-x-5'>
                        <button onClick={() => router.push("/login")} className='bg-sekunder' >Login</button>
                        <button onClick={() => router.push("/register")} className='bg-primer' >Register</button>
                    </div>
                    :
                    <div>
                        <button onClick={() => {
                            signOut()
                            router.push("/")
                        }} className='bg-primer w-[130px]'>Log Out</button>
                    </div>
                }
            </div>
        </nav>
    )
}

export default Navbar