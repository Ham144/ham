import mongoose from "mongoose"
import { getServerSession } from "next-auth"
import { User } from "@/app/models/user"
import { authOption } from "../auth/[...nextauth]/route"
import { UserInfo } from "@/app/models/userInfo"

export async function POST(req) {
    const {
        name,
        ...others } = await req.json()
    const session = await getServerSession(authOption)
    const email = session?.user?.email
    mongoose.connect(process.env.MONGO_URL)
    const response = await User.findOneAndUpdate({ email }, {
        name,
    })

    const responseInfo = await UserInfo.updateOne({ email }, others)

    console.log(responseInfo);
    return Response.json(responseInfo)
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URL)
    const session = await getServerSession(authOption)
    const _user = await User.findOne({ email: session?.user?.email })//

    return Response.json(_user)
}