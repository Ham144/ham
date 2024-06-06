"use client"
import { useContext, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import useUserinfosProduct from "../components/hooks/useUserinfosProduct";
import Image from "next/image";
import { CartContext } from "../components/CartContext";

export default function FavoritesPage() {

    const { favorites } = useContext(CartContext)


    return (
        <div className="w-full min-h-screen flex flex-col items-center mx-auto">
            <h1 className="text-3xl p-4 gap-3 flex items-center italic text-primer font-light">
                Favorites <FaHeart className="text-yellow-100" />
            </h1>
            <div className="grid grid-cols-2 mx-auto gap-6 ">
                {favorites?.length > 0 ?
                    favorites.map((item, index) => (
                        <div key={index} className="card w-full h-[500px] mx-auto glass">
                            <figure>
                                <Image src={item.image} alt={item.name} width={400} height={200} />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">Quantity : {item.quantity}</h2>
                                <p className="truncate">IDProduct-{item.menuItemId}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Look</button>
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    <div className="flex flex-col gap-4 w-52">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>
                }
            </div>
        </div>
    );
}

//todo : fix favorite page, total number in cart and favorite, 
