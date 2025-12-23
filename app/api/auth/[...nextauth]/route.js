import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/db/connectdb";
import User from "@/db/models/User";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;

        // ❌ Google user trying password login
        if (user.provider === "google") {
          throw new Error("Please sign in using Google");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) throw new Error("Incorrect password");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
    })
  ],

  session: {
    strategy: "jwt"
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        await connectDB();

        const existingUser = await User.findOne({ email: user.email });

        // ❌ Block Google signup
        if (!existingUser) {
          throw new Error("No account found. Please sign up using email & password.");
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.id = user.id;
      }

      // ensure role always exists
      if (!token.role && token.email) {
        const dbUser = await User.findOne({ email: token.email });
        token.role = dbUser?.role;
        token.id = dbUser?._id?.toString();
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },


  pages: {
    signIn: "/login"
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
