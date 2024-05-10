"use client"
import React, { useEffect, useState } from 'react'
import ProfileBar from '../components/ProfileBar'
import useProfile from '../components/UseProfile'
import toast from 'react-hot-toast'

const CategoriesPage = () => {

    const { loading, data } = useProfile()
    const [newCategory, setNewCategory] = useState("")
    const [categories, setCategories] = useState(null)

    function getCategory() {
        const response = fetch("/api/categories")
            .then(response => response.json())
            .then(data => setCategories(prev => prev = data))
    }

    function preventDelete(category) {
        if (category === "spicy"
            || category === "salty"
            || category === "traditional"
            || category === "france"
            || category === "chinese") {
            return true
        }
        else return false
    }

    async function handleRemove(id, category) {
        if (preventDelete(category)) {
            return toast.error("no no, you cant delete my categories")
        }
        const response = await fetch("/api/categories", {

            method: "DELETE",
            body: JSON.stringify({
                _id: id
            })
        })
        if (response.ok) {
            toast.success("Item Deleted")
            return getCategory()
        }

    }

    async function handleSubmitCategories(ev) {
        ev.preventDefault()
        try {
            const response = await fetch("/api/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: newCategory
                })
            })
            const data = await response.json()
            if (data.status === 401) {
                return toast.error("identical categories found")
            }
            if (response.ok) {
                setNewCategory("")
                toast.success("new category provided")
                getCategory()
            }
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getCategory()
    }, [categories?.length])

    if (loading) {
        toast("loading categories..")
    }


    return (
        <div className='flex flex-col px-4 min-h-screen mb-20 '>
            <ProfileBar isAdmin={data?.isAdmin} />
            <div className='flex flex-col justify-center items-center  mx-auto'>
                <form onSubmit={handleSubmitCategories} className='flex flex-col md:w-[500px] py-5 gap-y-4'>
                    <label htmlFor="category" className=' flex font-bold  w-full '>New Category</label>
                    <input type="text" className='flex rounded-full shadow-sm py-4 border px-3 font-bold grow uppercase ' value={newCategory} onChange={e => setNewCategory(e.target.value)} />
                    <input type="submit" value={"ADD"} className='bg-sekunder hover:bg-slate-200 cursor-pointer' />
                </form>
                <div className=' flex  w-full justify-center items-center'>
                    <ul className='flex flex-col gap-4'>
                        {
                            categories && categories?.map((category) => (
                                <li key={category._id} className='flex justify-between items-center outline-dashed md:w-[500px] w-[300px] pl-5 '>{
                                    preventDelete(category?.name) ?
                                        <div className='justify-between w-full flex'>
                                            {category.name}   < span className='text-slate-400 font-serif'> default</span>
                                        </div> : category?.name
                                } <span>

                                    </span>
                                    <p className='font-extrabold h-full p-4 hover:bg-red-500 cursor-pointer duration-300' onClick={() => handleRemove(category?._id, category?.name)}>X</p>
                                </li>
                            ))

                        }
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default CategoriesPage