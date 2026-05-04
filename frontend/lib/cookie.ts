'use server'

import { cookies } from 'next/headers'

export async function getCookie(name: string) {
  const cookieStore = await cookies()
  return cookieStore.get(name)
}

export async function setCookie(key: string, value: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(key, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteCookie(key: string) {
  const cookieStore = await cookies()
  cookieStore.delete(key)
}
