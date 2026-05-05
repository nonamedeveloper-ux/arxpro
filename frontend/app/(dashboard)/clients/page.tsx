'use client'

import React from 'react'
import { Search, Mail, Phone, Plus, MoreHorizontal, UserCheck, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export default function ClientsPage() {
  const clients = [
    {
      id: 1,
      name: 'Sarah Smith',
      email: 'sarah.s@example.com',
      phone: '+998 90 123 45 67',
      assignedProjects: ['Modern Minimalist Villa'],
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+998 91 987 65 43',
      assignedProjects: ['Eco-Friendly Office Hub'],
      status: 'Pending',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop'
    }
  ]

  return (
    <div className='space-y-10'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <div>
          <h1 className='text-4xl font-bold'>Clients</h1>
          <p className='text-gray-400 mt-2'>Manage your client relationships and project assignments.</p>
        </div>
        <Button className='bg-primary text-white-1 hover:bg-primary/90 rounded-full px-6'>
          <Plus className='mr-2 size-4' /> Add New Client
        </Button>
      </div>

      <div className='flex items-center gap-4'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500' />
          <Input 
            placeholder='Search clients by name, email or project...' 
            className='pl-10 bg-white/5 border-white/10 w-full'
          />
        </div>
      </div>

      <div className='rounded-xl border border-white/10 bg-white/5 overflow-hidden'>
        <Table>
          <TableHeader className='bg-white/5'>
            <TableRow className='hover:bg-transparent border-white/10'>
              <TableHead className='text-gray-400'>Client</TableHead>
              <TableHead className='text-gray-400'>Contact Info</TableHead>
              <TableHead className='text-gray-400'>Assigned Projects</TableHead>
              <TableHead className='text-gray-400'>Status</TableHead>
              <TableHead className='text-gray-400 text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id} className='hover:bg-white/5 border-white/10'>
                <TableCell>
                  <div className='flex items-center gap-3'>
                    <Avatar>
                      <AvatarImage src={client.avatar} />
                      <AvatarFallback className='bg-primary/20 text-primary'>{client.name.at(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='font-medium'>{client.name}</p>
                      <p className='text-xs text-gray-500'>ID: #{client.id}234</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='space-y-1'>
                    <p className='text-sm flex items-center gap-2'><Mail className='size-3 text-primary' /> {client.email}</p>
                    <p className='text-sm flex items-center gap-2'><Phone className='size-3 text-primary' /> {client.phone}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex flex-wrap gap-2'>
                    {client.assignedProjects.map(project => (
                      <Badge key={project} variant='secondary' className='bg-primary/10 text-primary border-none'>
                        {project}
                      </Badge>
                    ))}
                    <Button variant='ghost' size='icon' className='size-6 rounded-full hover:bg-primary/20 hover:text-primary'>
                      <Plus className='size-3' />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={client.status === 'Active' ? 'bg-green-500/20 text-green-500 hover:bg-green-500/20' : 'bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/20'}>
                    {client.status}
                  </Badge>
                </TableCell>
                <TableCell className='text-right'>
                  <div className='flex justify-end gap-2'>
                    <Button variant='ghost' size='icon' className='hover:bg-white/10'>
                      <UserCheck className='size-4' />
                    </Button>
                    <Button variant='ghost' size='icon' className='hover:bg-white/10'>
                      <ExternalLink className='size-4' />
                    </Button>
                    <Button variant='ghost' size='icon' className='hover:bg-white/10'>
                      <MoreHorizontal className='size-4' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
