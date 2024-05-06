import { MenuItems } from "@/app/models/menuitems"
import mongoose from "mongoose"

export async function PUT(req) {
    const { menuItem, description, basePrice } = await req.json()
    mongoose.connect(process.env.MONGO_URL)
    const found = await MenuItems.findOne({ menuItem })
    if (found) {
        const response = await MenuItems.findOneAndUpdate({ menuItem }, {
            description, basePrice
        })
    }
    const response = await MenuItems.create({
        menuItem, description, basePrice

    })
    console.log(response);
    return Response.json("ok")
}