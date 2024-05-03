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
    phone: {
        type: String,
        required: true,
        default: ""
    },
    image: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: true,
        default: ""
    },
    postalCode: {
        type: String,
        required: true,
        default: ""
    },
    city: {
        type: String,
        required: true,
        default: ""
    },
    specificAddress: {
        type: String,
        required: true,
        default: ""
    }
}, { timestamps: true })


export const User = models?.User || model("User", userSchema) 