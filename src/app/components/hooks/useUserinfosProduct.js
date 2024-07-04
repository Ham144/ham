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


    function fetchingAddedtocart() {//mengextrak data yg ada di cart berdasar user._id
        console.log(user._id)
        try {
            fetch("/api/addedtocart?userInfos_id=" + user._id) //kirim id query userInfos kesini untuk get yg session akun aja
                .then(res => res.json())
                .then(data => setData(data))
        } catch (error) {
            console.log(error)
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
                fetchingAddedtocart()
                setTotalItemToSession()
            }
        }
        else return
    }, [user, refresh, session.status])


    return {
        user, data, setRefresh
    }
}

export default useUserinfosProduct;