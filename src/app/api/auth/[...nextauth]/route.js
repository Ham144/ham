import { User } from "@/app/models/user"
import mongoose, { createConnection } from "mongoose"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/libs/mongoConnect";


export const authOption = {
    // Configure one or more authentication providers
    secret: process.env.SECRET,
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: "Credentials",
            id: "credentials",

            credentials: {
                name: { label: "Name", type: "text" },
                email: { label: "Email", type: "text", placeholder: "example@gmail.com" },
                password: { label: "Password", type: "password" },
                phone: { label: "Phone", type: "text" }
            },
            async authorize(credentials, req) {
                const email = credentials?.email
                const password = credentials?.password


                mongoose.connect(process.env.MONGO_URL)
                const user = await User.findOne({ email })

                if (user && user.password === password) {
                    console.log(user) //hanya terprint di vscode
                    return user
                }

                return null
            }
        })
        // ...add more providers here
    ],
}


const handler = NextAuth(authOption)
export { handler as GET, handler as POST }