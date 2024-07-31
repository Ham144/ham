import { Categories } from "@/app/models/categories";
import mongoose from "mongoose";

export async function POST(req) {
    const body = await req.json()
    mongoose.connect(process.env.MONGO_URL)
    const found = await Categories.findOne({ name: body.name })
    if (found) {
        return Response.json({ status: 401 })
    }

    const newname = body.name.toLowerCase().split(" ").map((item) => item.charAt(0).toUpperCase() + item.slice(1)).join("")

    body.name = newname
    await Categories.create(body)
    return Response.json("ok")
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URL)
    const data = await Categories.find()
    return Response.json(data)
}

export async function DELETE(req) {
    const body = await req.json()
    mongoose.connect(process.env.MONGO_URL)
    const response = await Categories.findByIdAndDelete(body)
    return Response.json("ok")

}