'use server'

import { Response } from '@/types'
import { cookies } from 'next/headers'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getArchitectStats(): Promise<Response<any>> {
  try {
    const token = cookies().get('token')?.value

    if (!token) {
      return { status: 401, message: 'Unauthorized', data: null }
    }

    const res = await fetch(`${API_URL}/api/analytics/architect-stats`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      cache: 'no-store'
    })

    const json = await res.json()

    if (!res.ok) {
      return { status: res.status, message: json.message || 'Failed to fetch stats', data: null }
    }

    return { status: 200, message: 'Stats fetched successfully', data: json.data }
  } catch (error) {
    console.error('Error in getArchitectStats():', error)
    return { status: 500, message: 'Something went wrong', data: null }
  }
}
