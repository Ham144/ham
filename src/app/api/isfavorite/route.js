import { AddedToCart } from "@/app/models/addedtocart"
import mongoose from "mongoose"

export async function POST(req) {
    const body = await req.json()
    const { _id, isFavorite, userInfos_id } = body
    if (!_id || isFavorite == null || !userInfos_id) {
        return Response.json({ ok: false, msg: "ada field yg kosong" })
    }
    mongoose.connect(process.env.MONGO_URL)
    const found = await AddedToCart.findOneAndUpdate({ menuItemId: _id, userInfos_id }, { isFavorite })
    if (found != null) {
        if (isFavorite) {
            return Response.json({ ok: true, msg: "Added to Favorites" })
        } else {
            return Response.json({ ok: true, msg: "Removed from Favorites" })
        }
    }
    else {
        return Response.json({ ok: false, msg: "failed to add" })
    }
}