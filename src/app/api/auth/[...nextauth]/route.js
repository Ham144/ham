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
            name: "credentials",
            id: "credentials",

            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const email = credentials?.email
                const password = credentials?.password

                console.log(email, password)

                await mongoose.connect(process.env.MONGO_URL)
                const user = await User.findOne({ email })

                console.log(user.password)
                if (user && user?.password == password) {
                    console.log(user)
                    return user
                }
                else {
                    console.log("wrong password or email")
                    Response.json({ ok: false, status: 401, message: "wrong password or email" })
                    throw new Error("wrong password or email")
                }

                return true
            }
        })
        // ...add more providers here
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider === "google") {
                // Check if the Google account email already exists in your database
                const existingUser = await User.findOne({ email: profile.email });

                if (existingUser) {
                    // If the user exists, allow sign in
                    return true;
                } else {
                    // If the user does not exist, you can decide whether to allow sign up or not
                    // Returning false denies the sign in
                    return false;
                }
            }
            return true;
        },
    },
}


const handler = NextAuth(authOption)
export { handler as GET, handler as POST }