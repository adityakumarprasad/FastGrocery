import NextAuth from "next-auth";

import Credentials from "next-auth/providers/credentials";
import dbConnect from "./lib/db";
import bcrypt from "bcryptjs";
import User from "./app/models/user.model";
export const { handler, signIn, signOut, getSession } = NextAuth({
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
      async authorize(credentials, req) {
        try {
          await dbConnect();
          const email = credentials?.email;
          const password = credentials?.password;
          const user = await User.findOne({ email });
          if (!user) {
            throw new Error("No user found with the given email");
          }
          const isPasswordValid = await bcrypt.compare(password || "", user.password);
          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }
          return { id: user._id.toString(), name: user.name, email: user.email, role: user.role };



        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
});