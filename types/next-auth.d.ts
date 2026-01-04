import 'next-auth'

declare module 'next-auth' {
  interface User {
    username?: string
    role?: 'ADMIN' | 'USER'
  }
  
  interface Session {
    user: {
      id: string
      username?: string
      role: 'ADMIN' | 'USER'
      name?: string | null
      email?: string | null
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    username?: string
    role: 'ADMIN' | 'USER'
    name?: string | null
    email?: string | null
  }
}
