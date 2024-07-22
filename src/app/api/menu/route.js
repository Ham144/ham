import { MenuItems } from "@/app/models/menuitems"
import mongoose from "mongoose"

export async function POST(req) {
    const url = req.url
    const body = await req.json()

    const trueCategories = body.categories
        .filter(cat => Object.values(cat)[0]) //yg true aja
        .map(cat => Object.keys(cat)[0]);

    const searchString = url.split('=')[1]
    const searchQueries = searchString.split('%20')
    console.log(searchQueries)
    let founds;



    mongoose.connect(process.env.MONGO_URL)
    //regex untuk search
    const regexSearchQueries = searchQueries.map((term) => {
        return { menuItem: { $regex: term, $options: 'i' } }
    })

    //regex untuk filter
    const regexFilterCategories = trueCategories.map((term) => {
        return { categories: { $regex: term, $options: 'i' } }
    })

    if (regexFilterCategories.length > 0) {
        founds = await MenuItems.find({
            $and: [
                { $or: regexSearchQueries },
                { $or: regexFilterCategories }
            ]
        });
    }
    else {
        founds = await MenuItems.find({ $or: regexSearchQueries });
    }


    if (founds.length) return Response.json({ ok: true, data: founds });
    else return Response.json({ ok: false, status: 404, msg: "item is 0" });
}

