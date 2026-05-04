'use server'

import { Response } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function sendOtp(phone: string, nickName?: string): Promise<Response<null>> {
  try {
    const res = await fetch(`${API_URL}/api/auth/send-sms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, ...(nickName ? { nickName } : {}) }),
    })

    if (!res.ok) {
      const json = await res.json()
      return { status: res.status, message: json.message || 'Failed to send SMS', data: null }
    }

    return { status: 200, message: 'Verification code sent successfully', data: null }
  } catch (error) {
    console.error('Error sending OTP:', error)
    return { status: 500, message: 'Something went wrong', data: null }
  }
}

export async function verifyOtp(phone: string, code: string): Promise<Response<null>> {
  try {
    const res = await fetch(`${API_URL}/api/auth/verify-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, code }),
    })

    const json = await res.json()

    if (!res.ok || json.data !== true) {
      return { status: 400, message: 'Incorrect verification code', data: null }
    }

    return { status: 200, message: 'Verified successfully', data: null }
  } catch (error) {
    console.error('Error verifying OTP:', error)
    return { status: 500, message: 'Something went wrong', data: null }
  }
}
