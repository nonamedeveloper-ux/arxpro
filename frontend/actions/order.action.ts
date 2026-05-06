'use server'

import { Response } from '@/types'
import { cookies } from 'next/headers'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function createOrder(projectId: string): Promise<Response<any>> {
  try {
    const token = cookies().get('token')?.value

    if (!token) {
      return { status: 401, message: 'Please login to purchase', data: null }
    }

    const res = await fetch(`${API_URL}/api/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ projectId })
    })

    const json = await res.json()

    if (!res.ok) {
      return { status: res.status, message: json.message || 'Failed to create order', data: null }
    }

    return { status: 201, message: 'Order created successfully', data: json.data }
  } catch (error) {
    console.error('Error in createOrder():', error)
    return { status: 500, message: 'Something went wrong', data: null }
  }
}

export async function getMyOrders(): Promise<Response<any[]>> {
  try {
    const token = cookies().get('token')?.value

    if (!token) {
      return { status: 401, message: 'Unauthorized', data: [] }
    }

    const res = await fetch(`${API_URL}/api/order/my-orders`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      cache: 'no-store'
    })

    const json = await res.json()

    if (!res.ok) {
      return { status: res.status, message: json.message || 'Failed to fetch orders', data: [] }
    }

    return { status: 200, message: 'Orders fetched successfully', data: json.data }
  } catch (error) {
    console.error('Error in getMyOrders():', error)
    return { status: 500, message: 'Something went wrong', data: [] }
  }
}
