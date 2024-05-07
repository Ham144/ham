import Image from 'next/image'
import React from 'react'


const MenuCard = ({ menuItem, description, basePrice, photoUrl, categories }) => {
    return (
        <div className='flex gap-x-3 gap-y-2 py-2 px-3 mt-3 bg-slate-100 shadow-md border '>
            <div className='flex items-center w-[20%] h-[200px] object-contain'>
                <Image width={100} height={100} src={photoUrl || "/main-logo.png"} alt='photoUrl' className='w-full ' />
            </div>
            <div className='flex flex-col justify-around items-start gap-y-3 '>
                <h2 className='font-extrabold'>{menuItem}</h2>
                <p className='font-bold text-wrap text-slate-600'>{description}</p>
                <div>
                    price : <span className='bg-sekunder ' style={{ stroke: 'ActiveBorder' }}> {basePrice}$</span>
                </div>
                <div className='flex gap-2'>
                    {categories?.map((categ) => (
                        <span key={categ._id} className='flex px-3 py-2 rounded-full bg-yellow-400 text-black font-light'>{categ}</span>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default MenuCard