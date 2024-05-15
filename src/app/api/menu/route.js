import { MenuItems } from "@/app/models/menuitems"
import mongoose from "mongoose"

export async function POST(req) {
    const url = req.url
    const searchString = url.split('=')[1]
    mongoose.connect(process.env.MONGO_URL)
    const categories = await req.json()
    const response = await MenuItems.find({ name: searchString, categories: categories })
    return Response.json({ ok: true })
}
