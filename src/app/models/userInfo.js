const { Schema, model } = require("mongoose");

const userInfoSchema = new Schema({
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

export const UserInfo = model?.UserInfo || model("UserInfo", userInfoSchema)
