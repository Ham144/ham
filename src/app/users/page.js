"use client"
import React, { useEffect, useState } from 'react'
import ProfileBar from '../components/ProfileBar'
import useProfile from '../components/UseProfile'
import toast from 'react-hot-toast'
import { FaExternalLinkAlt } from 'react-icons/fa'
import Spinner from '../components/Spinner'
import { useSelector } from 'react-redux'
import { redirect, useRouter } from 'next/navigation'


const UsersPage = () => {
    const [users, setUsers] = useState([])
    const router = useRouter()
    const { user } = useSelector(state => state?.user)

    //redirect to home if not authenticated

    if (!user) {
        redirect("/login")
    }
    const getAllUsers = async () => {
        const usersPromise = fetch("/api/users")
            .then(res => res.json())
            .then(data => {
                setUsers(data)
            })
            .catch(err => console.log(err))

        await toast.promise(usersPromise, {
            loading: "getting all users data",
            success: "all users extracted",
            error: "something wrong with exracting data"
        })
    }

    async function updateAdmin(email, isAdmin) {
        const updatedIsadmin = !isAdmin

        const response = await fetch("/api/users", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email, isAdmin: updatedIsadmin
            })
        })

        if (response.ok) {
            toast.success("Admin status updated")
            getAllUsers()
        }
    }

    async function handleDelete(email) {
        const response = await fetch("/api/users", {
            method: "DELETE",
            body: JSON.stringify({
                email
            })
        })
        const data = await response.json()
        if (data.status == 401) {
            console.log(data.message)
        }
        else if (data.ok == true) {
            getAllUsers()
            toast.success("success deleted")
        }
    }

    function handleEdit(_id, name, email,) {
        return router.push(`/profile/${_id}`)

    }

    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <div className='flex px-4 overflow-hidden '>
            <ProfileBar isAdmin={true} />
            <div className='flex flex-col-reverse h-full mx-auto 
            lg:w-[50%] w-full max-md:translate-x-7 mb-12 pr-4 '>{
                    users.length > 0 ? users.map((u) => (
                        <div key={u._id} className='flex  px-4 py-2 rounded-md mt-3 max-md:text-sm max-md:flex-col max-md:gap-y-12'>
                            <div className='flex flex-col grow' >
                                <h1 className='font-bold'>{u.name || <span className='text-slate-700 italic'>no name</span>}</h1>
                                <p>{u.email || <span className='text-slate-700 italic'>no email</span>}</p>
                                <div className='flex justify-start md:w-[500px] max-md:w-[100%] bg-slate-100 py-2 rounded-md px-2 max-md:text-xs truncate max-md:flex-col'>
                                    <span className='border-r-4'>Created At: {u.createdAt}</span>
                                    <span>updated At: {u.updatedAt}</span>
                                </div>
                                <div>
                                    <p>phone: {u.phone || <span className='text-slate-700 italic'>not found</span>}</p>
                                </div>
                                <div className='flex'>
                                    <p>city : {u.city || <span className='text-slate-700 italic'>not found</span>}</p>
                                    <p className='font-bold'>, {u.country || <span className='text-slate-700 italic'> unknown country</span>}</p>
                                </div>
                                <div className='flex gap-2 hover:bg-slate-50 w-full border p-2 rounded-md ' onClick={() => updateAdmin(u.email, u.isAdmin)}>

                                    <input type="checkbox" id={u._id} checked={u.isAdmin} />
                                    <label htmlFor={u._id}>{u?.isAdmin ? "uncheck to make this user no longer be admin" : "Check to make this user admin"} </label>
                                </div>
                            </div>
                            <div className='flex flex-col justify-center max-md:translate-y-[-30px] '>
                                <button className='bg-sekunder hover:bg-slate-200' onClick={() => handleEdit(u._id, u.name, u.email)}>edit</button>
                                <button className='bg-sekunder text-red-50 hover:bg-slate-200' onClick={() => handleDelete(u.email)}>delete</button>
                            </div>
                        </div>
                    )) :
                        <div className='flex items-center h-screen justify-center'><Spinner /></div>
                }</div>

        </div>
    )
}

export default UsersPage