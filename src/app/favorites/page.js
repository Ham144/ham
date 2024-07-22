"use client"
import { FaHeart } from "react-icons/fa";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { redirect, useSelectedLayoutSegment } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeIsFavorite, getAddedToCart } from "@/features/cart/cartSlice";
import { getUserData } from "@/features/user/userSlice";

export default function FavoritesPage() {

    const auth = useSession().status
    if (auth != "authenticated") {
        toast.error("Please login first")
        return redirect("/login")
    }
    const dispatch = useDispatch()
    const userData = useSelector((state) => getUserData(state, auth))
    const data = useSelector(getAddedToCart).filter(item => item.isFavorite && item?.userInfos_id == userData?.user?._id)


    return (
        <div className="w-full min-h-screen flex flex-col items-center mx-auto">
            <h1 className="text-3xl p-4 gap-3 flex items-center italic text-primer font-light">
                Favorites <FaHeart className="text-yellow-100" />
            </h1>
            <div className="grid grid-cols-2 mx-auto gap-6 ">
                {!data && <div className="text-center font-bold textarea-md absolute mx-auto">No Favorited item yet</div>}
                {data &&
                    data?.map((item, index) => (


                        <div key={index} className="card w-full h-[500px] mx-auto glass">
                            <figure className="rounded mt-3 pt-4">
                                <Image src={item.image} alt={item.name} width={400} height={200} />
                            </figure>
                            <div className="card-body">
                                <h1 className="card-title bg-orange-200 p-3 rounded-sm">Product Name : {item.name}</h1>
                                <h2 className="card-title">Quantity in cart : {item.quantity}</h2>
                                <h3 className="card-title">Base Price : {item.price}$</h3>
                                <h3 className="card-title">in Cart Since : {item.addedDate}</h3>
                                <p className="truncate">IDProduct-{item.menuItemId}</p>
                                <div className="card-actions justify-between">
                                    <button className="btn btn-primary">Look</button>
                                    <label onClick={async () => {
                                        try {
                                            const data = await axios.post("/api/isfavorite", {
                                                _id: item?.menuItemId,
                                                isFavorite: !item?.isFavorite,
                                                userInfos_id: item?.userInfos_id
                                            })
                                            if (data.data.ok) {
                                                dispatch(changeIsFavorite({ menuItemId: item?.menuItemId, userInfos_id: item?.userInfos_id, isFavorite: !item?.isFavorite }))
                                                toast.success(data.data.msg)
                                            }
                                            return fetchingFavorites()
                                        } catch (error) {
                                            console.log(error)
                                        }
                                    }} className="label cursor-pointer">remove from favorite?   <span className="label-text">{item.isFavorite}</span>
                                        <h3 className="text-lg px-2 font-bold font-mono text-red-500 border border-red-400 rounded ml-4 hover:bg-red-100">
                                            Delete
                                        </h3>
                                    </label>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div >
    );
}

