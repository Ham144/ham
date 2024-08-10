import { User } from "@/app/models/user";
import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect";
import bcrypt from "bcryptjs";

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
        CredentialsProvider({
            name: "Credentials",
            id: "credentials",

            credentials: {
                email: { label: "Email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const email = credentials?.email;
                const password = credentials?.password;

                mongoose.connect(process.env.MONGO_URL);
                const user = await User.findOne({ email });
                if (!user) {
                    console.log("User not found");
                    return null;
                }

                const passwordMatched = bcrypt.compareSync(password, user.password);
                if (passwordMatched) {
                    console.log(user);
                    return user;
                } else {
                    console.log("Invalid password");
                    throw new Error("Invalid password");
                }
                return null;
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true, // penting, kalau ga gini ga bisa login pake akun lain
        }),

        // ...add more providers here
    ],
    callbacks: {
        async signIn({ user, account, profile, credentials, email }) {
            console.log("SignIn callback - user:", user, "account:", account, "profile:", profile);
            if (account.provider === "google") {
                const existingUser = await User.findOne({ email });
                console.log("Google SignIn:", existingUser ? "User exists" : "User does not exist");

                if (existingUser) {
                    return true;
                } else {
                    return true;
                }
            }
            if (account.provider === "credentials") {
                console.log("Credentials SignIn:", user ? "User exists" : "User does not exist");
                this.session.user = profile;
                return true;
            }
        },
        async session({ session, token }) {
            if (token?.sub) {
                const user = await User.findById(token.sub);
                if (user) {
                    session.user = {
                        id: user?._id,
                        email: user.email,
                        name: user?.name,
                        image: user?.image,
                    };
                }
            }
            return session;
        },
        async jwt({ token, user }) {
            console.log("JWT callback - token:", token, "user:", user);
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
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
