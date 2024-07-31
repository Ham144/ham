
import Image from 'next/image'
import React from 'react'

const Popular = (props) => {
    const { popular } = props
    return (
        <div className='flex flex-1'>
            <div className="card lg:card-side bg-white shadow-xl lg:h-[230px] max-md:w-full  ">
                <Image
                    className='object-cover rounded-md p-3 max-md:w-full max-md:h-44'
                    src={popular?.photoUrl} width={200} height={200} />
                <div className="card-body ">
                    <h2 className="card-title">{popular.menuItem}</h2>
                    <div className='truncate h-12 text-wrap'>Start from :
                        <span className="badge bg-orange-100 mx-3 font-extrabold">{popular.basePrice}$</span>
                    </div>
                    <span className='gap-x-3 flex'>
                        {popular?.categories?.map((category) => (
                            <span key={category} className="badge badge-ghost badge-sm">{category}</span>
                        ))}
                    </span>
                    <div className="card-actions justify-end">
                        <button className="btn bg-orange-300">Look</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popular