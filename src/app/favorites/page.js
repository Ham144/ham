"use client"
import { useContext, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import useUserinfosProduct from "../components/hooks/useUserinfosProduct";
import Image from "next/image";
import { CartContext } from "../components/CartContext";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function FavoritesPage() {

    const { favorites } = useContext(CartContext)
    if (useSession().status == "unauthenticated") return redirect("/")


    return (
        <div className="w-full min-h-screen flex flex-col items-center mx-auto">
            <h1 className="text-3xl p-4 gap-3 flex items-center italic text-primer font-light">
                Favorites <FaHeart className="text-yellow-100" />
            </h1>
            <div className="grid grid-cols-2 mx-auto gap-6 ">
                {!favorites && <div className="text-center font-bold textarea-md absolute mx-auto">No Favorited item yet</div>}
                {favorites &&
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
                }
            </div>
        </div>
    );
}

//todo : fix favorite page, total number in cart and favorite, 
