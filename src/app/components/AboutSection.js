
import Image from 'next/image'
import React from 'react'

const AboutSection = () => {
    return (
        <div className='md:flex max-md:flex-col w-full justify-between items-center flex-1  mt-[100px]  '>
            <Image
                className='w-[50%] scale-x-[-1] drop-shadow-xl border-2 border-orange-400 shadow-lg rounded-full '
                src={"/women.png"} alt="about" width={1000} height={1000} />
            <div className='flex flex-col text-wrap w-[50%] gap-y-4'>
                <h2 className='text-2xl text-center font-mono text-orange-500 '>About Us</h2>
                <h2 className=' text-center font-mono font-bold text-2xl'>"WHERE EVERY BITE IS A FLAVOR EXPLOSION"</h2>
                <p className='border-4 border-orange-400 rounded-full shadow-lg opacity-70  text-wrap w-[80%] mx-auto text-center px-5 py-6'>
                    Welcome to Nasi Goreng, where we bring you an unparalleled culinary experience with every bite you take. Our mission is to make your taste buds dance with joy and leave you craving more.
                </p>
                <p className='border-4 border-orange-400 rounded-full shadow-lg opacity-70  text-wrap w-[80%] mx-auto text-center px-5 py-6'>
                    At Nasi Goreng, we believe that food should be an adventure. That's why each of our recipes is crafted to deliver a burst of flavors that will take you on a delicious journey. From the first mouthful to the last, expect nothing less than a flavor explosion.
                </p>
            </div>
        </div>
    )
}

export default AboutSection