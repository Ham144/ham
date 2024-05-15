import Image from 'next/image'
import React from 'react'

const NasiGoreng = (props) => {
    const menuItem = "nasi goreng ayam"
    const description = "lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    const basePrice = "23"
    const photoUrl = "/nasigorengayam.png"
    const categories = ["chinese", "spicy"]

    return (
        <div className='flex flex-col  items-center'>
            <div className='flex flex-col font-bold items-center'>
                <section id="Projects"
                    className="mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center  justify-center  gap-y-20 gap-x-14 mt-10 mb-5 ">

                    <div className="w-72 bg-gradient-radial from-white to-orange-200 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                        <a href="#">
                            <Image className="h-80 w-72 object-cover rounded-t-xl" src={photoUrl} alt="Nasi Goreng" width={300} height={300} />
                            <div className="px-4 py-3 w-72">
                                {categories.map((cat) => (
                                    <span className="text-gray-400 mr-3 uppercase text-xs" key={cat}>{cat}</span>
                                ))}
                                <p className="text-lg font-bold text-black truncate block capitalize">{menuItem}</p>
                                <div className="flex items-center">
                                    <p className="text-lg font-semibold text-black cursor-auto my-3">${basePrice}</p>
                                    <del>
                                        <p className="text-sm text-gray-600 cursor-auto ml-2">${Number(basePrice) + 45}</p>
                                    </del>
                                    <div className="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                        fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                                        <path fillRule="evenodd"
                                            d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                        <path
                                            d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                    </svg></div>
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