import { useEffect, useState } from "react"

export default function GetCartandCurrentUser() {

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

    if (data != undefined && user != undefined) {
        return (() => { user, data })
    }

}

