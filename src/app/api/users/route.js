import { User } from "@/app/models/user";
import mongoose from "mongoose";

//get all users
export async function GET() {
    mongoose.connect(process.env.MONGO_URL)
    const data = await User.find()
    if (data.length <= 0) {
        return Response.json({ status: 404, ok: false }, { message: "data user is less then 1" })
    }
    return Response.json(data)
}