'use server'

import { Response, User } from '@/types'
import { cookies } from 'next/headers'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getCurrentUser(): Promise<Response<User | null>> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value

    if (!token) return { status: 401, message: 'Not authenticated', data: null }

    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())

    const res = await fetch(`${API_URL}/api/user/${payload.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!res.ok) return { status: 401, message: 'User not found', data: null }

    const json = await res.json()

    return { status: 200, message: 'User fetched successfully', data: json.data }
  } catch (error) {
    console.log(error)
    return { status: 500, message: 'Something went wrong', data: null }
  }
}

export async function recoverPassword(phone: string, newPassword: string): Promise<Response<null>> {
  try {
    const res = await fetch(`${API_URL}/api/user/forget-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password: newPassword }),
    })

    if (!res.ok) {
      const json = await res.json()
      return { status: res.status, message: json.message || 'Failed to update password', data: null }
    }

    return { status: 200, message: 'Password updated successfully', data: null }
  } catch (error) {
    console.log(error)
    return { status: 500, message: 'Something went wrong', data: null }
  }
}
