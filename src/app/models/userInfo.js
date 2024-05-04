import { Schema, model, models } from "mongoose"

const userInfoSchema = new Schema({
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

export const UserInfo = models?.UserInfo || model("UserInfo", userInfoSchema)
