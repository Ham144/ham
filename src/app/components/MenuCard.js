import Image from 'next/image'
import React from 'react'
import { FaRegSave } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineCancelScheduleSend } from "react-icons/md";


const MenuCard = ({ menuItem, description, basePrice, photoUrl, categories }) => {
    return (
        <div className='flex justify-between w-full bg-slate-200 shadow-md mt-3 items-center'>

            <div className='flex  gap-x-3 gap-y-2 py-2 px-3 mt-3  border w-full'>
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
            <div className='editortab  flex flex-col items-center justify-self-end '>
                <div className='border hover:bg-blue-200 p-1 text-center flex flex-col items-center w-20 cursor-pointer'>
                    <MdOutlineCancelScheduleSend size={30} />
                    cancel edit
                </div>
                <div className='border hover:bg-blue-200 p-1 text-center flex flex-col items-center w-20 cursor-pointer'>
                    <MdDeleteForever size={30} />
                    delete
                </div>
                <div className='border hover:bg-blue-200 p-1 text-center flex flex-col items-center  w-20 cursor-pointer'>
                    <FaRegSave size={30} />
                    save
                </div>

            </div>
        </div>

    )
}

export default MenuCard