"use client"
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BsCart } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { GrFavorite } from "react-icons/gr";
import { useSelector } from 'react-redux'


const Navbar = () => {
    const session = useSession() //data return authentication semua disini
    const totalProductinCart = useSelector((state) => state.cart.cartLength)
    const totalFavorites = useSelector((state) => state.cart.favoriteLength)
    const path = usePathname()
    const router = useRouter()

    const cleanProps = (props, disallowed = ['bis_skin_checked']) => {
        return Object.keys(props)
            .filter(key => !disallowed.includes(key))
            .reduce((acc, key) => {
                acc[key] = props[key];
                return acc;
            }, {});
    };

    console.log(session.status)

    return (
        <nav className='flex fixed justify-between items-center md:px-5 px-1 py-4 w-full md:backdrop-blur-md shadow-md  max-md:px-2 
    bg-gradient-to-l from-gray-200 via-orange-200 to-stone-100 z-30' {...cleanProps}>
            <div >
                <Image className='hover:animate-bounce max-md:w-[3rem] max-md:pl-3' src={"/main-logo.png"} alt='logo' width={70} height={70} />
            </div>
            <div className='md:flex  max-md:mx-auto max-md:fixed max-md:flex max-md:justify-around  max-md:border-t-2 max-md:pt-4 max-md:duration-500 max-md:rounded-xl max-md:bg-yellow-500 max-md:text-white max-md:py-3 max-md:bottom-0  md:items-center md:justify-between md:gap-x-5  
            z-40 max-md:w-full max-md:translate-x-[-7px]
            '>
                <Link className={`font-semibold ${path === "/" ? " max-md:border-none max-md:border-t-2" : ""} border-b-black hover:font-extrabold hover:border-b-2 duration-150`} href={"/"}>Home</Link>
                <Link className={`font-semibold ${path === "/menu" ? "max-md:border-none max-md:border-t-2" : ""} border-b-black hover:font-extrabold hover:border-b-2 duration-150`} href={"/menu"}>Menu</Link>
                <Link className={`font-semibold ${path === "/about" ? " max-md:border-none max-md:border-t-2 " : ""} border-b-black hover:font-extrabold hover:border-b-2 duration-150`} href={"/about"}>About</Link>
                <Link className={`font-semibold ${path === "/contact" ? "max-md:border-none max-md:border-t-2" : ""} border-b-black hover:font-extrabold hover:border-b-2 duration-150`} href={"/contact"}>Contact</Link>
            </div >
            <div className='flex items-center gap-x-5'>

                {
                    session?.status === "authenticated" ?
                        (

                            <div className='flex gap-x-4'>
                                <button className='rounded-full  lg:mr-4 mr-3 ' title='profile current user' onClick={() => session?.status === "authenticated" ? router.push("/profile/0") : router.push("/login")}>
                                    <div className='flex  self-end justify-center'>
                                        <CgProfile size={25} />
                                    </div>
                                </button>
                                <div className='cursor-pointer' onClick={() => router.push("/cart")}><BsCart size={26} />
                                    <span title='the amount of item in total cheked and unchecked' className='absolute bottom-6 cursor-pointer translate-x-[-5px] bg-yellow-200 font-bold px-1 py-0 rounded-full  '>
                                        {totalProductinCart}
                                    </span>
                                </div>
                                <div className='cursor-pointer' onClick={() => router.push("/favorites")}><GrFavorite size={26} />
                                    <span title='the product you favorited' className='absolute bottom-6 cursor-pointer translate-x-[-5px] bg-yellow-200 font-bold px-1 py-0 rounded-full  '>
                                        {totalFavorites}
                                    </span>

                                </div>
                            </div>
                        ) :
                        (
                            <div></div>
                        )
                }

                {session?.status !== "authenticated" ?
                    <div className='flex lg:gap-x-5 gap-x-2 '>
                        <button onClick={() => router.push("/login")} className='bg-sekunder max-md:text-xs  ' >Login</button>
                        <button onClick={() => router.push("/register")} className='bg-primer max-md:text-xs  ' >Register</button>
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