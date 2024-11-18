
import { DefaultUser, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { https } from 'follow-redirects';
import axios from "axios";
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: '/signin',
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const data = {
          email: credentials?.username,
          password: credentials?.password,
        }
        var dataJson = JSON.stringify({
          "email": `${data.email}`,
          "password": `${data.password}`
        });
        // const user = {
        //   accessToken: "sender.data.accessToken",
        //   refreshToken: "sender.data.refreshToken",
        //   expiry: "sender.data.expiry",
        //   name: "sender2.data.name",
        //   email: "sender2.data.email",
        //   verified: "sender2.data.verified",
        //   id:" sender2.data.id",
        // }
        // return user
        const config = {
          method: 'post',
          url: process.env.API_URL + 'auth/login',
          headers: {
            'Content-Type': 'application/json'
          },
          data: data
        };
        // console.log(data)


        const sender = await axios(config);
        console.log(sender.data)
        const config2 = {
          method: 'get',
          url: process.env.API_URL + 'user/logged-in',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sender.data.accessToken}`,
          },
          data: data
        }
        const sender2 = await axios(config2);
       
        // return null

        // const response = await axios.post('/api/users/login', data);
        // console.log(data)
        // const existingUser: any = response.data;
        if (!sender.data.accessToken) {
          return null;
        }
        // if ((existingUser.response.data.details as string).search(`${data.email}`) != -1 && existingUser.response.data.message) {
        //   return null;
        // }
        console.log(sender2.data)
       
        const user = {
          accessToken: sender.data.accessToken,
          refreshToken: sender.data.refreshToken,
          expiry: sender.data.expiry,
          name: sender2.data.name,
          email: sender2.data.email,
          verified: sender2.data.verified,
          id: sender2.data.id,
        }
        
        return user
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      return {...token, ...user}
    },
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        return true
      } else {
        // Return false to display a default error message
        // return false
        // Or you can return a URL to redirect to:
        return '/'
      }
    },
    async session({ session, token, user }) {
      session.user = token as any ;
      return session;
    }
  }
}
