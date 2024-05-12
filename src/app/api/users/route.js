import { User } from "@/app/models/user";
import mongoose from "mongoose";

//get all users
export async function GET() {
    mongoose.connect(process.env.MONGO_URL)
    const data = []
    const users = await User.find().lean()
    const userinfos = await User.find().lean()
    if (users.length <= 0) {
        return Response.json({ status: 404, ok: false }, { message: "data user is less then 1" })
    }

    [users, userinfos].map((user, info) => {
        if (user.email === info.email) {
            data.push(...user, ...email)
        }
        else {
            data.push(user)
        }
    })
    return Response.json(data)
}