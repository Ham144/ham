"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { FaC, FaDeleteLeft, FaFilter } from "react-icons/fa6";
import CategoryFilter from "../components/CategoryFilter";
import NasiGoreng from "../components/NasiGoreng";

export default function MenuPage() {
    const [data, setData] = useState(undefined);
    const [searchString, setSearchString] = useState("");
    const [categories, setCategories] = useState([])
    const [filteredData, setFilteredData] = useState([])

    const colors = ["cyan-blue", "green-blue", "purple-pink", "pink-orange", "teal-lime", "red-yellow"];


    function handleClear() {
        setSearchString("");
    }

    async function handleSearch() {
        if (searchString.length === 0) return;


        try {
            const response = await fetch(`/api/menu?search=${searchString}`, {
                method: "POST",
                body: JSON.stringify({ categories }),
            });
            const data = await response.json();
            if (data.ok == true) {
                toast.success("Found!!");
                setData(data.data);
                setFilteredData(data.data);
            }
            else {
                toast.error(`${searchString}, ${data.msg}`);
            }
        } catch (error) {
            console.log(error)
        }
    }

    function getFalseCategories() {
        const preFilter = sessionStorage.getItem("preFilter")
        try {
            fetch("/api/categories").then(res => res.json()).then(data => {
                if (data) {
                    const temp = []
                    data.map((category) => {
                        if (!preFilter) {
                            temp.push({ [category.name]: false })
                        }
                        else {
                            if (category.name == preFilter) {
                                temp.push({ [category.name]: true })
                            }
                            else {
                                temp.push({ [category.name]: false })
                            }
                            sessionStorage.removeItem("preFilter")
                        }
                    })
                    setCategories(temp)
                }
                else {
                    toast.error("data null");
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    function getInitialShow() {
        try {
            fetch("/api/menuitems").then(res => res.json()).then(data => {
                if (data) {
                    setData(data);
                    setFilteredData(data);
                }
                else {
                    toast.error("data null");
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    function handleClicked(cat) {
        const temp = [];
        categories.map((category) => {
            if (Object.keys(category)[0] === cat) {
                temp.push({ [cat]: !category[cat] })
            }
            else {
                temp.push(category)
            }
        })

        setCategories(temp)
    }
    // console.log(categories)

    async function filtering() {
        const temp = []
        const trueCategories = []
        try {

            if (categories.map((category) => Object.values(category)[0]).includes(true)) {
                //getting the true categories
                Object.entries(categories).map(([index, item]) => {
                    return Object.values(item)[0] ? trueCategories.push(Object.keys(item)[0]) : null
                })
                //filtering data by true categories
                data.map((item) => {
                    trueCategories.map((cat) => {
                        if (item.categories.includes(cat) && !temp.includes(item)) {
                            temp.push(item)
                        }
                    })
                })
                if (temp.length === 0) {
                    toast.error("no items found")
                    return setFilteredData([])
                }
                else {
                    toast.success(temp.length + " items found")
                    setFilteredData(temp)
                }
            }
            else {
                setFilteredData(data)
            }

        } catch (err) {
            console.log(err)
            setFilteredData(data)
        }
    }

    // function setPreFiltering() {
    //     try {
    //         const preFilter = sessionStorage.getItem("preFilter")
    //         if (!preFilter) return
    //         handleClicked(preFilter)
    //         sessionStorage.removeItem("preFilter")
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    useLayoutEffect(() => {
        getInitialShow()
        getFalseCategories()
    }, [])


    useEffect(() => {
        filtering()
    }, [categories])

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
                    <div className="flex items-center  max-md:gap-x-0  
                    max-md:w-[18rem] max-md:overflow-x-scroll max-md:overflow-y-hidden ">
                        {
                            categories.length > 0 && categories.map((cat, index) => <CategoryFilter key={Math.random()} isChecked={cat[Object.keys(cat)[0]]} color={index < colors.length ? colors[index] : colors[Math.floor(Math.random() * colors.length)]}
                                handleClicked={handleClicked} category={Object.keys(cat)[0]}
                            />)
                        }
                    </div>
                    <button type="submit" className="bg-gradient-radial from-red-50  via-orange-200 h-8 md:w-[120%] w-full flex justify-center items-center to-violet-100 cursor-pointer rounded-full" onClick={handleSearch}>
                        <FaFilter className="text-orange-400 text-2xl" />
                        <span className="font-light px-4">Filter</span>
                    </button>
                </div>
            </div>

            {data ?
                <div className='flex flex-col  items-center ' >
                    <div className='flex flex-col font-bold items-center'>
                        <section id="Projects"
                            className="mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center  justify-center  gap-y-20 gap-x-14 mt-10 mb-5 items-center">
                            {
                                filteredData?.length > 0 ? filteredData.map((item, index) => <NasiGoreng key={item._id} props={item} />) : <p className="text-3xl font-extralight ">No Items Found</p>
                            }

                        </section>
                    </div>
                    <p className='bottom-5 text-3xl flex self-center font-extralight '>
                        END OF CONTENT
                    </p>
                </div>
                :
                <div className="grid md:grid-cols-4 grid-cols-1 mx-auto gap-5 ">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className="flex flex-col gap-4 w-52">
                            <div className="skeleton h-32 w-full"></div>
                            <div className="skeleton h-4 w-28"></div>
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-full"></div>
                        </div>
                    ))}
                </div>
            }

        </section>
    )
}