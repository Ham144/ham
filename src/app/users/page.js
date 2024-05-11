"use client"
import React, { useState } from 'react'
import ProfileBar from '../components/ProfileBar'
import useProfile from '../components/UseProfile'

const UsersPage = () => {
    const [users, setUsers] = useState([])

    const { loading, data } = useProfile()
    if (!loading) {
        console.log(data)
    }

    return (
        <div className='px-4'>
            <ProfileBar isAdmin={true} />


        </div>
    )
}

export default UsersPage