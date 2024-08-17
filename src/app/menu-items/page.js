"use client"
import React, { useEffect, useState } from 'react'
import ProfileBar from '../components/ProfileBar'
import Image from 'next/image'
import toast from 'react-hot-toast'
import MenuCard from '../components/MenuCard'
import { useSelector } from 'react-redux'
import { redirect } from 'next/navigation'

const MenuItemsPage = () => {
    const [menuItem, setMenuItem] = useState("")
    const [description, setDescription] = useState("")
    const [basePrice, setBasePrice] = useState(0)
    const [photoUrl, setPhotoUrl] = useState(null)
    const [newPhoto, setNewPhoto] = useState("")
    const [categories, setCategories] = useState([])
    const [getCategories, setGetCategories] = useState([])
    // ------------------------------------show created menus
    const [createdMenus, setCreatedMenus] = useState([])

    const { user } = useSelector(state => state.user)

    //redirect to home if not logged in

    if (!user) {
        redirect("/login")
    }

    function fetchingMenus() {
        const getMenuPromise = fetch("/api/menuitems")
            .then(response => response.json())
            .then(data => {
                setCreatedMenus(data)
            })
            .catch(err => console.log(err))
        toast.promise(getMenuPromise, {
            error: "failed fetching menus info",
            success: "menus is extracted from database",
            loading: "waiting for the lucky one"
        });


    }

    async function fetchingCategories() {
        const response = await fetch("/api/categories")
        const data = await response.json()
        if (data.length) {
            const [...colection] = data
            getCategories.push(colection)
        }

    }

    useEffect(() => {
        fetchingCategories()
        fetchingMenus()
    }, [])

    async function handleNewItem(ev) {
        ev.preventDefault()
        try {
            menuItem.at(0).toUpperCase()
            description.at(0).toUpperCase()
            const response = await fetch('/api/menuitems', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    menuItem, description, basePrice, photoUrl, categories
                })
            })
            if (response.ok) {
                toast.success("Item added successfully")
                setMenuItem("")
                setNewPhoto("")
                setDescription("")
                setBasePrice(0)
                setPhotoUrl("")
                fetchingMenus()
            }

        } catch (error) {
            console.log(error)
        }
    }



    function setSelectedCategory(categ) {
        const found = categories.findIndex((item) => categ == item)
        const temp = categories
        if (found != -1) {
            temp?.splice(found, 1)
            toast.error("i found it, then i remove it")
        }
        else {
            temp.push(categ)
            toast.success("added to " + categ + " category")
        }
        setCategories(temp)
    }



    return (
        <div className='px-4 flex max-md:flex-col   min-h-screen lg:overflow-x-hidden'>
            <ProfileBar isAdmin={true} />

            <form onSubmit={handleNewItem} className=' flex flex-col gap-y-6 mx-auto   lg:border lg:px-9 rounded-xl lg:shadow-md py-8 mt-3 lg:w-[600px]  w-[86%] max-md:items-center h-full translate-x-7'>
                <h1 className='text-center font-bold uppercase max-md:self-center'>Add New Menu </h1>
                <div className='flex flex-col items-center gap-y-4'>
                    <Image src={photoUrl || '/main-logo.png'} width={100} height={100} alt='photo holder' />
                    <div className='flex gap-x-3 items-stretch max-md:flex-col max-md:gap-y-3'>
                        <input type="text" className='flex max-md:rounded-md text-center  bg-slate-100 max-md:px-0 max-md:h-12 ' placeholder='paste link photo here' value={newPhoto} onChange={e => setNewPhoto(e.target.value)} />
                        <button type='button' className='bg-primer max-md:h-12 max-md:text-xs' onClick={e => setPhotoUrl(prev => prev = newPhoto)}>save  photo</button>
                    </div>
                </div>
                <div className='flex gap-x-5 justify-between  font-bold uppercase  mt-3 items-center '>
                    <label htmlFor="menu-name" className='text-wrap max-md:text-sm'>menu name</label>
                    <input type="text" className='flex px-3 py-1 rounded-full w-[60%]  bg-slate-300 font-bold ' value={menuItem} onChange={e => setMenuItem(e.target.value)} />
                </div>
                <div className='flex gap-x-5 justify-between  font-bold uppercase  mt-3 '>
                    <label htmlFor="description" className='text-wrap max-md:text-sm'>Description</label>
                    <input type="text" id='description' className='flex bg-slate-300 px-2 py-1 w-[60%] rounded-full ' value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div className='flex gap-x-5 justify-between  font-bold uppercase  mt-3 items-center'>
                    <label htmlFor="base-price" className='text-wrap max-md:text-sm'>base price</label>
                    <input type="text" className='flex px-3 py-1 rounded-full w-[60%]  bg-slate-300 font-bold ' value={basePrice} onChange={e => setBasePrice(e.target.value)} />
                </div>
                <div className='grid border lg:p-4 justify-center items-center lg:grid-cols-3 grid-cols-2 p-2 max-md:gap-6'>
                    {getCategories && getCategories[0]?.map((categ, index) => (
                        <div key={categ?._id} className='flex items-center  py-5 hover:bg-slate-100 justify-around shadow-lg'>
                            <label htmlFor={categ?._id}>{categ?.name}
                            </label>
                            <input type="checkbox" id={categ?.id} className='flex' onChange={e => setSelectedCategory(categ?.name)} checked={categories?.find((item) => item.name == categ.name && index)}

                            />
                        </div>
                    ))}
                </div>

                <button className='bg-sekunder hover:bg-slate-200 w-full mt-3 '>Add Menu</button>

            </form>
            {/* ----------------------- all menu items editable */}
            <div className='flex flex-col my-4 md:w-[50%]  min-h-screen w-[90%] translate-x-8 '>
                <h1 className='text-center uppercase flex justify-center font-bold'>All menu List</h1>
                <div className='flex flex-col-reverse '>
                    {
                        createdMenus && createdMenus.length > 0 ?
                            createdMenus?.map((menu) => (
                                <MenuCard key={menu._id} menuItem={menu?.menuItem} description={menu?.description} basePrice={menu?.basePrice} photoUrl={menu?.photoUrl} categories={menu?.categories} _id={menu?._id} fetchingMenus={fetchingMenus} />
                            ))
                            :
                            ""
                    }

                </div>
            </div>
        </div>
    )
}

export default MenuItemsPage