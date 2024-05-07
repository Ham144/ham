import { Schema, model, models } from "mongoose"

const MenuItemsSchema = new Schema({
    menuItem: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    basePrice: {
        type: Number,
        required: true,
        validate: (e) => {
            if (e.value <= 0) throw new Error("Base price cannot be zero or negative");
        }
    },
    photoUrl: {
        type: String,
        required: false,
    },
    categories: {
        type: [String],
        required: true
    }
})

export const MenuItems = models.MenuItems || model("MenuItems", MenuItemsSchema)