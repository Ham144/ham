"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const ProfileBar = ({ isAdmin }) => {
    const path = usePathname()
    return (
        <div className={`${isAdmin ? "" : "hidden"}  fixed flex flex-col items-start translate-x-[-7px]  max-md:translate-x-[-39px]
        mt-3 
        md:gap-y-3
        z-30`}>
            <Link href={"http://localhost:3000/profile/0"} className={`${path === "profile/0" ? "buble-menu-selected" : "buble-menu"}`}>Profile</Link>
            <Link href={"/categories"} className={`${path === "categories" ? "buble-menu-selected" : "buble-menu"}`}>Categories</Link>
            <Link href={"/menu-items"} className={`${path === "menu-items" ? "buble-menu-selected" : "buble-menu"}`}>Menu Items</Link>
            <Link href={"/users"} className={`${path === "users" ? "buble-menu-selected" : "buble-menu"}`}>Users</Link>
        </div>
    )
}

export default ProfileBar