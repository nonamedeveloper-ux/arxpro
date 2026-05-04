'use server'

import { deleteCookie, setCookie } from '@/lib/cookie'
import { Response } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function login(phone: string, password: string): Promise<Response<{ user: any; token: string } | null>> {
  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password }),
    })

    const json = await res.json()

    if (!res.ok) {
      return { status: res.status, message: json.message || 'Login failed', data: null }
    }

    await setCookie('access_token', json.data.token)

    return { status: 200, message: 'User logged in successfully', data: json.data }
  } catch (error) {
    console.log('Error in login(): ', error)
    return { status: 500, message: 'Something went wrong', data: null }
  }
}

export async function register(userData: {
  phone: string
  password: string
  nickName?: string
  role?: string
  email?: string
}): Promise<Response<{ user: any; token: string } | null>> {
  try {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })

    const json = await res.json()

    if (!res.ok) {
      return { status: res.status, message: json.message || 'Registration failed', data: null }
    }

    await setCookie('access_token', json.data.token)

    return { status: 201, message: 'User registered successfully', data: json.data }
  } catch (error) {
    console.log('Error in register(): ', error)
    return { status: 500, message: 'Something went wrong', data: null }
  }
}

export async function logout(): Promise<Response<null>> {
  try {
    await deleteCookie('access_token')
    return { status: 200, message: 'User logged out successfully', data: null }
  } catch {
    return { status: 500, message: 'Something went wrong', data: null }
  }
}
