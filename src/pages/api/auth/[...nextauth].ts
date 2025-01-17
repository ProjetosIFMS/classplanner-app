import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing environment variables for Google OAuth");
}

// Auth configuration
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      id: "google",
      name: "Backend API Google Auth",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.accessToken;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token;
        return session;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
