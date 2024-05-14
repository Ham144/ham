import { UserInfo } from "@/app/models/userInfo"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"
import { authOption } from "../auth/[...nextauth]/route"

export async function GET() {
    const session = await getServerSession(authOption)
    mongoose.connect(process.env.MONGO_URL)
    const email = session?.user?.email
    const userInfo = await UserInfo.findOne({ email })

    if (userInfo.isAdmin) {
        console.log("yess he is admin");
        return Response.json({ isAdmin: true })
    }
    console.log("nooo")
    return Response.json({ isAdmin: false }, { status: 200 })
}