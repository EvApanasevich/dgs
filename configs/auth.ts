import type { AuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { User } from "next-auth";
import { authApi } from "@/app/api/devices/api_devices";

export const authConfig: AuthOptions = {
   providers: [
      // GoogleProvider ({
      //    clientId: '',
      //    clientSecret: '',
      // })
      Credentials({
         credentials: {
            email: { label: 'email', type: 'email', required: true },
            password: { label: 'password', type: 'password', required: true },
            language: { label: 'language', type: 'language', required: true },
         },
         async authorize(credantials) {
            if (!credantials?.email || !credantials?.password) return null

            const user = await authApi.authorize(credantials)

            if (user) {
               return user.user as User
            }
            
            return null
         }
      })
   ],
   pages: {
      signIn: '/signin'
   },
}