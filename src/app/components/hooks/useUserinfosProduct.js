import { getSession, useSession } from "next-auth/react"
import { useState, useEffect, useContext } from "react"


const useUserinfosProduct = () => {


    const session = useSession()

    const [user, setUser] = useState()
    const [data, setData] = useState()



    let [refresh, setRefresh] = useState(false) //value ini digunakan untuk refetch


    function fetchingUser() {
        fetch("/api/profile").then(res => res.json()).then(data => setUser(data))
    }


    async function fetchingAddedtocart() {//mengextrak data yg ada di cart berdasar user._id
        try {
            const response = await fetch("/api/addedtocart?userInfos_id=" + user._id) //kirim id query userInfos kesini untuk get yg session akun aja
            if (response.ok) {
                const data = await response.json()
                setData(data)
            }
            else {
                setData([])
            }
        } catch (error) {
            throw new error("no product added")
        }
    }


    async function setTotalItemToSession() {
        //set jumlah produk dan data-data yg sering digunakan ulang sessionStorage
        if (session?.status == "authenticated") {
            const totalQuantty = await data?.reduce((total, item) => total + item.quantity, 0)
            console.log(totalQuantty)
            if (totalQuantty != undefined) {
                sessionStorage.setItem("totalQuantity", totalQuantty)
            }
            else {
                return
            }
        }
        else return
    }


    useEffect(() => {

        if (session.status == "authenticated") {
            if (user == undefined) {
                fetchingUser()
            }
            else {
                try {
                    fetchingAddedtocart()
                    setTotalItemToSession()
                } catch (error) {
                    console.log(error)
                }
            }
        }
        else return
    }, [user, refresh, session.status])


    return {
        user, data, setRefresh
    }
}

export default useUserinfosProduct;