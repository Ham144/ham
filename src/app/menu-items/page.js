"use client"
import React, { useState } from 'react'
import ProfileBar from '../components/ProfileBar'
import Image from 'next/image'

const MenuItemsPage = () => {
    const [menuItem, setMenuItem] = useState("")
    const [description, setDescription] = useState("")
    const [basePrice, setBasePrice] = useState(0)


    async function handleNewItem(ev) {
        ev.preventDefault()
        try {
            const response = await fetch('/api/menuitems', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    menuItem, description, basePrice
                })
            })
            if (response.ok) {
                console.log("berhasil mengirim menuitems")
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='px-4 flex  min-h-screen'>
            <ProfileBar isAdmin={true} />

            <form onSubmit={handleNewItem} className=' flex flex-col gap-y-6 mx-auto border px-9 rounded-xl shadow-md py-4 mt-3 w-[600px]  max-md:w-[400px] '>
                <div className='flex flex-col items-center gap-y-4'>
                    <Image src={'/main-logo.png'} width={100} height={100} alt='photo holder' />
                    <div className='flex gap-x-3 items-stretch'>
                        <input type="text" className='flex px-2 bg-slate-100 ' placeholder='paste link photo here' />
                        <button className='bg-primer'>save</button>
                    </div>
                </div>
                <div className='flex gap-x-5 justify-between  font-bold uppercase  mt-3 items-center'>
                    <label htmlFor="menu-name" className='text-wrap'>menu name</label>
                    <input type="text" className='flex px-3 py-1 rounded-full w-[60%]  bg-slate-300 font-bold ' value={menuItem} onChange={e => setMenuItem(e.target.value)} />
                </div>
                <div className='flex gap-x-5 justify-between  font-bold uppercase  mt-3 '>
                    <label htmlFor="description" className='text-wrap'>Description</label>
                    <input type="text" id='description' className='flex bg-slate-300 px-2 py-1 w-[60%] rounded-full' value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div className='flex gap-x-5 justify-between  font-bold uppercase  mt-3 items-center'>
                    <label htmlFor="base-price" className='text-wrap'>base price</label>
                    <input type="text" className='flex px-3 py-1 rounded-full w-[60%]  bg-slate-300 font-bold ' value={basePrice} onChange={e => setBasePrice(e.target.value)} />
                </div>
                <button className='bg-sekunder hover:bg-slate-200 w-full mt-3 '>Submit</button>

            </form>
        </div>
    )
}

export default MenuItemsPage