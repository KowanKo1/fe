import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { isDev } from "../configs/runtime";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_BASE_URL}` + "/authentication/login";

        const res = await fetch(API_ENDPOINT, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();
        if (res.ok && user) {
          return user as User;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      const now = Math.floor(Date.now() / 1000);
      if (user) {
        const decodedAccessToken = jwtDecode(user.access_token);
        token.accessToken = user.access_token;
        token.accessTokenExpires = decodedAccessToken.exp;
        token.userId = decodedAccessToken.sub;
        return token;
      }

      if (token.accessTokenExpires && now < token.accessTokenExpires) {
        isDev && console.log("Access token has not expired yet, returning previous token");
        return token;
      }

      isDev && console.log("Access token has expired, logging out");
      return { ...token, error: "RefreshAccessTokenError" };
    },
    session: async ({ session, token }) => {
      if (token) {
        session.token = token.accessToken;
        session.userId = token.userId;
        session.error = token.error;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
