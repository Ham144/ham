import { User } from "@/app/models/user"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"

export async function POST(req) {
    const body = await req.json()
    mongoose.connect(process.env.MONGO_URL)
    let createdUser;
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(body.password, salt);
        body.password = hash
        body.isAdmin = true
        createdUser = await User.create(body)
    } catch (error) {
        throw new Error("Registration failed, similar email found.")
    }
    if (createdUser) {
        return Response.json({ ok: true, msg: "Registration success!!" })
    }
    else {
        return Response.json({ ok: false, msg: "Registration failed!!" })
    }
}
