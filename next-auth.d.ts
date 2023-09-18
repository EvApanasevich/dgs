import NextAuth from "next-auth/next";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
   interface Session {
      user: {
         company_id: number
         created_at: string
         devices: [] | null
         email: string
         email_verified_at: string | null
         id: number
         lang: string | null
         mail_encryption: string
         mail_from_address: string
         mail_host: string
         mail_password: string
         mail_port: number
         mail_to_address: string
         mail_username: string
         name: string
         onesignal: string
         role: number
         telegram: string
         timezone: string
         token: string
         updated_at: string
         user_id: number
      } 
   }
}

