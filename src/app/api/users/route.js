import { User } from "@/app/models/user";
import { UserInfo } from "@/app/models/userInfo";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { MdAutoAwesomeMosaic } from "react-icons/md";
import { authOption } from "../auth/[...nextauth]/route";

export async function GET() {
    mongoose.connect(process.env.MONGO_URL)
    const combined = []
    const userInfo = await UserInfo.find().lean()
    const _user = await User.find().lean()
    _user.map((user) => {
        const found = userInfo.findIndex(info => {
            return info.email == user.email
        })
        if (found !== -1) {
            combined.push({ ...userInfo[found], ...user })
        }
        else {
            combined.push(user)
        }
    })

    return Response.json(combined);
}

export async function PATCH(req) {
    const { email, isAdmin } = await req.json()
    mongoose.connect(process.env.MONGO_URL)
    try {
        await UserInfo.findOneAndUpdate({ email }, {
            isAdmin
        }, { upsert: true })
    } catch (error) {
        throw new Error(error)
        return Response.json({ status: 404, ok: false })
    }
    return Response.json({ ok: true })
}

export async function DELETE(req) {
    //cek jika id atau email adalah milik user saat ini 
    const { email } = await req.json()
    mongoose.connect(process.env.MONGO_URL)
    const session = await getServerSession(authOption)
    const isMainAdmin = (session?.user?.email === "24434muhammad.yafizham@gmail.com")
    const isLoggedin = (session?.user?.email === email)

    console.log(isLoggedin, isMainAdmin)
    if (isLoggedin || isMainAdmin) {
        return Response.json({ ok: false, status: 401, message: "You cant delete this user because this is yourself or its the main admin" })
    }
    // await User.findOneAndDelete(email)
    console.log("terhapus")
    return Response.json({ ok: true, message: "deleted" })
}