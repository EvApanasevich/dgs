import type { AuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { User } from "next-auth";


export const authConfig: AuthOptions = {
   providers: [
      // GoogleProvider ({
      //    clientId: '',
      //    clientSecret: '',
      // })
      Credentials({
         credentials: {
            email: { label: 'email', type: 'email', required: true },
            password: { label: 'password', type: 'password', required: true }
         },
         async authorize(credantials) {
            if (!credantials?.email || !credantials?.password) return null

            let formData = new FormData();
            formData.append("email", credantials.email);
            formData.append("password", credantials.password);
            formData.append("lang", "ru");

            let response = await fetch("http://api.mechatronics.by/api/3/login", {
               method: 'POST',
               body: formData,
               redirect: 'follow'
            })
            let user = await response.json();

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