import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
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
          if (!maybeUser.password) {
            return null
          }

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
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: { prompt: 'select_account' },
      },
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        const email = user.email?.toLowerCase()
        const googleId = profile?.sub || account.providerAccountId
        if (!email || !googleId) return false

        await prisma.user.upsert({
          where: { email },
          create: {
            email,
            name: user.name,
            googleId,
          },
          update: {
            name: user.name ?? undefined,
            googleId,
          },
        })
      }

      return true
    },
    async jwt({ token, user, account }) {
      if (account?.provider === 'google' && (user?.email || token.email)) {
        const existingUser = await prisma.user.findUnique({
          where: { email: (user?.email || token.email || '').toLowerCase() },
        })

        if (existingUser) {
          token.id = existingUser.id
          token.username = ''
          token.role = 'USER'
          token.name = existingUser.name || existingUser.email
          token.email = existingUser.email
          return token
        }
      }

      if (user) {
        token.id = user.id
        token.username = user.username || ''
        token.role = user.role || 'USER'
        token.name = user.name
        token.email = user.email
      } else if (token.email && (!token.id || !token.role)) {
        const existingUser = await prisma.user.findUnique({
          where: { email: token.email.toLowerCase() },
        })

        if (existingUser) {
          token.id = existingUser.id
          token.username = ''
          token.role = (token.role as 'ADMIN' | 'USER') || 'USER'
          token.name = existingUser.name || existingUser.email
          token.email = existingUser.email
        }
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
