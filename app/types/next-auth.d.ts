import NextAuth, { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { JwtPayload } from "jwt-decode";

declare module "next-auth" {
  interface Session {
    token?: string;
    userId?: string;
    error?: string;
  }

  interface User {
    access_token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    accessTokenExpires?: number;
    userId?: string;
    error?: string;
  }
}

declare module "jwt-decode" {
  interface JwtPayload {
    exp?: number;
    sub?: string;
  }
}
