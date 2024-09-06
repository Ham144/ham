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
    if (!data || (await data).length <= 0) return Response.json({ ok: false, status: 404, msg: "item is 0" })
    return Response.json(data, { ok: true })
}
//get single only menu item
export async function POST(req) {
    const body = await req.json()
    const { menuItemId } = body
    if (!menuItemId) return Response.json({ ok: false, msg: "field required" })
    mongoose.connect(process.env.MONGO_URL)
    const found = await MenuItems.findOne({ _id: menuItemId })
    if (!found) return Response.json({ ok: false, msg: "item not found" })
    return Response.json({ ok: true, data: found })
}

export async function DELETE(req) {
    const { _id } = await req.json()
    mongoose.connect(process.env.MONGO_URL)
    const response = await MenuItems.findByIdAndDelete(_id)
    return Response.json({ ok: true })
}