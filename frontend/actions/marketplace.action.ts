'use server'

import { Response } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export interface ProjectFilter {
  minPrice?: number
  maxPrice?: number
  search?: string
  category?: string
}

export async function getProjects(filter?: ProjectFilter): Promise<Response<any[]>> {
  try {
    const queryParams = new URLSearchParams()
    if (filter?.minPrice) queryParams.append('minPrice', filter.minPrice.toString())
    if (filter?.maxPrice) queryParams.append('maxPrice', filter.maxPrice.toString())
    if (filter?.search) queryParams.append('search', filter.search)
    if (filter?.category) queryParams.append('category', filter.category)

    const queryString = queryParams.toString()
    const url = `${API_URL}/api/project${queryString ? `?${queryString}` : ''}`

    const res = await fetch(url, {
      cache: 'no-store'
    })

    const json = await res.json()

    if (!res.ok) {
      return { status: res.status, message: json.message || 'Failed to fetch projects', data: [] }
    }

    return { status: 200, message: 'Projects fetched successfully', data: json.data }
  } catch (error) {
    console.error('Error in getProjects():', error)
    return { status: 500, message: 'Something went wrong', data: [] }
  }
}
