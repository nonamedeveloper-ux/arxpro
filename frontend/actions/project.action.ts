'use server'

import { cookies } from 'next/headers'
import { Response } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function uploadImages(formData: FormData): Promise<Response<string[] | null>> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value

    if (!token) return { status: 401, message: 'Not authenticated', data: null }

    const res = await fetch(`${API_URL}/api/file/multiupload-image`, {
      method: 'POST',
      headers: { 
        Authorization: `Bearer ${token}` 
      },
      body: formData,
    })

    const json = await res.json()

    if (!res.ok) {
      return { status: res.status, message: json.message || 'Upload failed', data: null }
    }

    // Backend returns array of file objects, we need IDs
    const fileIds = json.data.map((f: any) => f.id)
    return { status: 201, message: 'Images uploaded successfully', data: fileIds }
  } catch (error) {
    console.log('Error in uploadImages(): ', error)
    return { status: 500, message: 'Something went wrong', data: null }
  }
}

export async function createProject(projectData: any): Promise<Response<any>> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value

    if (!token) return { status: 401, message: 'Not authenticated', data: null }

    const res = await fetch(`${API_URL}/api/project`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify(projectData),
    })

    const json = await res.json()

    if (!res.ok) {
      return { status: res.status, message: json.message || 'Failed to create project', data: null }
    }

    return { status: 201, message: 'Project created successfully', data: json.data }
  } catch (error) {
    console.log('Error in createProject(): ', error)
    return { status: 500, message: 'Something went wrong', data: null }
  }
}

export async function getArchitectByUserId(userId: string): Promise<Response<any>> {
    try {
      const cookieStore = await cookies()
      const token = cookieStore.get('access_token')?.value
  
      if (!token) return { status: 401, message: 'Not authenticated', data: null }
  
      const res = await fetch(`${API_URL}/api/architektor/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
  
      const json = await res.json()
  
      if (!res.ok) return { status: res.status, message: 'Architect not found', data: null }
  
      // Returns array, take first
      return { status: 200, message: 'Architect fetched successfully', data: json.data[0] }
    } catch (error) {
      console.log(error)
      return { status: 500, message: 'Something went wrong', data: null }
    }
}

export async function updateArchitect(id: string, data: any): Promise<Response<any>> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value

    if (!token) return { status: 401, message: 'Not authenticated', data: null }

    const res = await fetch(`${API_URL}/api/architecture/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify(data),
    })

    const json = await res.json()

    if (!res.ok) {
      return { status: res.status, message: json.message || 'Update failed', data: null }
    }

    return { status: 200, message: 'Profile updated successfully', data: json.data }
  } catch (error) {
    console.log(error)
    return { status: 500, message: 'Something went wrong', data: null }
  }
}

export async function createArchitect(data: any): Promise<Response<any>> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value

    if (!token) return { status: 401, message: 'Not authenticated', data: null }

    const res = await fetch(`${API_URL}/api/architecture`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify(data),
    })

    const json = await res.json()

    if (!res.ok) {
      return { status: res.status, message: json.message || 'Creation failed', data: null }
    }

    return { status: 201, message: 'Profile created successfully', data: json.data }
  } catch (error) {
    console.log(error)
    return { status: 500, message: 'Something went wrong', data: null }
  }
}
