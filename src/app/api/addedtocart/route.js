import { AddedToCart } from "@/app/models/addedtocart"
import { UserInfo } from "@/app/models/userInfo";

const mongoose = require('mongoose');

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL)
    const { menuItemId, name, quantity, price, image, addedDate, checked, userInfos_id } = await req.json();


    if (!menuItemId || !name || !quantity || !price || !image || !addedDate || !checked || !userInfos_id) {

        return Response.json({ ok: false, msg: "there are empty field" })
    }

    //mendapatkan userInfos
    if (await UserInfo.findOne({ _id: userInfos_id }) == null) {
        return Response.json({ ok: false, msg: "user not found" })
    }
    else {
        //ceck bila terdapat id yg sudah ada di addedtocart collection maka tambahin quantity aja
        const found = await AddedToCart.findOne({ userInfos_id, menuItemId })
        if (found) {
            await AddedToCart.findOneAndUpdate({ userInfos_id, menuItemId }, {
                quantity: found.quantity + 1
            })
            return Response.json({ ok: true, msg: "menambahkan item yang sudah ada" })
        }
        else {

            try {
                await AddedToCart.create({ menuItemId, name, quantity, price, image, addedDate, checked, userInfos_id })
                return Response.json({ ok: true, msg: "sukses menambahkan ke keranjang" })
            } catch (error) {
                return Response.json({ ok: false, msg: "Something Wrong" })
            }
        }


    }
}


export async function GET(req) {
    const searchParams = req.nextUrl.searchParams
    const userInfos_id = searchParams.get("userInfos_id")
    if (!searchParams) return Response.json({ ok: false, msg: "perlu searchparams yg berkey userInfos_id" })

    await mongoose.connect(process.env.MONGO_URL)

    const data = await AddedToCart.find({ userInfos_id })
    if (!data || (await data).length <= 0) return Response.json({ ok: true, status: 200, msg: "You don't have any item yet" })

    return Response.json(data, { ok: true })
}

export async function PATCH(req) {
    const body = await req.json()
    const { checked, _id, userInfos_id, quantity } = body;
    mongoose.connect(process.env.MONGO_URL)
    const data = await AddedToCart.findOneAndUpdate({ menuItemId: _id, userInfos_id }, { checked, quantity })
    if (!data || data == null) {
        return Response.json({ ok: false, msg: "data not found" })
    }
    else {
        console.log(data.checked)
        return Response.json({ ok: true, msg: "update success" });
    }
}

export async function DELETE(req) {
    const { menuItemId, userInfos_id } = await req.json()
    if (!menuItemId || !userInfos_id) return Response.json({ ok: false, msg: "ada field yg kosong" })
    try {
        await mongoose.connect(process.env.MONGO_URL)
        await AddedToCart.findOneAndDelete({ menuItemId, userInfos_id })
        return Response.json({ ok: true, msg: "delete success" })
    } catch (error) {
        console.log(error)
        return Response.json({ ok: false, msg: "something wrong" })
    }
}