import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  theme: {
    colorScheme: "auto",
    brandColor: "#fede55",
  },
  providers: [
    GoogleProvider({
      // https://console.cloud.google.com/apis/credentials
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
    CredentialsProvider({
      name: "Username & Password",

      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize({ username, password }) {
        const { user, ...res } = await prisma.credentials.findUnique({
          where: { username },
          include: { user: true },
        })

        return password == res.password ? user : null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (!user) return token
      return { ...token, user }
    },
    async session({ session, token }: any) {
      const { user } = token
      return { ...session, user }
    },
  },
})
