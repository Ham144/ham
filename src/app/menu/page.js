"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";


export default function MenuPage() {
    const [data, setData] = useState([]);
    const [searchString, setSearchString] = useState("");


    async function handleSearch() {
        if (searchString.length === 0) return;


        // const response = await fetch(`/api/menu?search=${searcString}`);
        toast.success("working")
        // const data = await response.json();
        // setData(data);
    }

    return (
        <section className="menu flex flex-col min-h-screen ">
            <div className="search flex w-full justify-center items-center mt-3">
                <input type="text" className="w-[50%] flex px-4 py-2 bg-gradient-radial from-orange-100 to-red-50 shadow-lg outline-dashed  cursor-text rounded-3xl  font-bold italic items-center" onChange={e => setSearchString(e.target.value)} value={searchString} onKeyDown={e => e.key === "Enter" && handleSearch()} />
                {
                    searchString.length > 0 ? <FaDeleteLeft className="flex translate-x-[-40px] drop-shadow-lg" /> :
                        <FaSearch className="flex translate-x-[-40px] drop-shadow-lg" />
                }

            </div>

            <div className="flex gap-3 bg-blue-200">
                <span className="border flex font-bold hover:shadow-xl px-2 py-3 rounded-lg cursor-pointer ">filter</span>
                <span className="border flex font-bold hover:shadow-xl px-2 py-3 rounded-lg cursor-pointer ">filter</span>
                <span className="border flex font-bold hover:shadow-xl px-2 py-3 rounded-lg cursor-pointer ">filter</span>
                <span className="border flex font-bold hover:shadow-xl px-2 py-3 rounded-lg cursor-pointer ">filter</span>
            </div>

        </section>
    )
}