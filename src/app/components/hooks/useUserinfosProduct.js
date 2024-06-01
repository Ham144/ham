import { useState, useEffect } from "react"

const useUserinfosProduct = () => {

    let [user, setUser] = useState()
    let [data, setData] = useState()

    let [refresh, setRefresh] = useState(false) //value ini digunakan untuk refetch


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
        const totalQuantty = await data?.reduce((total, item) => total + item.quantity, 0)
        console.log(totalQuantty)
        if (totalQuantty != undefined) {
            sessionStorage.setItem("totalQuantity", totalQuantty)
        }
        else {
            return
        }
    }


    useEffect(() => {
        if (user == undefined) {
            fetchingUser()
        }
        else {
            fetchingAddedtocart()
            setTotalItemToSession()
        }
    }, [user, refresh])

    return { user, data, setRefresh }
}

export default useUserinfosProduct;