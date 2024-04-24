import mongoose from "mongoose"
import { getServerSession } from "next-auth"
import { User } from "@/app/models/user"
import { authOption } from "../auth/[...nextauth]/route"

export async function POST(req) {
    const { name, email, phone } = await req.json()

    mongoose.connect(process.env.MONGO_URL)
    const response = await User.findOneAndUpdate({ email }, { name: name, phone: phone })
    return Response.json(response)
}

export async function GET(req) {
    mongoose.connect(process.env.MONGO_URL)
    const session = await getServerSession(authOption)
    const _user = await User.findOne({ email: session?.user?.email })//
    return Response.json(_user)
}