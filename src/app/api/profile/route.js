import mongoose from "mongoose"
import { getServerSession } from "next-auth"
import { User } from "@/app/models/user"
import { authOption } from "../auth/[...nextauth]/route"
import { UserInfo } from "@/app/models/userInfo"

export async function POST(req) {
    let response, responseInfo;
    const {
        name,
        email,
        ...others
    } = await req.json()

    const session = await getServerSession(authOption)
    const sessionEmail = session?.user?.email
    mongoose.connect(process.env.MONGO_URL)

    //mengubah data berdasarkan email dari req untuk mengubah email user lain
    if (sessionEmail !== email) {
        try {
            response = await User.findOneAndUpdate({ email },
                { name, email }
                , { upsert: true })
            responseInfo = await UserInfo.findOneAndUpdate({ email },
                { ...others }, { upsert: true }
            )
        } catch (error) {
            return Response.json({ ok: false, message: error })
        }
    }

    //mengubah data berdasarkan session.user.email karena itu yg sedang login
    else {
        try {
            response = await User.findOneAndUpdate({ email: sessionEmail }, {
                name, email
            }, { upsert: true })
            responseInfo = await UserInfo.findOneAndUpdate({ email: sessionEmail },
                { ...others }, { upsert: true });

        } catch (error) {
            return Response.json({ ok: false, message: error })
        }
    }

    return Response.json({ ok: true, message: "submited success" })
}

export async function GET(req) {
    const fullUrl = req.url
    mongoose.connect(process.env.MONGO_URL)
    const _id = fullUrl.split("=")[1]
    let user, userInfo;
    if (_id) {
        try {
            user = await User.findOne({ _id }).lean()
            userInfo = await UserInfo.findOne({ email: user?.email }).lean()
        } catch (error) {
            throw new Error(error)
            return
        }
    }
    else {

        const session = await getServerSession(authOption)
        try {
            user = await User.findOne({ email: session?.user?.email })
                .lean()
            userInfo = await UserInfo.findOne({ email: session?.user?.email })
                .lean()
        } catch (error) {
            throw new Error(error)
            return
        }
    }

    return Response.json({ ...user, ...userInfo });
}