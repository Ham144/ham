"use client"
import React from 'react'
import ProfileBar from '../components/ProfileBar'
import Image from 'next/image'

const MenuItemsPage = () => {

    function handleNewItem(ev) {
        ev.preventDefault()
        console.log("teste")
    }

    return (
        <div className='px-4 flex  min-h-screen'>
            <ProfileBar isAdmin={true} />

            <form onSubmit={handleNewItem} className=' mx-auto border px-9 rounded-xl shadow-md py-4 mt-3 w-[600px]  max-md:w-[400px]'>
                <div className='flex flex-col items-center gap-y-4'>
                    <Image src={'/main-logo.png'} width={100} height={100} alt='photo holder' />
                    <div className='flex gap-x-3 items-stretch'>
                        <input type="text" className='flex px-2 bg-slate-100 ' placeholder='paste link photo here' />
                        <button className='bg-primer'>save</button>
                    </div>
                </div>
                <div className='flex gap-x-5 justify-between  font-bold uppercase  mt-3 items-center'>
                    <label htmlFor="menu-name" className='text-wrap'>menu name</label>
                    <input type="text" className='flex px-3 py-1 rounded-full w-[60%]  bg-slate-300 font-bold ' />
                </div>
                <div className='flex gap-x-5 justify-between  font-bold uppercase  mt-3 '>
                    <label htmlFor="menu-name" className='text-wrap'>Description</label>
                    <input type="text" className='flex h-[100px] px-3 py-1 rounded-sm w-[60%]  bg-slate-300 font-bold text-wrap ' />
                </div>
                <div className='flex gap-x-5 justify-between  font-bold uppercase  mt-3 items-center'>
                    <label htmlFor="menu-name" className='text-wrap'>menu name</label>
                    <input type="text" className='flex px-3 py-1 rounded-full w-[60%]  bg-slate-300 font-bold ' />
                </div>

            </form>
        </div>
    )
}

export default MenuItemsPage