"use client"
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect } from 'react'
import { GlobalContext } from './SessionContext'
import { BsCart } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { GrFavorite } from "react-icons/gr";


const Navbar = () => {
    const path = usePathname()
    const router = useRouter()
    const session = useSession() //data return authentication semua disini

    // console.log(session)

    return (
        <nav className='flex fixed justify-between items-center md:px-5 px-1 py-4 w-full md:backdrop-blur-md shadow-md z-10 max-md:px-2 
    bg-gradient-to-l from-gray-200 via-orange-200 to-stone-100

        '>
            <div >
                <Image className='hover:animate-bounce' src={"/main-logo.png"} alt='logo' width={70} height={70} />
            </div>
            <div className='md:flex  max-md:mx-auto max-md:fixed max-md:flex max-md:justify-around  max-md:border-t-2 max-md:pt-4 max-md:duration-500 max-md:rounded-xl max-md:bg-yellow-500 max-md:text-white max-md:py-3 max-md:bottom-0  md:items-center md:justify-between md:gap-x-5  
            z-20 max-md:w-full max-md:translate-x-[-7px]
            '>
                <Link className={`font-semibold ${path === "/" ? " max-md:border-none max-md:border-t-2" : ""} border-b-black hover:font-extrabold hover:border-b-2 duration-150`} href={"/"}>Home</Link>
                <Link className={`font-semibold ${path === "/menu" ? "max-md:border-none max-md:border-t-2" : ""} border-b-black hover:font-extrabold hover:border-b-2 duration-150`} href={"/menu"}>Menu</Link>
                <Link className={`font-semibold ${path === "/about" ? " max-md:border-none max-md:border-t-2 " : ""} border-b-black hover:font-extrabold hover:border-b-2 duration-150`} href={"/about"}>About</Link>
                <Link className={`font-semibold ${path === "/contact" ? "max-md:border-none max-md:border-t-2" : ""} border-b-black hover:font-extrabold hover:border-b-2 duration-150`} href={"/contact"}>Contact</Link>
            </div >
            <div className='flex items-center gap-x-5'>
                <button className='rounded-full  bg-yellow-400' onClick={() => session?.status === "authenticated" ? router.push("/profile/0") : router.push("/login")}>
                    <div className='flex  self-end justify-center'>
                        <CgProfile size={25} />
                    </div>
                </button>
                {
                    session?.status === "authenticated" ?
                        (
                            <div className='flex gap-x-4'>
                                <div onClick={() => router.push("/cart")}><BsCart size={26} />
                                    <span className='absolute bottom-6 cursor-pointer translate-x-[-5px] bg-yellow-200 font-bold px-1 py-0 rounded-full  '>
                                        {2}
                                    </span>
                                </div>
                                <div onClick={() => router.push("/cart")}><GrFavorite size={26} />
                                    <span className='absolute bottom-6 cursor-pointer translate-x-[-5px] bg-yellow-200 font-bold px-1 py-0 rounded-full  '>
                                        {16}
                                    </span>

                                </div>
                            </div>
                        ) :
                        (
                            <div></div>
                        )
                }

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