"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { FaDeleteLeft, FaFilter } from "react-icons/fa6";
import CategoryFilter from "../components/CategoryFilter";
import NasiGoreng from "../components/NasiGoreng";


export default function MenuPage() {
    const [data, setData] = useState([]);
    const [searchString, setSearchString] = useState("testing");
    const [categories, setCategories] = useState([]);


    function handleClear() {
        setSearchString("");
    }

    async function handleSearch() {
        if (searchString.length === 0) return;


        const response = await fetch(`/api/menu?search=${searchString}`, {
            method: "POST",
            body: JSON.stringify({ categories }),
        });
        const data = await response.json();
        if (response.ok) {
            toast.success("Found!!");
            setData(data);
        }
    }

    function getInitialShow() {
        fetch("/api/menuitems").then(res => res.json()).then(data => {
            if (data) {
                console.log(data);
                setData(data);
            }
            else {
                toast.error("data null");
            }
        })

    }

    useEffect(() => {
        getInitialShow()
    }, [])


    return (
        <section className="menu flex flex-col min-h-screen mb-12">
            <div className="search flex w-full justify-center items-center mt-7">
                <input type="text" className="md:w-[50%] max-md:w-[90%] flex px-4 py-2 bg-gradient-radial from-orange-100 to-red-50 shadow-lg outline-dashed  cursor-text rounded-3xl  font-bold italic items-center" onChange={e => setSearchString(e.target.value)} value={searchString} onKeyDown={e => e.key === "Enter" && handleSearch()} />
                {
                    searchString.length > 0 ? <FaDeleteLeft onClick={handleClear} className="flex cursor-pointer translate-x-[-40px] drop-shadow-lg" /> :
                        <FaSearch className="flex translate-x-[-40px] drop-shadow-lg" />
                }
            </div>
            <div className="filters flex  justify-center px-2 mt-5 ">
                <div className="  flex flex-col items-center">
                    <CategoryFilter />
                    <button type="submit" className="bg-gradient-radial from-red-50  via-orange-200 h-8 md:w-[120%] w-full flex justify-center items-center to-violet-100 cursor-pointer rounded-full" onClick={handleSearch}>
                        <FaFilter className="text-orange-400 text-2xl" />
                        <span className="font-light px-4">Filter</span>
                    </button>
                </div>
            </div>

            <div>
                <NasiGoreng />
            </div>

        </section>
    )
}