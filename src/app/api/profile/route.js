import mongoose from "mongoose"
import { getServerSession } from "next-auth"
import { User } from "@/app/models/user"
import { authOption } from "../auth/[...nextauth]/route"
import { UserInfo } from "@/app/models/userInfo"

export async function POST(req) {
    const {
        name,
        email,
        phone,
        city,
        postalCode,
        country,
        specificAddress
    } = await req.json()
    const session = await getServerSession(authOption)
    const sessionEmail = session?.user?.email
    mongoose.connect(process.env.MONGO_URL)
    const response = await User.findOneAndUpdate({ email: sessionEmail }, {
        name,
    })
    const responseInfo = await UserInfo.findOneAndUpdate({ email: sessionEmail }, {
        $set: {
            email,
            phone,
            city,
            postalCode,
            country,
            specificAddress
        }
    }, { upsert: true });



    console.log(responseInfo);
    return Response.json(responseInfo)
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URL)
    const session = await getServerSession(authOption)
    const _user = await User.findOne({ email: session?.user?.email })//
    const userInfo = await UserInfo.findOne({ email: session?.user?.email })//

    return Response.json(userInfo)
}