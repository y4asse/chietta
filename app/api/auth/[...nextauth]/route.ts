import { db } from '@/server/db'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, { AuthOptions, Session } from 'next-auth'

import GoogleProvider from 'next-auth/providers/google'

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET!,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    // jwt がトークンの処理に関与し、session がクライアントに送信するセッション情報の処理に関与する

    // サインイン時やセッションが再検証されるときにJWTをエンコードまたはデコードするために呼び出される(jwtの時のみ実行されて、DBを使っているときには使われない)
    // 役割: トークンのカスタマイズや追加の情報をトークンに埋め込む際に使用します。例えば、ユーザーの特定の権限をトークンに追加する場面など。
    // async jwt({ token, user, account, profile }) {
    //   // token.test = 'test' sessionのtokenの引数にはtestが入っている
    //   const
    //   return token
    // },

    // jwt→sessionの順に実行される
    // セッションがクライアントサイドに送信される前にセッションオブジェクトを「カスタマイズ」するために呼び出される
    async session({ session, user, token }) {
      if (session.user != null && token.sub != null) {
        session.user.id = token.sub
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
