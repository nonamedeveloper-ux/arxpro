'use client'

import React, { useState } from 'react'
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  MessageSquare, 
  Eye, 
  TrendingUp,
  ArrowUpRight,
  Clock,
  Plus,
  Send,
  Bell
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import useCurrentUser from '@/hooks/use-current-user'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import ClientDashboard from '@/components/dashboard/client-dashboard'
import { cn } from '@/lib/utils'
import { getArchitectStats } from '@/actions/analytics.action'
import { useEffect, useState } from 'react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'

const chartData = {
  '7d': [
    { name: 'Mon', views: 400 },
    { name: 'Tue', views: 300 },
    { name: 'Wed', views: 600 },
    { name: 'Thu', views: 800 },
    { name: 'Fri', views: 500 },
    { name: 'Sat', views: 900 },
    { name: 'Sun', views: 1100 },
  ],
  '30d': [
    { name: 'Week 1', views: 2400 },
    { name: 'Week 2', views: 3600 },
    { name: 'Week 3', views: 3200 },
    { name: 'Week 4', views: 4800 },
  ],
  '90d': [
    { name: 'Month 1', views: 12000 },
    { name: 'Month 2', views: 15000 },
    { name: 'Month 3', views: 18000 },
  ],
}

export default function DashboardPage() {
  const { currentUser } = useCurrentUser()
  const router = useRouter()
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d')
  const [stats, setStats] = useState<any[]>([])
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (currentUser?.role === 'architect') {
      getArchitectStats().then(res => {
        if (res.status === 200) {
          setStats(res.data.stats)
          setRecentActivity(res.data.recentActivity)
        }
        setIsLoading(false)
      })
    }
  }, [currentUser])

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  if (currentUser?.role === 'client') {
    return <ClientDashboard user={currentUser} />
  }

  const defaultStats = [
    { title: 'Total Projects', icon: FolderKanban, color: 'text-orange-500', bg: 'bg-orange-500/10', path: '/projects' },
    { title: 'Total Clients', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10', path: '/clients' },
    { title: 'Messages', icon: MessageSquare, color: 'text-green-500', bg: 'bg-green-500/10', path: '/messages' },
    { title: 'Profile Views', icon: Eye, color: 'text-purple-500', bg: 'bg-purple-500/10', path: '/analytics' }
  ]

  return (
    <motion.div 
      className='space-y-10'
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
        <div>
          <motion.h1 
            className='text-4xl font-bold bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent'
            variants={itemVariants}
          >
            Welcome back, {currentUser?.nickName || 'Architect'}
          </motion.h1>
          <motion.p className='text-gray-400 mt-2' variants={itemVariants}>
            Here is what's happening with your projects today.
          </motion.p>
        </div>
        
        <motion.div className='flex items-center gap-3' variants={itemVariants}>
          <Button 
            className='bg-orange-600 hover:bg-orange-700 text-white rounded-full px-6 transition-all duration-300 shadow-lg shadow-orange-600/20'
            onClick={() => router.push('/projects')}
          >
            <Plus className='mr-2 size-4' /> Add Project
          </Button>
          <Button 
            variant='outline' 
            className='border-white/10 hover:bg-white/5 rounded-full px-6'
            onClick={() => router.push('/clients')}
          >
            <Users className='mr-2 size-4' /> Add Client
          </Button>
          <Button 
            variant='outline' 
            className='border-white/10 hover:bg-white/5 rounded-full size-10 p-0 relative'
            onClick={() => router.push('/messages')}
          >
            <MessageSquare className='size-4' />
            <span className='absolute -top-1 -right-1 size-4 bg-orange-600 text-[10px] flex items-center justify-center rounded-full border-2 border-[#050505]'>
              3
            </span>
          </Button>
        </motion.div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-white/5 animate-pulse rounded-2xl" />
          ))
        ) : (
          stats.map((stat, idx) => {
            const Icon = defaultStats.find(s => s.title === stat.title)?.icon || FolderKanban;
            const color = defaultStats.find(s => s.title === stat.title)?.color || 'text-orange-500';
            const bg = defaultStats.find(s => s.title === stat.title)?.bg || 'bg-orange-500/10';
            
            return (
              <motion.div
                key={stat.title}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className='cursor-pointer group'
                onClick={() => router.push(stat.path)}
              >
                <Card className='bg-[#0A0A0A]/50 backdrop-blur-md border-white/10 group-hover:border-orange-500/50 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.1)] overflow-hidden relative'>
                  <div className='absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
                  <CardHeader className='flex flex-row items-center justify-between pb-2'>
                    <CardTitle className='text-sm font-medium text-gray-400'>{stat.title}</CardTitle>
                    <div className={`${bg} ${color} p-2 rounded-xl transition-transform duration-500 group-hover:rotate-12`}>
                      <Icon className='size-4' />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className='text-3xl font-bold tracking-tight'>{stat.value}</div>
                    <div className='flex items-center gap-2 mt-2'>
                      <span className='text-xs text-green-500 flex items-center bg-green-500/10 px-2 py-0.5 rounded-full'>
                        <TrendingUp className='size-3 mr-1' />
                        {stat.change}
                      </span>
                      <span className='text-[10px] text-gray-500'>vs last month</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })
        )}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <motion.div className='lg:col-span-2 space-y-6' variants={itemVariants}>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-bold flex items-center gap-3'>
              <div className='size-8 bg-orange-500/20 rounded-lg flex items-center justify-center'>
                <TrendingUp className='text-orange-500 size-4' />
              </div>
              Performance Overview
            </h2>
            <div className='flex bg-white/5 p-1 rounded-lg border border-white/10'>
              {(['7d', '30d', '90d'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={cn(
                    'px-4 py-1.5 text-xs font-medium rounded-md transition-all',
                    timeRange === range ? 'bg-orange-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
                  )}
                >
                  {range.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          
          <Card 
            className='bg-[#0A0A0A]/50 backdrop-blur-md border-white/10 p-6 h-[400px] cursor-pointer group hover:border-orange-500/30 transition-all'
            onClick={() => router.push('/analytics')}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData[timeRange]}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ea580c" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#ffffff40" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#ffffff40" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0A0A0A', 
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                  itemStyle={{ color: '#ea580c' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#ea580c" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorViews)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        <motion.div className='space-y-6' variants={itemVariants}>
          <h2 className='text-2xl font-bold flex items-center gap-3'>
            <div className='size-8 bg-blue-500/20 rounded-lg flex items-center justify-center'>
              <Clock className='text-blue-500 size-4' />
            </div>
            Recent Activity
          </h2>
          <div className='space-y-4'>
            {isLoading ? (
               <div className='h-40 bg-white/5 animate-pulse rounded-2xl' />
            ) : recentActivity.length > 0 ? (
              recentActivity.map((activity) => {
                const Icon = activity.type === 'client' ? Users : FolderKanban;
                return (
                  <motion.div 
                    key={activity.id} 
                    whileHover={{ x: 5 }}
                    onClick={() => router.push(activity.path)}
                    className='p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4 hover:bg-white/10 hover:border-orange-500/30 transition-all cursor-pointer group'
                  >
                    <div className='p-2 bg-orange-500/10 rounded-xl group-hover:scale-110 transition-transform'>
                      <Icon className='size-4 text-orange-500' />
                    </div>
                    <div className='flex-1'>
                      <p className='text-sm font-medium group-hover:text-orange-500 transition-colors'>{activity.title}</p>
                      <p className='text-xs text-gray-500 mt-1.5 flex items-center gap-2'>
                        <Clock className='size-3' />
                        {new Date(activity.time).toLocaleString()}
                      </p>
                    </div>
                    <div className='size-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-orange-500/20 group-hover:text-orange-500 transition-all'>
                      <ArrowUpRight className='size-4' />
                    </div>
                  </motion.div>
                )
              })
            ) : (
              <div className="py-10 text-center text-gray-500 border border-dashed border-white/10 rounded-2xl">
                No recent activity.
              </div>
            )}
            
            <Button 
              variant='ghost' 
              className='w-full text-gray-400 hover:text-white hover:bg-white/5 py-6 rounded-2xl border border-dashed border-white/10 hover:border-white/20'
            >
              View All Activity
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}


