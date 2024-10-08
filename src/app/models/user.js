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
        validate: (pass) => {
            if (pass < 3) {
                new Error("Password too short")
                return false
            }
            else return pass
        }
    }, phone: {
        type: Number,
    },

}, { timestamps: true })


export const User = models?.User || model("User", userSchema) 