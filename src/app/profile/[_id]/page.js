"use client"
import mongoose from 'mongoose'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import toast, { Toast } from 'react-hot-toast'
import ProfileBar from '@/app/components/ProfileBar'
import { redirect, useParams, useSearchParams } from 'next/navigation'

const Profilepage = () => {
    let session = useSession()
    const { _id } = useParams()

    const [zoomin, setZoomin] = useState(false)

    const [image, setImage] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("") //ilegal change
    const [phone, setPhone] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [specificAddress, setSpecificAddress] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

    useLayoutEffect(() => {
        handleRefresh()
    }, [_id])

    if (useSession().status == "unauthenticated") return redirect("/")

    async function handleRefresh() {
        let endpoint = ""
        //ngecek apakah dia admin dari getserversession
        await fetch("/api/isAdmin").then(res => res.json())
            .then(data => setIsAdmin(data.isAdmin))
            .catch(err => console.log(err))
        if (_id == 0) {
            endpoint = "/api/profile"
        }
        else {
            endpoint = `/api/profile?_id=${_id}`
        }

        try {
            const response = await fetch(endpoint)
            if (!response.ok) {
                toast.error("not found such user")
                return
            }
            const data = await response.json()

            setImage(prev => prev = data?.image)
            setName(prev => prev = data?.name)
            setEmail(prev => prev = data?.email)
            setPhone(prev => prev = data?.phone)
            setCity(prev => prev = data?.city)
            setPostalCode(prev => prev = data?.postalCode)
            setCountry(prev => prev = data?.country)
            setSpecificAddress(prev => prev = data?.specificAddress)
        } catch (error) {
            console.log(error)
        }

    }


    async function handleSave(ev) {
        ev.preventDefault()
        try {
            const profilePromise = new Promise(async (resolve, reject) => {
                const response = await fetch("/api/profile", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name, email, phone, country, postalCode, city, specificAddress
                    })
                })
                const data = await response.json()
                if (data.ok) {
                    resolve()
                    console.log(data.message)
                }
                else {
                    reject()
                }
            })
            await toast.promise(profilePromise, {
                loading: "loading..",
                success: "success submited!!",
                error: "saving failed :("
            })

        } catch (error) {
            toast.error("failed saving")
            console.log(error)
        }


    }

    async function handleChangePicture(ev) {
        const file = ev.target.values
        try {
            const data = new FormData()
            data.set("file", file)
            const resposne = await fetch("/api/changepicture", {
                method: "POST",
                body: data
            })
            if (resposne.ok)
                console.log("Sukses sent to backend")
        } catch (error) {
            console.log(error)
        }

    }




    if (session?.status === "unauthenticated") {
        return <div>
            Ilegal move, this page is for authorized user, login first {" "}
            <Link className='font-bold underline' href={"/login"}>here</Link>
        </div>
    }


    return (
        <section className='flex flex-col  w-full px-4 '>
            <ProfileBar isAdmin={true} />
            <div className='flex flex-col md:w-[50%] w-full mt-6 border-t-8  border-yellow-500 mx-auto py-5 lg:px-12 px-4  bg-slate-100 min-h-[500px] rounded-b-md shadow-md gap-x-5 max-md:flex-col  justify-center items-center'  >
                <Image onClick={() => setZoomin(() => setZoomin(!zoomin))} style={zoomin ? { position: "absolute", width: "1680px", height: "1000px", borderRadius: "0", objectFit: "contain", border: "none", padding: "15%", backgroundColor: "rgba(23,23,23,0.3)", zIndex: "20", alignSelf: "center", cursor: "zoom-out" } : ""} className='w-[30%] h-[50%]  rounded-full border-4 border-yellow-500 cursor-zoom-in' src={image || "/profile.png"} alt='profile pic' width={1000} height={1000} />
                <div className='mt-[-10px] max-md:mb-12 '>
                    <label htmlFor="change">
                        <input type="file" id='change' onChange={handleChangePicture} className='hidden' />
                        <span className='bg-primer max-md:p-2'>change</span>
                    </label>
                </div>
                <form onSubmit={handleSave} className='flex flex-col w-full lg:gap-y-5 gap-3 h-[120%] mb-10 '>
                    {/* <button type='button' onClick={handleRefresh} className='shadow-md active:shadow-none px-6 py-2'>Refresh</button> */}
                    <div className='flex justify-between items-center'>
                        <label htmlFor="name" className='text-primer max-md:text-xs'>Name </label>
                        <input type="text" id='name' className='px-3  bg-slate-200 lg:w-[70%] w-[150px] h-11 rounded-full duration-500 font-extrabold mb-4 focus:shadow-lg' value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className='flex justify-between items-center' onClick={() => toast(" Email is not changeable")}>
                        <label htmlFor="email" className='text-primer max-md:text-xs'  >Email</label>
                        <input type="text" id='email' disabled value={email} className='px-3  bg-gray-400 lg:w-[70%] w-[150px]  h-11  rounded-full duration-500 font-extrabold mb-4 focus:shadow-lg' />

                    </div>

                    <div className='flex justify-between items-center'>
                        <label htmlFor="phone" className='text-primer max-md:text-xs'>phone </label>
                        <input type="text" id='phone' className='px-3  bg-slate-200 lg:w-[70%] w-[150px] h-11 rounded-full duration-500  font-extrabold mb-4 focus:shadow-lg' value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>

                    <div className='flex justify-between items-center'>
                        <label htmlFor="city" className='text-primer max-md:text-xs'>city </label>
                        <input type="text" id='city' className='px-3  bg-slate-200 lg:w-[70%] w-[150px] h-11 rounded-full duration-500  font-extrabold mb-4 focus:shadow-lg' value={city} onChange={e => setCity(e.target.value)} />
                    </div>
                    <div className='flex justify-between items-center'>
                        <label htmlFor="postalCode" className='text-primer max-md:text-xs'>Postal code</label>
                        <input type="text" id='postalCode' className='px-3  bg-slate-200 lg:w-[70%] w-[150px] h-11 rounded-full duration-500 font-extrabold mb-4 focus:shadow-lg' value={postalCode} onChange={e => setPostalCode(e.target.value)} />
                    </div>
                    <div className='flex justify-between items-center'>
                        <label htmlFor="country" className='text-primer max-md:text-xs'>country</label>
                        <input type="text" id='country' className='px-3  bg-slate-200 lg:w-[70%] w-[150px] h-11 rounded-full duration-500 font-extrabold mb-4 focus:shadow-lg ' value={country} onChange={e => setCountry(e.target.value)} />
                    </div>
                    <div className='flex justify-between items-center'>
                        <label htmlFor="specificAddress" className='text-primer max-md:text-xs'>specific address</label>
                        <input type="text" id='specificAddress' className='px-3  bg-slate-200 lg:w-[70%] w-[150px] h-11 rounded-full duration-500 font-extrabold mb-4 focus:shadow-lg' value={specificAddress} onChange={e => setSpecificAddress(e.target.value)} />
                    </div>


                    <input type="submit" className='bg-primer' />
                </form>
            </div>
        </section >
    )
}

export default Profilepage