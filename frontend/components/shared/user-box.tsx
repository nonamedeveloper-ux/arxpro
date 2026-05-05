'use client'

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { User as UserType } from '@/types'
import { logout } from '@/actions/auth.action'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import {
  LayoutDashboard,
  User,
  FolderKanban,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  TrendingUp,
} from 'lucide-react'
import Link from 'next/link'

interface UserBoxProps {
  currentUser: UserType | null
  setCurrentUser: (currentUser: UserType | null) => void
}

export default function UserBox({ currentUser, setCurrentUser }: UserBoxProps) {
  const onLogout = async () => {
    await logout()
    setCurrentUser(null)
  }

  const isArchitect = currentUser?.role === 'architect'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='size-10 cursor-pointer border border-white/10 hover:opacity-80 transition'>
          {currentUser?.profileImageId && (
            <AvatarImage src={currentUser.profileImageId} alt={currentUser.nickName} />
          )}
          <AvatarFallback className='bg-primary font-bold text-white'>
            {currentUser?.nickName?.at(0)?.toUpperCase() ?? currentUser?.phone?.slice(-2)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-64 bg-[#0A0A0A]/95 backdrop-blur-xl border-white/10 text-white'
        align='end'
        sideOffset={10}
      >
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1 py-1'>
            <p className='text-sm font-semibold leading-none text-primary'>
              {currentUser?.firstName && currentUser?.lastName
                ? `${currentUser.firstName} ${currentUser.lastName}`
                : currentUser?.nickName || 'User'}
            </p>
            <p className='text-xs leading-none text-white/50 truncate'>{currentUser?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className='bg-white/10' />
        <DropdownMenuGroup>
          {isArchitect ? (
            <>
              <DropdownMenuItem asChild className='focus:bg-primary/10 focus:text-primary cursor-pointer'>
                <Link href='/dashboard' className='flex w-full items-center py-1'>
                  <LayoutDashboard className='mr-3 h-4 w-4' />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className='focus:bg-primary/10 focus:text-primary cursor-pointer'>
                <Link href='/profile' className='flex w-full items-center py-1'>
                  <User className='mr-3 h-4 w-4' />
                  <span>My Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className='focus:bg-primary/10 focus:text-primary cursor-pointer'>
                <Link href='/projects' className='flex w-full items-center py-1'>
                  <FolderKanban className='mr-3 h-4 w-4' />
                  <span>My Projects</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className='focus:bg-primary/10 focus:text-primary cursor-pointer'>
                <Link href='/clients' className='flex w-full items-center py-1'>
                  <Users className='mr-3 h-4 w-4' />
                  <span>Clients</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className='focus:bg-primary/10 focus:text-primary cursor-pointer'>
                <Link href='/messages' className='flex w-full items-center py-1'>
                  <MessageSquare className='mr-3 h-4 w-4' />
                  <span>Messages</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className='focus:bg-primary/10 focus:text-primary cursor-pointer'>
                <Link href='/analytics' className='flex w-full items-center py-1'>
                  <TrendingUp className='mr-3 h-4 w-4' />
                  <span>Analytics</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className='focus:bg-primary/10 focus:text-primary cursor-pointer'>
                <Link href='/settings' className='flex w-full items-center py-1'>
                  <Settings className='mr-3 h-4 w-4' />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem asChild className='focus:bg-primary/10 focus:text-primary cursor-pointer'>
              <Link href='/profile' className='flex w-full items-center py-1'>
                <User className='mr-3 h-4 w-4' />
                <span>My Profile</span>
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator className='bg-white/10' />
        <DropdownMenuItem
          onClick={onLogout}
          className='text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer py-2'
        >
          <LogOut className='mr-3 h-4 w-4' />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
