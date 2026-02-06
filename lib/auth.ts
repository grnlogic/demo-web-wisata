import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { compare } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

// Default env untuk Vercel/demo tanpa .env (tanpa database)
if (typeof process !== 'undefined') {
  if (!process.env.NEXTAUTH_URL?.trim()) {
    process.env.NEXTAUTH_URL =
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
  }
  if (!process.env.NEXTAUTH_SECRET?.trim()) {
    process.env.NEXTAUTH_SECRET = 'demo-wisata-pangandaran-secret-min-32-chars'
  }
}

// Hardcoded dummy users untuk portofolio (tanpa database)
const DUMMY_USERS = [
  {
    id: "superadmin",
    username: "superadmin",
    password: "demo123",
    nama: "Super Admin",
    role: "ADMIN",
    divisi: "Full Access - Semua Modul",
    email: "superadmin@demo.com",
  },
  {
    id: "admin_destinasi",
    username: "admin_destinasi",
    password: "demo123",
    nama: "Admin Destinasi",
    role: "ADMIN",
    divisi: "Destinasi Wisata & Pariwisata",
    email: "destinasi@demo.com",
  },
  {
    id: "admin_event",
    username: "admin_event",
    password: "demo123",
    nama: "Admin Event",
    role: "ADMIN",
    divisi: "Event & Agenda Kegiatan",
    email: "event@demo.com",
  },
  {
    id: "admin_kuliner",
    username: "admin_kuliner",
    password: "demo123",
    nama: "Admin Kuliner",
    role: "ADMIN",
    divisi: "Kuliner & Gastronomi",
    email: "kuliner@demo.com",
  },
  {
    id: "admin_berita",
    username: "admin_berita",
    password: "demo123",
    nama: "Admin Berita",
    role: "ADMIN",
    divisi: "Berita & Publikasi",
    email: "berita@demo.com",
  },
  {
    id: "admin_ukm",
    username: "admin_ukm",
    password: "demo123",
    nama: "Admin UKM",
    role: "ADMIN",
    divisi: "UKM & UMKM Lokal",
    email: "ukm@demo.com",
  },
  {
    id: "admin_galeri",
    username: "admin_galeri",
    password: "demo123",
    nama: "Admin Galeri",
    role: "ADMIN",
    divisi: "Galeri & Media Visual",
    email: "galeri@demo.com",
  },
  {
    id: "admin_hotel",
    username: "admin_hotel",
    password: "demo123",
    nama: "Admin Hotel",
    role: "ADMIN",
    divisi: "Hotel & Akomodasi",
    email: "hotel@demo.com",
  },
  {
    id: "admin_informasi",
    username: "admin_informasi",
    password: "demo123",
    nama: "Admin Informasi",
    role: "ADMIN",
    divisi: "Informasi Umum & Panduan",
    email: "informasi@demo.com",
  },
  {
    id: "user_budi",
    username: "budi@demo.com",
    password: "demo123",
    nama: "Budi Santoso",
    role: "USER",
    divisi: "Regular User (Visitor)",
    email: "budi@demo.com",
  },
  {
    id: "user_siti",
    username: "siti@demo.com",
    password: "demo123",
    nama: "Siti Nurhaliza",
    role: "USER",
    divisi: "Regular User (Visitor)",
    email: "siti@demo.com",
  },
  {
    id: "user_ahmad",
    username: "ahmad@demo.com",
    password: "demo123",
    nama: "Ahmad Wijaya",
    role: "USER",
    divisi: "Regular User (Visitor)",
    email: "ahmad@demo.com",
  },
];

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

        // PRIORITAS 1: Cek hardcoded dummy users dulu
        const dummyUser = DUMMY_USERS.find(
          (u) => u.username === identifier || u.email === identifier
        );

        if (dummyUser) {
          // Simple password check untuk demo
          if (password === dummyUser.password) {
            return {
              id: dummyUser.id,
              username: dummyUser.username,
              name: dummyUser.nama,
              email: dummyUser.email,
              role: dummyUser.role as 'ADMIN' | 'USER',
            };
          }
          return null;
        }

        // PRIORITAS 2: Cek database (jika ada)
        try {
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
        } catch (error) {
          // Jika database error, return null (demo mode tetap jalan)
          console.warn('Database error, using demo mode only:', error);
          return null;
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
