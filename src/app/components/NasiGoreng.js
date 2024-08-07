import Image from 'next/image'
import React, { useLayoutEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaShippingFast } from 'react-icons/fa'
import { FaCartPlus } from "react-icons/fa";
import useUserinfosProduct from './hooks/useUserinfosProduct';
import { getCartLength } from '@/features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';


const NasiGoreng = ({ props }) => {
    const [hover, setHover] = useState(false)
    const { user } = useUserinfosProduct()
    const [userInfos, setUserInfos] = useState()
    const router = useRouter()

    const dispatch = useDispatch()
    function fetchingUserInfos() {
        try {
            fetch("/api/profile").then(res => res.json()).then(data => setUserInfos(data))

        } catch (error) {
            console.log(error)
        }
    }


    dispatch(getCartLength(user?._id))
    useLayoutEffect(() => {
        fetchingUserInfos()
    }, [])


    const menuItem = props?.menuItem
    const description = props?.description
    const basePrice = props?.basePrice
    const photoUrl = props?.photoUrl
    const categories = props?.categories
    const menuItemId = props?._id || props?.menuItemId

    async function addedToCart(menuItemId, name, quantity, price, image, addedDate, checked, userInfos_id) {
        if (!userInfos_id) {
            return toast.error("Please login first")
        }
        if (![menuItemId, name, quantity, price, image, addedDate].every(i => i != null)) {
            return toast.error("menuItemId, name, quantity, price, image, addedDate cannot be null")
        }
        const response = await fetch("/api/addedtocart", {
            method: "POST",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify({ menuItemId, name, quantity, price, image, addedDate, checked, userInfos_id }),
        })
        const data = await response.json()
        if (data.ok) {
            toast.success(data.msg)
        }
        else {
            toast(data.msg)
        }

    }

    function handleSingle() {
        router.push(`/menu/${menuItemId}`)
    }

    return (


        <div className={`w-72   bg-gradient-radial from-white to-orange-200 shadow-md rounded-xl duration-1000 cursor-pointer hover:scale-105 hover:shadow-xl relative`} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <div onClick={handleSingle} className={`${!hover ? "h-[430px]" : "500px"}}`}>
                <Image className="h-80 w-72 object-cover rounded-t-xl" src={photoUrl} alt="Nasi Goreng" width={300} height={300} />
                <div className="px-4 py-3 w-72 ">
                    <p className={` font-light italic text-pretty ${hover ? "flex" : "hidden"}`}>{description}</p>
                    {categories.map((cat) => (
                        <span className="text-gray-400 mr-3 uppercase text-xs" key={cat}>{cat}</span>
                    ))}
                    <p className="text-lg text-wrap font-bold text-black truncate block capitalize">{menuItem}</p>
                    <div className="flex items-center relative w-full">
                        <p className="text-lg font-semibold text-black  cursor-auto my-3">${basePrice}</p>
                        <del>
                            <p className="text-sm text-gray-600 cursor-auto ml-2">${Number(basePrice) + 45}</p>
                        </del>
                        <div className='absolute justify-center z-20 bottom-2 right-1 gap-4 flex '>
                            <FaCartPlus size={30} className='hover:scale-y-125' onClick={() => addedToCart(menuItemId, menuItem, 1, basePrice, photoUrl, new Date().toLocaleDateString(), true, userInfos?._id)} />
                            <FaShippingFast size={30} className='hover:scale-110' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NasiGoreng