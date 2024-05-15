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

            <div className="flex gap-3  justify-end px-12">
                <div class="h-screen flex justify-center items-center dark:bg-gray-800">
                    <div class="flex gap-2 flex-wrap justify-center p-4 md:p-12 max-w-3xl ">
                        <label htmlFor="kategori1" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" >contoh</label>
                        <input type="checkbox" id="kategori1" checked />
                        <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Cyan to Blue</button>
                        <button type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Green to Blue</button>
                        <button type="button" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Purple to Pink</button>
                        <button type="button" class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Pink to Orange</button>
                        <button type="button" class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Teal to Lime</button>
                        <button type="button" class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Red to Yellow</button>
                    </div>
                </div>

            </div>

        </section>
    )
}