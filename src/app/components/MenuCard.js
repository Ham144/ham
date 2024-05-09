import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaEdit, FaRegSave } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineCancelScheduleSend } from "react-icons/md";


const MenuCard = ({ menuItem, description, basePrice, photoUrl, categories, _id }) => {

    const [deleted, setDeleted] = useState(false)

    const [inEdit, setInEdit] = useState(false)
    const [someChanged, setSomeChanged] = useState(false)

    const [getmenuitem, setMenuItem] = useState(menuItem)
    const [getdescription, setDescription] = useState(description)
    const [getbasePrice, setBasePrice] = useState(basePrice)
    const [getphotoUrl, setPhotoUrl] = useState(photoUrl)
    const [getcategories, setCategories] = useState(categories)

    const [editedMenuItem, setEditedMenuItem] = useState(menuItem)
    const [editedDescription, setEditedDescription] = useState(description)
    const [editedBasePrice, setEditedBasePrice] = useState(basePrice)
    const [editedPhotoUrl, setEditedPhotoUrl] = useState(photoUrl)
    const [editedCategories, setEditedCategories] = useState(categories)


    function compare() {
        if (editedMenuItem !== getmenuitem || editedDescription !== getdescription || editedBasePrice != getbasePrice || editedCategories.length !== getcategories.length || editedPhotoUrl != getphotoUrl) {

            setSomeChanged(true)

        }
        else {
            setSomeChanged(false)
        }
    }

    useEffect(() => {
        compare()
    }, [editedMenuItem, editedDescription, editedBasePrice, editedPhotoUrl, editedCategories.length])

    function editMenu(getId) {
        setInEdit(true)

    }

    // async function save() {
    //     setInEdit(false)
    //     const response = await fetch("/api/menuitems", {
    //         method: "PUT",
    //         headers: { "Content-Type": "Application/json" },
    //         body: JSON.stringify()
    //     })
    // }


    function cancel() {
        setInEdit(false)
        setEditedMenuItem(getmenuitem)
        setEditedDescription(getdescription)
        setEditedBasePrice(getbasePrice)
        setEditedPhotoUrl(getphotoUrl)
        setEditedCategories(getcategories)
        toast.dismiss("canceled edit")
    }

    useEffect(() => {

    }, [deleted, _id])

    async function handleDelete() {
        const response = fetch("/api/menuitems", {
            method: "DELETE",
            body: JSON.stringify({ _id })
        })
        if (response.ok) {
            toast.success("deleted success!")
            setDeleted(true)
        }
    }

    return (
        <div className={`${deleted ? "hidden" : "flex"} justify-between w-full bg-slate-200 shadow-md mt-3 items-center`} >

            <div className='flex  gap-x-3 gap-y-2 py-2 px-3 mt-3  border w-full' style={inEdit ? { border: "2px dashed black", backgroundColor: "#f7b86f" } : null}>
                <div className='flex flex-col items-center w-[20%] h-[200px] object-contain justify-center'>
                    <Image width={100} height={100} src={photoUrl || "/main-logo.png"} alt='photoUrl' className='w-full ' />
                    <input type="text" className={`absolute w-20 mt-2 translate-y-[80px] p-1 ${inEdit ? "" :
                        "hidden "} `} placeholder='Photo url' value={editedPhotoUrl || ""} onChange={e => setEditedPhotoUrl(e.target.value)} />
                </div>
                <div className='flex flex-col justify-around items-start gap-y-3 '>
                    <input type="text" value={editedMenuItem} onChange={e => setEditedMenuItem(e.target.value)} className={`${inEdit ? "" : ""} px-1`} disabled={!inEdit} />
                    <input type="text" value={editedDescription} onChange={e => setEditedDescription(e.target.value)} className={`flex  white-space:wrap overflow-wrap break-word`}
                        disabled={!inEdit} />
                    <div>
                        price : <input type="text" value={editedBasePrice} onChange={e => setEditedBasePrice(e.target.value)} className={`w-12 p-1  text-center`} disabled={!inEdit} />
                        <span className='ml-2'>$</span>
                    </div>
                    <div className='flex gap-2'>
                        {categories?.map((categ) => (
                            <span key={categ._id} className='flex px-3 py-2 rounded-full bg-yellow-400 text-black font-light'>{categ}</span>
                        ))}
                    </div>

                </div>
            </div>
            <div className='editortab  flex flex-col items-center justify-self-end '>
                <div className={`border hover:bg-blue-200 p-1 text-center flex flex-col items-center w-20 cursor-pointer ${someChanged && "bg-red-200"}`} onClick={cancel}>
                    <MdOutlineCancelScheduleSend size={20} />
                    cancel edit
                </div>
                <div className='border hover:bg-red-300 p-1 text-center flex flex-col items-center w-20 cursor-pointer' onClick={handleDelete}>
                    <MdDeleteForever size={20} />
                    delete
                </div>
                <div className='border hover:bg-blue-200 p-1 text-center flex flex-col items-center  w-20 cursor-pointer' onClick={() => editMenu(_id)}>
                    <FaEdit size={20} />
                    Edit
                </div>
                <div className={`border hover:bg-blue-200 p-1 text-center flex flex-col items-center  w-20 cursor-pointer ${someChanged && "bg-green-300"}`} >
                    <FaRegSave size={20} />
                    save
                </div>

            </div>
        </div >

    )
}

export default MenuCard