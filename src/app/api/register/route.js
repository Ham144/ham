import { User } from "@/app/models/user"
import mongoose from "mongoose"

export async function POST(req) {
    const body = await req.json()
    console.log({ body });
    mongoose.connect(process.env.MONGO_URL)
    let createdUser;
    try {
        createdUser = await User.create(body)
    } catch (error) {
        console.log("Registration failed, similar email found.")
    }
    if (createdUser) {
        return Response.json({ ok: true, msg: "Registration success!!" })
    }
    else {
        return Response.json({ ok: false, msg: "Registration failed!!" })
    }
}
