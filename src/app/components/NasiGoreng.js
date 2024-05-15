import Image from 'next/image'
import React, { useState } from 'react'
import { FaShippingFast } from 'react-icons/fa'
import { FaCartPlus } from "react-icons/fa";


const NasiGoreng = (props) => {
    const [hover, setHover] = useState(false)

    const menuItem = "nasi goreng ayam"
    const description = "lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    const basePrice = "23"
    const photoUrl = "/nasigorengayam.png"
    const categories = ["chinese", "spicy"]

    return (
        <div className='flex flex-col  items-center' >
            <div className='flex flex-col font-bold items-center'>
                <section id="Projects"
                    className="mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center  justify-center  gap-y-20 gap-x-14 mt-10 mb-5 ">

                    <div className="w-72 bg-gradient-radial from-white to-orange-200 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl transition-all" onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                        <a href="#">
                            <Image className="h-80 w-72 object-cover rounded-t-xl" src={photoUrl} alt="Nasi Goreng" width={300} height={300} />
                            <div className="px-4 py-3 w-72 ">
                                <p className={` font-light italic text-pretty ${hover ? "flex" : "hidden"}`}>{description}</p>
                                {categories.map((cat) => (
                                    <span className="text-gray-400 mr-3 uppercase text-xs" key={cat}>{cat}</span>
                                ))}
                                <p className="text-lg font-bold text-black truncate block capitalize">{menuItem}</p>
                                <div className="flex items-center">
                                    <p className="text-lg font-semibold text-black cursor-auto my-3">${basePrice}</p>
                                    <del>
                                        <p className="text-sm text-gray-600 cursor-auto ml-2">${Number(basePrice) + 45}</p>
                                    </del>
                                    <div className='relative justify-center right-[-150px] bottom-7 gap-4 flex flex-col'>
                                        <FaCartPlus size={30} className='hover:scale-y-125' />
                                        <FaShippingFast size={30} className='hover:scale-110' aria-label='Add to cart' />
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </section>

            </div>
            <p className='bottom-5 text-3xl flex self-center font-extralight '>
                END OF CONTENT
            </p>
        </div>
    )
}

export default NasiGoreng