import { User } from "@/app/models/user"
import mongoose, { createConnection } from "mongoose"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect";

if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGO_URL, {
        // Remove deprecated options
    }).then(() => {
        console.log('Mongoose connected');
    }).catch(error => {
        console.error('Mongoose connection error:', error);
    });
}

export const authOption = {
    // Configure one or more authentication providers
    secret: process.env.SECRET,
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true, // penting, kalau ga gini ga bisa login pake akun lain

        }),
        CredentialsProvider({
            name: "Credentials",
            id: "credentials",

            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials;
                await mongoose.connect(process.env.MONGO_URL)
                const user = await User.findOne({ email })

                try {
                    if (user && user?.password == password) {
                        console.log(user)
                        return user
                    }
                    else {
                        console.log("wrong password or email")
                        Response.json({ ok: false, status: 401, message: "wrong password or email" })
                        throw new Error("wrong password or email")

                    }
                } catch (error) {
                    console.log(error)
                }

                return true
            },
        }
        )

        // ...add more providers here
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account.provider === "google") {
                const existingUser = await User.findOne({ email: profile.email });
                console.log("Google SignIn:", existingUser ? "User exists" : "User does not exist");

                if (existingUser) {
                    return true;
                } else {
                    const newUser = new User({
                        name: profile?.name,
                        email: profile?.email,
                    });

                    mongoose.connect(process.env.MONGO_URL)
                    await newUser.save();
                    return true;
                }
            }
            return true;
        },
        async session({ session, token }) {
            if (token?.sub) {
                mongoose.connect(process.env.MONGO_URL)
                const user = await User.findById(token.sub);
                session.user = {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                };
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
            }
            return token;
        }
    },
    events: {
        async signOut(message) {
            console.log("User signed out:", message);
        },
    },
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error',
    },
}


const handler = NextAuth(authOption)
export { handler as GET, handler as POST }

// TODO: perbaiki sign in melalui credentials email password