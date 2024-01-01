'use server'

import { authOptions } from '@/server/auth'
import { db } from '@/server/db'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

const schema = z.object({
  idCreatedByUser: z
    .string({ invalid_type_error: '不正な入力です' })
    .min(1, '1文字以上で入力してください')
    .max(20, '20文字以内で入力してください')
    .regex(/^[A-Za-z0-9\-_\.]+$/, {
      message: '英数字、ハイフン、アンダースコア、ドットのみ使用できます'
    }),
  sub: z.string({ invalid_type_error: '不正な入力です' })
})

export const createUserWithId = async (prevState: any, formData: FormData) => {
  const session = await getServerSession(authOptions)
  if (!session) return { errors: { idCreatedByUser: ['ログインしてください'] } }

  // バリデーション
  const validatedFields = schema.safeParse({
    idCreatedByUser: formData.get('idCreatedByUser'),
    sub: formData.get('sub')
  })
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return { errors: validatedFields.error.flatten().fieldErrors }
  }
  const { idCreatedByUser, sub } = validatedFields.data

  // 認可
  if (session.user.id !== sub) return { errors: { idCreatedByUser: ['不正なアクセスです'] } }

  // 既にidCreatedByUserが設定されている場合
  if (session.user.idCreatedByUser) return { errors: { idCreatedByUser: ['既にIDが設定されています'] } }

  //使用不可能なとき
  const domains = [
    'about',
    'api',
    'feeds',
    'latest',
    'login',
    'logout',
    'mypapge',
    'timeline',
    'profile',
    'settings',
    'user',
    'withdrawal'
  ]
  if (domains.includes(idCreatedByUser)) return { errors: { idCreatedByUser: ['そのIDは使用できません'] } }

  //すでに使われているとき
  const result = await db.user
    .update({
      where: { id: sub },
      data: { idCreatedByUser: idCreatedByUser }
    })
    .catch((err) => {
      console.log(err)
      return null
    })
  if (!result) return { errors: { idCreatedByUser: ['そのIDは既に使用されています。'] } }
  return { errors: null, result: result }
}
