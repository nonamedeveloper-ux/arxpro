'use client'

import React, { useState } from 'react'
import { Search, Send, Paperclip, MoreVertical, Phone, Video, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(1)

  const chats = [
    {
      id: 1,
      name: 'Sarah Smith',
      lastMessage: 'The new villa design looks amazing!',
      time: '2m ago',
      unread: 2,
      online: true,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'John Doe',
      lastMessage: 'When can we start the construction?',
      time: '1h ago',
      unread: 0,
      online: false,
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop'
    }
  ]

  const messages = [
    { id: 1, senderId: 1, text: 'Hello! I saw the latest updates on the villa project.', time: '10:30 AM' },
    { id: 2, senderId: 0, text: 'Hi Sarah! Yes, we added the sustainable glass elements we discussed.', time: '10:32 AM' },
    { id: 3, senderId: 1, text: 'The new villa design looks amazing! I really like the entrance layout.', time: '10:35 AM' },
  ]

  return (
    <div className='h-[calc(100vh-160px)] flex bg-white/5 border border-white/10 rounded-2xl overflow-hidden'>
      {/* Sidebar */}
      <div className='w-full sm:w-80 border-r border-white/10 flex flex-col'>
        <div className='p-6 border-b border-white/10'>
          <h1 className='text-2xl font-bold mb-4'>Messages</h1>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500' />
            <Input 
              placeholder='Search messages...' 
              className='pl-10 bg-white/5 border-white/10 w-full rounded-full h-10'
            />
          </div>
        </div>
        <ScrollArea className='flex-1'>
          <div className='p-2 space-y-1'>
            {chats.map((chat) => (
              <div 
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={cn(
                  'p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-colors',
                  selectedChat === chat.id ? 'bg-primary/10' : 'hover:bg-white/5'
                )}
              >
                <div className='relative'>
                  <Avatar className='size-12'>
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback>{chat.name.at(0)}</AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <div className='absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-[#0A0A0A] rounded-full' />
                  )}
                </div>
                <div className='flex-1 overflow-hidden'>
                  <div className='flex justify-between items-center mb-1'>
                    <p className='font-semibold truncate'>{chat.name}</p>
                    <p className='text-[10px] text-gray-500'>{chat.time}</p>
                  </div>
                  <div className='flex justify-between items-center'>
                    <p className='text-xs text-gray-400 truncate'>{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <div className='bg-primary text-white-1 size-5 rounded-full flex items-center justify-center text-[10px] font-bold'>
                        {chat.unread}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className='hidden sm:flex flex-1 flex-col'>
        {/* Chat Header */}
        <div className='p-4 border-b border-white/10 flex items-center justify-between bg-white/5'>
          <div className='flex items-center gap-3'>
            <Avatar className='size-10'>
              <AvatarImage src={chats.find(c => c.id === selectedChat)?.avatar} />
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
            <div>
              <p className='font-semibold'>{chats.find(c => c.id === selectedChat)?.name}</p>
              <p className='text-xs text-green-500'>Online</p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <Button variant='ghost' size='icon' className='hover:bg-white/10'><Phone className='size-4' /></Button>
            <Button variant='ghost' size='icon' className='hover:bg-white/10'><Video className='size-4' /></Button>
            <Button variant='ghost' size='icon' className='hover:bg-white/10'><Info className='size-4' /></Button>
            <Button variant='ghost' size='icon' className='hover:bg-white/10'><MoreVertical className='size-4' /></Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className='flex-1 p-6'>
          <div className='space-y-6'>
            {messages.map((message) => (
              <div 
                key={message.id}
                className={cn(
                  'flex flex-col max-w-[80%]',
                  message.senderId === 0 ? 'ml-auto items-end' : 'mr-auto items-start'
                )}
              >
                <div className={cn(
                  'p-4 rounded-2xl text-sm',
                  message.senderId === 0 
                    ? 'bg-primary text-white-1 rounded-tr-none' 
                    : 'bg-white/10 text-white rounded-tl-none'
                )}>
                  {message.text}
                </div>
                <p className='text-[10px] text-gray-500 mt-2'>{message.time}</p>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className='p-6 border-t border-white/10 bg-white/5'>
          <div className='flex items-center gap-4'>
            <Button variant='ghost' size='icon' className='hover:bg-white/10'><Paperclip className='size-5 text-gray-400' /></Button>
            <Input 
              placeholder='Type your message...' 
              className='bg-white/5 border-white/10 h-12 rounded-xl'
            />
            <Button className='bg-primary text-white-1 h-12 w-12 rounded-xl p-0'>
              <Send className='size-5' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
