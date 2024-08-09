"use client"
import { getUserData } from '@/features/user/userSlice'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useLayoutEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const MenuSinglePage = (props) => {
    const session = useSession()
    const { status } = session

    const menuItemId = props.params.menuItemId
    const [singleMenu, setSingleMenu] = useState()
    const user = useSelector(state => getUserData(state.user, status))

    const router = useRouter()


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
        if (session.status == "unauthenticated") toast.error("Please login first")

        fetchingSingle()
    }, [menuItemId])

    function handleBuy() {
        toast.success("Arrived, open the door now")
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


    const setCookie = (preFilter) => {
        sessionStorage.setItem("preFilter", preFilter)
        router.push("/menu")
    }

    return (
        <div className='flex flex-col lg:w-full overflow-x-clip lg:gap-y-4 gap-2 justify-center max-md:top-7 gap-x-2  min-h-screen  items-center mx-auto '>
            <div className='flex bg-orange-50 '>
                <div className='bg-gradient-to-tr from-amber-300 to-orange-500 rounded-lg ' />
                <h2 className='text-3xl text-start font-semibold text-pretty uppercase'>{singleMenu.menuItem}</h2>
            </div>
            <div className='flex relative justify-center items-center flex-col'>
                <img
                    className=' w-full rounded-md object-scale-down shadow-sm relative bg-transparent  lg:h-96 h-80'
                    src={singleMenu.photoUrl} width={500} height={500} />

            </div>
            <div className='text-slate-500 font-light text-center leading-4 gap-y-4'>

                <div className='flex gap-2 '>
                    {singleMenu.categories.map((item) => (
                        <span key={Math.random()} onClick={() => setCookie(item)} className='badge badge-ghost badge-sm p-4 cursor-pointer text-medium bg-orange-100 border border-white font-bold shadow-xl'>{item}</span>
                    ))}
                </div>
                <p className='text-center py-5'>{singleMenu.description}</p>
            </div>
            <div className='flex items-center justify-between gap-x-4 gap-y-2'>
                <button className="join-item btn btn-outline text-xs p-2" onClick={() => window.location = "/menu"}>Back to Menu</button>
                <button className="join-item btn bg-orange-200 border text-xs p-2" disabled={status == "unauthenticated"} onClick={handleAddtoCart}>Add To Cart</button>
                <button className="join-item btn btn-outline text-xs p-2" onClick={handleBuy}>Buy Now {singleMenu.basePrice}$</button>
            </div>
        </div>
    )
}

export default MenuSinglePage