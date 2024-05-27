import { Schema, models, model } from "mongoose";

const AddedToCartSchema = Schema({
    menuItemId: {
        type: String,
        required: true,
    }, name: {
        type: String,
        required: true
    }, quantity: {
        type: Number,
        required: true
    }, price: {
        type: Number,
        required: true
    }, image: {
        type: String,
    },
    // dari model Menuitem, tambahan 
    addedDate: {
        type: String,

    },
    checked: {
        type: Boolean,
        default: true //untuk di cart nanti bakal dihitung atau engga
    },
    userInfos_id: {
        type: String,
        required: true
    }
})

export const AddedToCart = models.AddedToCart || model("AddedToCart", AddedToCartSchema);
