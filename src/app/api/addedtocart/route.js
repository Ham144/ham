import { AddedToCart } from "@/app/models/addedtocart"
import { UserInfo } from "@/app/models/userInfo";
import mongoose from "mongoose"
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL)
    const { menuItemId, name, quantity, price, image, addedDate, checked, userInfos_id } = await req.json();


    if (!menuItemId || !name || !quantity || !price || !image || !addedDate || !checked || !userInfos_id) {
        return Response.json({ ok: false, msg: "ada field yg kosong" })
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


export async function GET(req, res) {
    const { userInfos_id } = await NextRequest.json()
    console.log(userInfos_id);

    console.log(userInfos_id);
    mongoose.connect(process.env.MONGO_URL)
    const data = await AddedToCart.find({})
    if (!data || (await data).length <= 0) return Response.json({ ok: false, status: 404, msg: "You don't have any item yet" })
    return Response.json(data, { ok: true })
}