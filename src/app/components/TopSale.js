import Image from 'next/image'
import React from 'react'

const TopSale = ({ topSale }) => {
    return (
        < div className="flex flex-wrap w-[52%] pb-20 mx-auto" >
            {
                topSale?.length > 0 &&
                topSale.map((item) => (
                    <div className="card mt-2 px-4 card-side bg-base-100 hover:bg-base-200 shadow-xl mb-5 w-full h-44" key={item?._id}>
                        <figure><Image src={item?.photoUrl} className="w-full  bg-cover" width={`200`} height={`200`} alt="Movie" /></figure>
                        <div className="card-body w-[60%] h-full flex justify-center">
                            <h2 className="card-title uppercase">{item?.menuItem}</h2>
                            <div className="dropdown">
                                <label tabIndex={0} className="btn m-1">Description</label>
                                <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-primary text-primary-content">
                                    <div className="card-body">
                                        <h3 className="card-title">Description</h3>
                                        <p>{item?.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card-actions justify-end ">
                                <button className="btn bg-orange-400 " onClick={() => { router.push("/menu") }}>Look</button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default TopSale