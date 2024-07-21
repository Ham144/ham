import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { IoIosRemoveCircleOutline } from 'react-icons/io'
import { addPlusMinusQuantity, changeIsFavorite, deleteOne, getFavoriteLength, getIsChecked, getIsFavorite, getQuantityofItem } from '@/features/cart/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { changeCheck } from '@/features/cart/cartSlice'

const CartItem = (props) => {
    const { ...item } = props.item
    const { user_id } = props
    const { addedDate, checked, image, menuItemId, name, price, quantity, isFavorite } = item
    const dispatch = useDispatch()
    const quantityOfItem = useSelector((state) => getQuantityofItem(state, menuItemId))
    const isChecked = useSelector((state) => getIsChecked(state, menuItemId))
    const isFavorited = useSelector((state) => getIsFavorite(state, menuItemId))

    async function setFavorited(_id, isFavorite) {
        const response = await fetch(`/api/isfavorite`, {
            method: 'POST',
            body: JSON.stringify({ _id, isFavorite, userInfos_id: user_id },
            )
        })
        if (response.ok) {
            const data = await response.json()
            if (data.ok) {
                toast.success(data.msg)
                dispatch(changeIsFavorite({ menuItemId, isFavorite, userInfos_id: user_id }))
                dispatch(getFavoriteLength(user_id))
            } else {
                toast.error(data.msg)
            }
        } else {
            toast.error("i dont even ttry")
        }
    }

    function handleQuantity(plusMinus) {
        try {
            dispatch((addPlusMinusQuantity({ menuItemId, userInfos_id: user_id, plusMinus, quantity })))
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    async function resetCheked(bool, _id) {
        const response = await fetch("/api/addedtocart", {
            method: "PATCH",
            body: JSON.stringify({ checked: bool, _id, userInfos_id: user_id }),
        })
        if (response.ok) {
            const data = await response.json();
            if (data.ok) {
                return
            }
            else {
                toast.error("patched failed")
            }
        }
    }


    return (
        <div >
            <ul className="flex flex-col divide-y dark:divide-gray-300" >
                <li className="flex flex-col py-6 sm:flex-row sm:justify-between border p-4">
                    <div className="flex w-full space-x-2 sm:space-x-4">
                        <Image className="flex-shrink-0 object-cover w-20 h-20 dark:border- rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500" src={image} alt="Polaroid camera" width={300} height={300} />
                        <div className="flex flex-col justify-between w-full pb-4">
                            <div className="flex justify-between w-full pb-2 space-x-2">
                                <div className="space-y-1">
                                    <h3 className="text-lg font-semibold leading-snug sm:pr-8">{name}</h3>
                                    <p className="text-sm dark:text-gray-600 font-semibold">Quantity : {quantityOfItem}</p>

                                </div>

                                <div className="text-right">
                                    <p className="text-lg font-semibold">${price}</p>
                                    <p className="text-sm line-through dark:text-gray-400">${price + 30}</p>
                                </div>
                            </div>
                            <div className='flex space-x-2 flex-1 font-extrabold '>
                                <button onClick={() => {
                                    handleQuantity("minus")
                                }} className='btn glass border  rounded-lg bg-orange-200 px-7 text-2xl'>-</button>
                                <button onClick={() => handleQuantity("plus")} className='btn glass border  rounded-lg bg-orange-200 px-7 text-2xl'>+</button>
                            </div>
                            <div className="flex text-sm divide-x">
                                <button type="button" className="hover:font-bold hover:text-red-500 flex items-center px-2 py-1 pl-0 space-x-1" onClick={async () => {
                                    try {
                                        const data = await axios.delete(`/api/addedtocart`, { data: { menuItemId, userInfos_id: user_id } })
                                        if (data.data.ok) {
                                            toast.success(data.data.msg)
                                            setDeletedCondition(true)
                                            return
                                        }
                                    } catch (error) {
                                        console.log(error)
                                    }
                                }}>
                                    <IoIosRemoveCircleOutline size={26} />
                                    <span>Remove</span>
                                </button>
                                <button type="button" className="hover:font-bold hover:text-yellow-500 flex items-center px-2 py-1 space-x-1">
                                    <input type="checkbox" id='favorited' className="toggle bg-yellow-500" checked={isFavorited} onChange={(e) => setFavorited(menuItemId, e.target.checked)} />
                                    <label htmlFor="favorited">Favorite</label>
                                </button>
                            </div>
                            <div className='flex flex-col text-sm align-middle font-bold text-wrap'>
                                <div>added date : {addedDate}</div>
                                <div>menu item id : {menuItemId}</div>
                            </div>
                        </div>
                        <div className="flex flex-col w-14 items-center justify-center h-full ">
                            <input type="checkbox" className="checkbox checkbox-warning" checked={isChecked} onChange={async () => {
                                try {
                                    dispatch(changeCheck({ menuItemId, isChecked: !isChecked }))
                                    resetCheked(!isChecked, menuItemId)
                                } catch (error) {
                                    toast.error(error.message)
                                }

                            }} title='unchecked to exclude and vice versa' />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default CartItem