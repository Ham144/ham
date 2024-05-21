import { MenuItems } from "@/app/models/menuitems"
import mongoose from "mongoose"

export async function POST(req) {
    const url = req.url
    const body = await req.json()

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
    const regexFilterCategories = body.categories.map(term => ({
        categories: { $regex: term, $options: 'i' }
    }));

    if (body.categories.find(item => body.categories[item] == true)) {
        console.log("masuk sini jika ada yg true")
        founds = await MenuItems.find({
            $and: [
                { $or: regexSearchQueries },
                { $or: regexFilterCategories }
            ]
        });
    }
    else {
        console.log("langsung masuk sini jika filter false semua")
        founds = await MenuItems.find({ $or: regexSearchQueries });
    }


    if (founds.length) return Response.json(founds);
    else console.log("not found");
}


//note : categories sudah ada body, tinggal di gunakan.,
//todo: cari berdasarkan array searchQuerries, dan body