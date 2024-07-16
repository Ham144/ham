"use client"
import { FaHeart } from "react-icons/fa";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import useUserinfosProduct from "../components/hooks/useUserinfosProduct";
import axios from "axios";

export default function FavoritesPage() {

    if (useSession().status == "unauthenticated") return redirect("/")
    const { data, user } = useUserinfosProduct()
    const favorites = data?.filter(item => item.isFavorite)
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
                            <figure className="rounded mt-3 pt-4">
                                <Image src={item.image} alt={item.name} width={400} height={200} />
                            </figure>
                            <div className="card-body">
                                <h1 className="card-title bg-orange-200 p-3 rounded-sm">Product Name : {item.name}</h1>
                                <h2 className="card-title">Quantity in cart : {item.quantity}</h2>
                                <h3 className="card-title">Base Price : {item.price}</h3>
                                <h3 className="card-title">in Cart Since : {item.addedDate}</h3>
                                <p className="truncate">IDProduct-{item.menuItemId}</p>
                                <div className="card-actions justify-between">
                                    <button className="btn btn-primary">Look</button>
                                    <label onClick={async () => {
                                        try {
                                            await axios.get("/api/isfavorite", {
                                                _id: item?.menuItemId,
                                                isFavorite: !item?.isFavorite,
                                                userInfos_id: item?.userInfos_id
                                            })

                                        } catch (error) {
                                            console.log(error)
                                        }
                                    }} className="label cursor-pointer">favorited:  <span className="label-text">{item.isFavorite}</span>
                                        <input type="checkbox" className="toggle" checked={item.isFavorite} />
                                    </label>
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
