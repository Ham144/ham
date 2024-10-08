import { Schema, model, models } from "mongoose"

const CategoriesSchema = new Schema({
    name: { type: String, required: true, unique: true }
}, { timestamps: true })

export const Categories = models?.Categories || model("Categories", CategoriesSchema)
