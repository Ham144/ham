import mongoose from "mongoose"
import { getServerSession } from "next-auth"
import { User } from "@/app/models/user"
import { authOption } from "../auth/[...nextauth]/route"

export async function POST(req) {
    const {
        name,
        email,
        phone,
        city,
        postalCode,
        country,
        specificAddress } = await req.json()
    const session = await getServerSession(authOption)
    const sessionEmail = session?.user?.email
    console.log(email)
    mongoose.connect(process.env.MONGO_URL)
    const response = await User.findOneAndUpdate({ email: sessionEmail }, {
        name: name,
        email: email,
        phone: phone,
        city: city,
        postalCode: postalCode,
        country: country,
        specificAddress: specificAddress
    })
    return Response.json(response)
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URL)
    const session = await getServerSession(authOption)
    const _user = await User.findOne({ email: session?.user?.email })//
    console.log(_user);
    return Response.json(_user)
}