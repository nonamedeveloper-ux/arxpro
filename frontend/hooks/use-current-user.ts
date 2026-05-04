'use client'

import { getCurrentUser } from '@/actions/user.action'
import { User } from '@/types'
import { useEffect, useState } from 'react'

export default function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getCurrentUser()
      .then(({ data }) => {
        setCurrentUser(data)
      })
      .catch(() => {
        // user not authenticated — silent fail
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return { currentUser, isLoading, setCurrentUser }
}
