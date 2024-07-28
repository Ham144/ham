"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const page = (props) => {
    const menuItemId = props.params.menuItemId
    const searchParams = useSearchParams()
    const menuItem = searchParams.get("menuItem")
    const description = searchParams.get("description")
    const basePrice = searchParams.get("basePrice")
    const photoUrl = searchParams.get("photoUrl")
    const categories = searchParams.get("categories")

    const router = useRouter()

    function handleBuy() {
        console.log("buy button");
    }

    function handleAddToChart() {
        console.log("add to chart")
    }

    return (
        <div className='flex flex-col lg:w-full lg:gap-y-4 gap-2 lg:justify-center max-md:top-7 gap-x-2 w-96 min-h-screen  items-center mx-auto '>
            <div className='flex bg-orange-50 '>
                <div className='bg-gradient-to-tr from-amber-300 to-orange-500 rounded-lg ' />
                <h2 className='text-3xl text-start font-semibold text-pretty uppercase'>{menuItem}</h2>
            </div>
            <div className='flex justify-center items-center flex-col'>
                <img
                    className='rounded-full shadow-sm'
                    src={photoUrl} width={300} height={300} />
            </div>
            <p className='text-slate-500 font-light leading-4'>
                {description}
            </p>
            <div className='flex items-center justify-between gap-x-4 gap-y-2'>
                <button className="join-item btn btn-outline" onClick={() => router.back()}>Back to Menu</button>
                <button className="join-item btn btn-outline" onClick={handleAddToChart}>Add To Chart</button>
                <button className="join-item btn btn-outline" onClick={handleBuy}>Buy Now{basePrice}$</button>
            </div>
        </div>
    )
}

export default page