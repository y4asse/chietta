import { DefaultJWT, JWT } from 'next-auth/jwt'
import NextAuth, { DefaultSession } from 'next-auth'
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: DefaultSession['user'] & {
      id: string
      idCreatedByUser: string | null // userが設定する
    }
  }

  interface User {
    id: string
    idCreatedByUser: string | null
  }
}
declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    idCreatedByUser: string | null
  }
}
