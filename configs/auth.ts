import type { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User } from 'next-auth';
import { authApi } from '@/app/api/devices/api_devices';

export const authConfig: AuthOptions = {
  providers: [
    // GoogleProvider ({
    //    clientId: '',
    //    clientSecret: '',
    // })
    CredentialsProvider({
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: { label: 'password', type: 'password', required: true },
        language: { label: 'language', type: 'language', required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await authApi.authorize(credentials);
          const user = { ...res.user, token: res.token };

          if (user) {
            return user as User;
          }

          return null;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
};
