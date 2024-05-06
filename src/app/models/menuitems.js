import { Schema, model, models } from "mongoose"

const MenuItemsSchema = new Schema({
    menuItem: {
        type: String,
        required: true
    }, description: {
        type: String,
        required: false
    }, basePrice: {
        type: Number,
        required: true
    }
})

export const MenuItems = models.MenuItems || model("MenuItems", MenuItemsSchema)