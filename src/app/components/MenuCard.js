import Image from 'next/image'
import React, { useState } from 'react'
import { FaEdit, FaRegSave } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineCancelScheduleSend } from "react-icons/md";


const MenuCard = ({ menuItem, description, basePrice, photoUrl, categories, _id }) => {

    const [inEdit, setInEdit] = useState(false)


    function editMenu(getId) {
        setInEdit(!inEdit)

    }


    return (
        <div className='flex justify-between w-full bg-slate-200 shadow-md mt-3 items-center' >

            <div className='flex  gap-x-3 gap-y-2 py-2 px-3 mt-3  border w-full' style={inEdit ? { border: "2px dashed black", backgroundColor: "#f7b86f" } : null}>
                <div className='flex flex-col items-center w-[20%] h-[200px] object-contain justify-center'>
                    <Image width={100} height={100} src={photoUrl || "/main-logo.png"} alt='photoUrl' className='w-full ' />
                    <input type="text" disabled={!inEdit} className={`absolute w-20 mt-2 translate-y-[80px] p-1 ${inEdit ? "" :
                        "hidden "} `} placeholder='Photo url' />
                </div>
                <div className='flex flex-col justify-around items-start gap-y-3 '>
                    <input type="text" value={menuItem} className={`${inEdit ? "" : ""} px-1`} disabled={!inEdit} />
                    <input type="text" value={description} className={``} disabled={!inEdit} />
                    <div>
                        price : <input type="text" value={basePrice} className={`w-12 p-1  text-center`} />
                        <span className='ml-2'>$</span>
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
                    <MdOutlineCancelScheduleSend size={20} />
                    cancel edit
                </div>
                <div className='border hover:bg-blue-200 p-1 text-center flex flex-col items-center w-20 cursor-pointer'>
                    <MdDeleteForever size={20} />
                    delete
                </div>
                <div className='border hover:bg-blue-200 p-1 text-center flex flex-col items-center  w-20 cursor-pointer' onClick={() => editMenu(_id)}>
                    <FaEdit size={20} />
                    Edit
                </div>
                <div className='border hover:bg-blue-200 p-1 text-center flex flex-col items-center  w-20 cursor-pointer'>
                    <FaRegSave size={20} />
                    save
                </div>

            </div>
        </div>

    )
}

export default MenuCard