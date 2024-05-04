"use client"
import React from 'react'
import ProfileBar from '../components/ProfileBar'
import useProfile from '../components/UseProfile'

const CategoriesPage = () => {

    const { loading, data } = useProfile()

    return (
        <div className='flex flex-col px-4'>
            <ProfileBar isAdmin={data?.isAdmin} />

            CategoriesPage</div>
    )
}

export default CategoriesPage