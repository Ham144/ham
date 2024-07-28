
import React from 'react'

const WhyChooseUs = () => {

    const reasons = [
        {
            title: "Global Fried Rice Delights",
            description: "At [Your Fried Rice Website Name], we take you on a culinary journey across the globe with our diverse fried rice recipes. From the aromatic spices of Thailand to the savory flavors of Chinese cuisine, our menu features authentic and innovative dishes from different countries, ensuring there's always something new and exciting for your taste buds."
        },
        {
            title: "Five-Star Taste at Affordable Prices",
            description: "We believe that delicious, high-quality food should be accessible to everyone. That's why we offer our mouth-watering fried rice at prices that won't break the bank. Enjoy the rich, complex flavors of five-star cuisine without the hefty price tag."
        },
        {
            title: "Always Offering New Variants",
            description: "Our team of chefs is dedicated to creativity and innovation. We regularly update our menu with new and exciting fried rice variants, so you can always look forward to discovering unique flavors and combinations. From classic favorites to bold new creations, there's always something fresh to try."
        },
        {
            title: "Satisfaction Guaranteed",
            description: "Your satisfaction is our top priority. If your food isn't cooked to perfection or fails to arrive, we guarantee to make it right. Enjoy peace of mind knowing that we stand behind the quality and reliability of our service."
        }
    ]

    const Reasons = ({ reason }) => {
        return (
            <div className='flex flex-1 '>
                <div className="card w-96 bg-base-100 shadow-xl image-full ">
                    <img src="/main-logo.png" className='bg-contain ' alt="Shoes" />
                    <div className="card-body ">
                        <h2 className="card-title  font-bold text-2xl text-center">{reason.title}</h2>
                        <p className='text-center drop-shadow-md text-slate-200'>{reason.description}</p>
                        <div className="card-actions justify-end ">
                            <button className="btn bg-yellow-600">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={`flex flex-1  flex-col mt-12 mx-auto justify-center  items-center`}
        >
            <h2 className='text-2xl text-center font-mono text-orange-500 py-4'>Why Choose Us?</h2>
            <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-12   gap-3  items-center mx-auto justify-center self-center'>
                {reasons.map((item) => (

                    <Reasons key={item.title} reason={item} />
                ))}
            </div>
        </div>
    )
}

export default WhyChooseUs