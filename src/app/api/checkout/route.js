import mongoose from "mongoose";


//init stripe: 


export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL)
    const body = await res.json()
    const { cartProducts, address } = body
    const stripeSession = await stripe.checkout.sessions.create({

    })
}