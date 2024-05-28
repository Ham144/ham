"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import Spinner from "../components/Spinner";


export default function CartPage() {
    const route = useRouter()

    const [user, setUser] = useState()
    const [data, setData] = useState()


    function fetchingUser() {
        fetch("/api/profile").then(res => res.json()).then(data => setUser(data))
    }


    function fetchingAddedtocart() {//mengextrak data yg ada di cart berdasar user._id
        fetch("/api/addedtocart?userInfos_id=" + user._id) //kirim id query userInfos kesini untuk get yg session akun aja
            .then(res => res.json())
            .then(data => setData(data))
    }

    async function setTotalItemToSession() {
        //set jumlah produk dan data-data yg sering digunakan ulang sessionStorage
        const totalQuantty = await data.reduce((total, item) => total + item.quantity, 0)
        console.log(totalQuantty)
        sessionStorage.setItem("totalQuantity", totalQuantty)
    }


    useEffect(() => {
        if (user == undefined) {
            fetchingUser()
        }
        else if (data == undefined) {
            fetchingAddedtocart()
        }
        else {
            setTotalItemToSession()
        }
    }, [user, data,])

    return (
        <div className="flex flex-col max-w-3xl mx-auto p-6 space-y-4 sm:p-10 dark:bg-gray-50 dark:text-gray-800 min-h-screen">
            <h2 className="text-xl font-semibold">Your cart</h2>
            {data?.length > 0 ?
                data?.map((item) => (
                    <CartItem key={item.id} {...item} />
                ))
                : <Spinner />
            }
            <div className="space-y-1 text-right">
                <p>Total amount:
                    <span className="font-semibold">357 €</span>
                </p>

            </div>
            <div className="flex justify-end space-x-4 ">
                <button type="button" className="hover:font-bold hover:border-4 duration-150 px-6 py-2 border rounded-md dark:border-violet-600" onClick={() => window.history.back()}>Back
                    <span className="sr-only sm:not-sr-only">to shop</span>
                </button>
                <button type="button" className="px-6 py-2 border hover:font-bold hover:border-4 duration-150 rounded-md dark:bg-violet-600 dark:text-gray-50 dark:border-violet-600" onClick={() => route.push("/checkout")}>
                    <span className="sr-only sm:not-sr-only">Continue to</span>Checkout
                </button>
            </div>
        </div>
    )
}

//todo: addedtocart model menerima id,name,quantity,price,image, dari model Menuitem, tambahan addedDate, cheked=true
//todo: 