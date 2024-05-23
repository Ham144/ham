import { Schema, models, model } from "mongoose";

const AddeToCartSchema = Schema({
    menuItemId: { type: String, required: true },
})

export const AddedToCart = models.AddedToCart || model("AddedToCart", AddeToCartSchema);
