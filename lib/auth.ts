import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/admin/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: { label: "Email atau Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          return null
        }

        const identifier = credentials.identifier.trim()
        const password = credentials.password

        const maybeUser = await prisma.user.findUnique({
          where: { email: identifier.toLowerCase() },
        })

        if (maybeUser) {
          const isPasswordValid = await compare(password, maybeUser.password)
          if (!isPasswordValid) {
            return null
          }

          return {
            id: maybeUser.id,
            name: maybeUser.name || maybeUser.email,
            email: maybeUser.email,
            role: 'USER',
          }
        }

        const admin = await prisma.admin.findUnique({
          where: {
            username: identifier,
          },
        })

        if (!admin) {
          return null
        }

        const isPasswordValid = await compare(password, admin.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: admin.id,
          username: admin.username,
          name: admin.nama,
          email: admin.email,
          role: 'ADMIN',
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.username || ''
        token.role = user.role || 'USER'
        token.name = user.name
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string
        session.user.username = (token.username as string) || undefined
        session.user.role = token.role as 'ADMIN' | 'USER'
        session.user.name = (token.name as string) || null
        session.user.email = (token.email as string) || null
      }
      return session
    },
  },
}
