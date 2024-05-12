import React from 'react'

const Spinner = () => {
    return (
        <div>
            <div className='grid grid-cols-3 md:w-[400px] max-md:w-[400px] border-b-4   '>

                <span className='font-bold text-3xl drop-shadow-xl animate-spin'>I</span>
                <span className='font-bold text-3xl drop-shadow-xl animate-spin'>I</span>
                <span className='font-bold text-3xl drop-shadow-xl animate-spin'>I</span>
                <span className='flex justify-center  text-6xl drop-shadow-xl animate-bounce font-extralight text-yellow-400'>O</span>
                <span className='flex justify-center  text-6xl drop-shadow-xl animate-bounce font-extralight text-yellow-800'>O</span>
                <span className='flex justify-center  text-6xl drop-shadow-xl animate-bounce font-extralight text-yellow-400'>O</span>
            </div>

        </div>

    )
}

export default Spinner