"use client"
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import useUserinfosProduct from "../components/hooks/useUserinfosProduct";

export default function FavoritesPage() {

    const [favorites, setFavorites] = useState([]);
    const { data, refresh } = useUserinfosProduct()

    function getFavorites() {
        const filterd = data?.filter((item) => {
            return item.favorited === true
        })
        setFavorites(filterd)
        console.log(filterd)
    }

    useEffect(() => {
        getFavorites
    }, [])


    return (
        <div className="w-full min-h-screen flex flex-col items-center mx-auto">
            <h1 className="text-3xl p-4 gap-3 flex items-center italic text-primer font-light">
                Favorites <FaHeart className="text-yellow-100" />
            </h1>
            {favorites?.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-4">
                    {favorites.map((item, index) => (
                        <div key={index} className="card md:w-52 w-[90%] h-50 mx-auto glass">
                            <figure>
                                <img src={item.imageUrl} alt={item.title} />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{item.title}</h2>
                                <p>{item.description}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Look</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-4 w-52">
                    <div className="skeleton h-32 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                </div>
            )}
        </div>
    );
}

//todo : fix favorite page, total number in cart and favorite, 
