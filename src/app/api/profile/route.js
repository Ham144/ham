import mongoose from "mongoose"
import { getServerSession } from "next-auth"
import { authOption } from "../auth/[...nextauth]/route"
import { User } from "@/app/models/user"

export async function POST(req) {
    const { name, email, phone } = await req.json()

    mongoose.connect(process.env.MONGO_URL)
    const session = await getServerSession(authOption)
    const response = await User.findOneAndUpdate({ email }, { name: name, phone: { $setOnInsert: phone } })

    return Response.json(response)
}