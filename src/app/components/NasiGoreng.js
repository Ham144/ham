import Image from 'next/image'
import React, { useState } from 'react'
import { FaShippingFast } from 'react-icons/fa'
import { FaCartPlus } from "react-icons/fa";


const NasiGoreng = ({ props }) => {
    const [hover, setHover] = useState(false)

    const [menuItem, setMenuItem] = useState(props?.menuItem)
    const [description, setDescription] = useState(props?.description)
    const [basePrice, setBasePrice] = useState(props?.basePrice)
    const [photoUrl, setPhotoUrl] = useState(props?.photoUrl)
    const [categories, setCategories] = useState(props?.categories)

    return (


        <div className={`w-72 ${hover ? "" : "h-[440px]"} bg-gradient-radial from-white to-orange-200 shadow-md rounded-xl duration-1000 hover:scale-105 hover:shadow-xl `} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <a href="#">
                <Image className="h-80 w-72 object-cover rounded-t-xl" src={photoUrl} alt="Nasi Goreng" width={300} height={300} />
                <div className="px-4 py-3 w-72 ">
                    <p className={` font-light italic text-pretty ${hover ? "flex" : "hidden"}`}>{description}</p>
                    {categories.map((cat) => (
                        <span className="text-gray-400 mr-3 uppercase text-xs" key={cat}>{cat}</span>
                    ))}
                    <p className="text-lg text-wrap font-bold text-black truncate block capitalize">{menuItem}</p>
                    <div className="flex items-center">
                        <p className="text-lg font-semibold text-black cursor-auto my-3">${basePrice}</p>
                        <del>
                            <p className="text-sm text-gray-600 cursor-auto ml-2">${Number(basePrice) + 45}</p>
                        </del>
                        <div className='relative justify-center right-[-150px] bottom-7 gap-4 flex flex-col'>
                            <FaCartPlus size={30} className='hover:scale-y-125' />
                            <FaShippingFast size={30} className='hover:scale-110' />
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default NasiGoreng