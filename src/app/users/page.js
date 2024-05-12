"use client"
import React, { useEffect, useState } from 'react'
import ProfileBar from '../components/ProfileBar'
import useProfile from '../components/UseProfile'
import toast from 'react-hot-toast'
import { FaExternalLinkAlt } from 'react-icons/fa'

const UsersPage = () => {
    const [users, setUsers] = useState([])

    const getAllUsers = async () => {
        const usersPromise = fetch("/api/users")
            .then(res => res.json())
            .then(data => console.log(data))

        await toast.promise(usersPromise, {
            loading: "getting all users data",
            success: "all users extracted",
            error: "something wrong with exracting data"
        })
        console.log(users)
    }

    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <div className='px-4'>
            <ProfileBar isAdmin={true} />
            <div>{

            }</div>

        </div>
    )
}

export default UsersPage