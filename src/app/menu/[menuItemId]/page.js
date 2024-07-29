"use client"
import { getUserData } from '@/features/user/userSlice'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useLayoutEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const page = (props) => {
    const session = useSession()
    const { status } = session

    const menuItemId = props.params.menuItemId
    const [singleMenu, setSingleMenu] = useState()
    const user = useSelector(state => getUserData(state.user, status))



    async function fetchingSingle() {
        try {
            if (menuItemId == undefined) throw new Error("menuItemId not found")
            const res = await axios.post("/api/menuitems/", { menuItemId })
            if (res.data.ok == true) {
                setSingleMenu(res.data.data)
            }
            else console.log("error fetching single")
        } catch (error) {
            console.log(error)
        }
    }

    useLayoutEffect(() => {
        fetchingSingle()
    }, [menuItemId])

    function handleBuy() {
        console.log("buy button");
    }

    async function handleAddtoCart() {
        try {
            const data = await axios.post("/api/addedtocart", {
                menuItemId: singleMenu._id,
                name: singleMenu.menuItem,
                quantity: 1,
                price: singleMenu.basePrice,
                image: singleMenu.photoUrl,
                addedDate: new Date(),
                checked: true,
                userInfos_id: user._id
            })
            if (!data.data.ok) toast.success(data.data.msg)
            else toast.success(data.data.msg)
        } catch (error) {
            console.log(error)
        }

    }

    if (!singleMenu) return <span className="loading min-h-screen mx-auto flex self-center items-center justify-center  w-[40%] loading-ring "></span>

    return (
        <div className='flex flex-col lg:w-full lg:gap-y-4 gap-2 justify-center max-md:top-7 gap-x-2 w-96 min-h-screen  items-center mx-auto '>
            <div className='flex bg-orange-50 '>
                <div className='bg-gradient-to-tr from-amber-300 to-orange-500 rounded-lg ' />
                <h2 className='text-3xl text-start font-semibold text-pretty uppercase'>{singleMenu.menuItem}</h2>
            </div>
            <div className='flex relative justify-center items-center flex-col'>
                <img
                    className='rounded-full w-full object-scale-down shadow-sm relative bg-transparent   lg:h-96 h-80'
                    src={singleMenu.photoUrl} width={500} height={500} />
                <div className='flex gap-2 absolute self-center top-1'>
                    {singleMenu.categories.map((item) => (
                        <span className='badge badge-ghost badge-sm p-4 cursor-pointer text-medium bg-orange-100 border border-white font-bold shadow-xl'>{item}</span>
                    ))}
                </div>
            </div>
            <p className='text-slate-500 font-light leading-4'>
                {singleMenu.description}
            </p>
            <div className='flex items-center justify-between gap-x-4 gap-y-2'>
                <button className="join-item btn btn-outline" onClick={() => window.location = "/menu"}>Back to Menu</button>
                <button className="join-item btn bg-orange-200 border" onClick={handleAddtoCart}>Add To Cart</button>
                <button className="join-item btn btn-outline" onClick={handleBuy}>Buy Now {singleMenu.basePrice}$</button>
            </div>
        </div>
    )
}

export default page