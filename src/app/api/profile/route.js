import mongoose from "mongoose"
import { getServerSession } from "next-auth"
import { User } from "@/app/models/user"
import { authOption } from "../auth/[...nextauth]/route"
import { UserInfo } from "@/app/models/userInfo"

export async function POST(req) {
    const {
        name,
        email,
        ...others
    } = await req.json()
    const session = await getServerSession(authOption)
    const sessionEmail = session?.user?.email
    mongoose.connect(process.env.MONGO_URL)
    const response = await User.findOneAndUpdate({ email: sessionEmail }, {
        name, email
    }, { upsert: true })
    const responseInfo = await UserInfo.findOneAndUpdate({ email: sessionEmail }, {
        email,
        ...others
    }, { upsert: true });



    return Response.json({ ...responseInfo, ...response })
}

export async function GET(req) {
    const url = req.useParams()
    console.log(url);

    mongoose.connect(process.env.MONGO_URL)
    const session = await getServerSession(authOption)
    const _user = await User.findOne({ email: session?.user?.email })
        .lean()
    const userInfo = await UserInfo.findOne({ email: session?.user?.email })
        .lean()

    return Response.json({ ..._user, ...userInfo });
}