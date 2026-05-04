import React from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { User } from '@/types'
import { logout } from '@/actions/auth.action'

interface UserBoxProps {
  currentUser: User | null
  setCurrentUser: (currentUser: User | null) => void
}

export default function UserBox({ currentUser, setCurrentUser }: UserBoxProps) {
  const onLogout = async () => {
    await logout()
    setCurrentUser(null)
  }

  return (
    <Avatar className='size-10' onClick={onLogout}>
      <AvatarFallback className='bg-primary font-bold'>
        {currentUser?.nickName?.at(0)?.toUpperCase() ?? currentUser?.phone?.slice(-2)}
      </AvatarFallback>
    </Avatar>
  )
}
