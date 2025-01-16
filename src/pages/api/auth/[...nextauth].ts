import NextAuth, { NextAuthOptions, User, Account, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import axios, { AxiosError } from "axios";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing environment variables for Google OAuth");
}


// Auth configuration
export const authOptions: NextAuthOptions = {

  providers:[
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization:{
        params:{
          access_type: "offline",
          prompt: "consent",
          response_type: "code"
        }
      }
    })
  ],
   callbacks:{   
    async jwt({token, user, account, profile, trigger}) {
      if (account && user){
        return {
          ...token,
          backendToken: sessionStorage.getItem("backendToken")
        }
      }
      return token
   },
   async redirect({url, baseUrl}){
    return `${baseUrl}/dashboard`
  },
    async session({session, token, user}) {
      if (token){
        session.user = token
        return session
      }
      return session
    }
  },
};

export default NextAuth(authOptions);