"use client"
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import Spinner from "../components/Spinner";
import useUserinfosProduct from "../components/hooks/useUserinfosProduct";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getAddedToCart, getCartLength, getFavoriteLength, getItemsInCart } from "@/features/cart/cartSlice";

export default function CartPage() {
    const route = useRouter()
    const session = useSession()
    const dispatch = useDispatch()
    session?.status == "unauthenticated" && redirect("/")
    let { user, setRefresh } = useUserinfosProduct()
    const [itemCheckedTotal, setItemCheckedTotal] = useState()
    dispatch(getCartLength(user?._id))
    dispatch(getFavoriteLength(user?._id))


    let data = useSelector(getAddedToCart)



    function CalculateTotal() {
        const filtered = data?.filter((item) => {
            return item?.checked == true
        })

        setItemCheckedTotal(filtered?.reduce((acc, item) => acc + (item.quantity * item?.price), 0))
        return (
            <>

                <tbody className="text-center ">
                    {
                        filtered?.length > 0 ? filtered?.map((item, i) => (
                            <tr key={item?._id}>
                                <th>{i + 1}</th>
                                <td className="text-start">{item?.name}</td>
                                <td>{item?.price}</td>
                                <td className="text-start">x{item?.quantity} = <span className="font-bold">${item.price * item.quantity}</span></td>
                            </tr>
                        )) : <div className="flex flex-col gap-4 w-full mx-auto">
                            <div className="flex gap-4 items-center">
                                <div className="skeleton w-16 h-12 mx-auto rounded-full shrink-0"></div>
                                <div className="flex flex-col gap-4">
                                    <div className="skeleton h-2 w-20"></div>
                                    <div className="skeleton h-2 w-28"></div>
                                </div>
                            </div>
                            <div className="skeleton h-32 w-full"></div>
                        </div>
                    }
                </tbody >
            </>
        )
    }


    function CartItems() {
        return (<>
            {data?.length == 0 ? <><p className="text-center">Your cart is empty</p></> : null}
            {!data || data == null ?
                <Spinner /> :
                data.map((item) => (
                    <CartItem key={item?.id} item={item} user_id={user?._id} />
                ))
            }
        </>)
    }



    useEffect(() => {
        CartItems()
        CalculateTotal()

    }, [itemCheckedTotal, data.checked, data])

    useEffect(() => {
        if (!itemCheckedTotal || itemCheckedTotal == undefined)
            toast.success('Your total is : ' + itemCheckedTotal + "$")
    }, [itemCheckedTotal])

    return (
        <div className="flex flex-col lg:w-full mx-auto p-6 space-y-4 sm:p-10 dark:bg-gray-50 dark:text-gray-800 min-h-screen">
            <h2 className="text-xl font-semibold text-center">Your cart</h2>

            {session.status == "authenticated" ? <CartItems />
                : <>Please Login first <Link href={"/login"} className="btn glass">Login</Link></>}
            <div className="space-y-1 text-right" >
                <label htmlFor="my_modal_7" className="btn" >Total: ${itemCheckedTotal} (click for detail)</label>
                <input type="checkbox" id="my_modal_7" className="modal-toggle" />
                <div className="modal" role="dialog">
                    <div className="modal-box">
                        <h3 className="text-lg font-bold">Total Detail :</h3>
                        <div className="overflow-x-auto">
                            <i>note: check item in cart to include</i>
                            <div className="table flex-1 ">
                                {/* head */}
                                {<tbody className="flex flex-col flex-1 w-full">
                                    <tr className="flex flex-row bg-orange-50 flex-1 w-[100%] ">
                                        <th>number</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                    </tr>
                                    <CalculateTotal />
                                </tbody>}
                            </div>
                            <div className="font-bold text-center text-2xl mx-auto">Total: ${itemCheckedTotal}</div>
                        </div>
                    </div>
                    <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
                </div>

            </div>
            <div className="flex justify-end space-x-4 ">
                <button type="button" className="hover:font-bold hover:border-4 duration-150 px-6 py-2 border rounded-md dark:border-violet-600" onClick={() => route.push("/menu")}>Back
                    <span className="sr-only sm:not-sr-only">to shop</span>
                </button>
                <button type="button" className="px-6 py-2 border hover:font-bold hover:border-4 duration-150 rounded-md dark:bg-violet-600 dark:text-gray-50 dark:border-violet-600" onClick={() => route.push("/checkout")}>
                    <span className="sr-only sm:not-sr-only">Continue to</span>Checkout
                </button>
            </div>
        </div>
    )
}

