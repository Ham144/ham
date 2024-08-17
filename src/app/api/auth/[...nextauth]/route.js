import { User } from "@/app/models/user";
import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect";
import bcrypt from "bcryptjs";
import TwitterProvider from "next-auth/providers/twitter";

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
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials) {
                const email = credentials?.email;
                const password = credentials?.password;


                console.log(email, password);// checking email and password is sent
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
        TwitterProvider({
            clientId: process.env.X_CLIENT_ID,
            clientSecret: process.env.X_CLIENT_SECRET,
            version: "2.0",
        })
        // ...add more providers here
    ],
    callbacks: {

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user?.email;
                token.name = user?.name;
                token.image = user?.image;
                token.isAdmin = true
            }
            return token;
        },
        async signIn({ user, account, profile, credentials, email }) {
            if (account.provider === "google") {
                const existingUser = await User.findOne({ email });

                if (existingUser) {
                    return true;
                } else {
                    user.isAdmin = true
                    return true;
                }
            }
            else if (account.provider === "twitter") {
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    return true;
                } else {
                    return true;
                }
            }
            else if (account.provider === "credentials") {
                profile.isAdmin = true
                this.session.user = profile;
                this.session.jwt = profile;
                this.session = user
                return true
            }
        },
        async session({ session, token, user }) {
            console.log(session, token)
            if (token?.sub) {
                const user = await User.findById(token.sub);
                if (user) {
                    session.user = {
                        id: user?._id,
                        email: user?.email,
                        name: user?.name,
                        image: user?.image,
                        isAdmin: true
                    };
                }
                return session;
            } else {
                session.user.isAdmin = true;
                return session
            }
        },
        async jwt({ token, user }) {
            if (user) {
                token.isAdmin = true;
            }
            return token;
        },

    },
    session: {
        jwt: true
    },
    jwt: {
        secret: process.env.JWT_SECRET
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
