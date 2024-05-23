"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GrFavorite } from "react-icons/gr";
import { IoIosRemoveCircleOutline } from "react-icons/io";


export default function CartPage() {
    const route = useRouter()
    return (
        <div className="flex flex-col max-w-3xl mx-auto p-6 space-y-4 sm:p-10 dark:bg-gray-50 dark:text-gray-800 min-h-screen">
            <h2 className="text-xl font-semibold">Your cart</h2>
            <ul className="flex flex-col divide-y dark:divide-gray-300">
                <li className="flex flex-col py-6 sm:flex-row sm:justify-between border p-4">
                    <div className="flex w-full space-x-2 sm:space-x-4">
                        <Image className="flex-shrink-0 object-cover w-20 h-20 dark:border- rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500" src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&amp;ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80" alt="Polaroid camera" width={300} height={300} />
                        <div className="flex flex-col justify-between w-full pb-4">
                            <div className="flex justify-between w-full pb-2 space-x-2">
                                <div className="space-y-1">
                                    <h3 className="text-lg font-semibold leading-snug sm:pr-8">Polaroid camera</h3>
                                    <p className="text-sm dark:text-gray-600 font-semibold">Quantity : </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-semibold">59.99€</p>
                                    <p className="text-sm line-through dark:text-gray-400">75.50€</p>
                                </div>
                            </div>
                            <div className="flex text-sm divide-x">
                                <button type="button" className="hover:font-bold hover:text-red-500 flex items-center px-2 py-1 pl-0 space-x-1">
                                    <IoIosRemoveCircleOutline size={26} />
                                    <span>Remove</span>
                                </button>
                                <button type="button" className="hover:font-bold hover:text-yellow-500 flex items-center px-2 py-1 space-x-1">
                                    <GrFavorite size={26} />
                                    <span>Add to favorites</span>
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col w-14 items-center justify-center ">
                            <input type="checkbox" className="w-full h-full" />
                        </div>
                    </div>
                </li>
            </ul>
            <div className="space-y-1 text-right">
                <p>Total amount:
                    <span className="font-semibold">357 €</span>
                </p>

            </div>
            <div className="flex justify-end space-x-4 ">
                <button type="button" className="hover:font-bold hover:border-4 duration-150 px-6 py-2 border rounded-md dark:border-violet-600" onClick={() => window.history.back()}>Back
                    <span className="sr-only sm:not-sr-only">to shop</span>
                </button>
                <button type="button" className="px-6 py-2 border hover:font-bold hover:border-4 duration-150 rounded-md dark:bg-violet-600 dark:text-gray-50 dark:border-violet-600" onClick={() => route.push("/checkout")}>
                    <span className="sr-only sm:not-sr-only">Continue to</span>Checkout
                </button>
            </div>
        </div>
    )
}

//todo: addedtocart model menerima id,name,quantity,price,image, dari model Menuitem, tambahan addedDate, cheked=true
//todo: 