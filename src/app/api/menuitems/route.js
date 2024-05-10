import { MenuItems } from "@/app/models/menuitems"
import mongoose from "mongoose"

export async function PUT(req) {
    const { menuItem, description, basePrice, photoUrl, categories, _id } = await req.json()
    mongoose.connect(process.env.MONGO_URL)
    const found = await MenuItems.findOne({ _id })
    if (found) {
        const response = await MenuItems.findByIdAndUpdate({ _id }, {
            menuItem, description, basePrice, photoUrl
        })
        return Response.json({ ok: true, message: "sukses mengedit" })
    }
    const response = await MenuItems.create({
        menuItem, description, basePrice, photoUrl, categories
    })
    console.log(response);
    return Response.json("ok")
}

//get All created Menu
export async function GET() {
    mongoose.connect(process.env.MONGO_URL)
    const data = await MenuItems.find()
    if (!data || (await data).length <= 0) return Response.json({ status: 404, msg: "item is 0" })
    return Response.json(data)
}

export async function DELETE(req) {
    const { _id } = await req.json()
    mongoose.connect(process.env.MONGO_URL)
    const response = await MenuItems.findByIdAndDelete(_id)
    return Response.json({ ok: true })
}