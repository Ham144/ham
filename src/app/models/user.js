import { Schema, model, models } from "mongoose"

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        default: ""
    },
    image: {
        type: String,
        required: false
    }
}, { timestamps: true })


export const User = models?.User || model("User", userSchema) 