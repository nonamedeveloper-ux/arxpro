'use client'

import React from 'react'
import { Eye, TrendingUp, BarChart3, PieChart, Calendar, Download } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AnalyticsPage() {
  const metrics = [
    { title: 'Total Profile Visits', value: '4,520', change: '+12.5%', icon: Eye, trend: 'up' },
    { title: 'Project Views', value: '12,840', change: '+24.8%', icon: BarChart3, trend: 'up' },
    { title: 'Engagement Rate', value: '5.2%', change: '-2.1%', icon: TrendingUp, trend: 'down' },
  ]

  return (
    <div className='space-y-10'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <div>
          <h1 className='text-4xl font-bold'>Analytics</h1>
          <p className='text-gray-400 mt-2'>Track your performance and reach across the platform.</p>
        </div>
        <div className='flex gap-2'>
          <Button variant='outline' className='border-white/10'>
            <Calendar className='mr-2 size-4' /> Last 30 Days
          </Button>
          <Button className='bg-primary text-white-1'>
            <Download className='mr-2 size-4' /> Export Report
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {metrics.map((metric) => (
          <Card key={metric.title} className='bg-white/5 border-white/10'>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <CardTitle className='text-sm font-medium text-gray-400'>{metric.title}</CardTitle>
              <metric.icon className='size-4 text-primary' />
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold'>{metric.value}</div>
              <p className={`text-xs flex items-center mt-2 ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {metric.change} <span className='text-gray-500 ml-1'>vs previous period</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <Card className='bg-white/5 border-white/10'>
          <CardHeader>
            <CardTitle>Profile Visits Over Time</CardTitle>
            <CardDescription>Daily visitors for the last 30 days</CardDescription>
          </CardHeader>
          <CardContent className='h-80 flex items-center justify-center border-t border-white/5'>
            <div className='text-center space-y-4'>
              <div className='size-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto'>
                <TrendingUp className='text-primary size-8' />
              </div>
              <p className='text-gray-400'>Interactive Chart Loading...</p>
            </div>
          </CardContent>
        </Card>

        <Card className='bg-white/5 border-white/10'>
          <CardHeader>
            <CardTitle>Top Performing Projects</CardTitle>
            <CardDescription>Projects with most engagement</CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            {[
              { name: 'Modern Minimalist Villa', views: '5,240', progress: 85 },
              { name: 'Eco-Friendly Office Hub', views: '3,120', progress: 65 },
              { name: 'Skyline Penthouse', views: '2,480', progress: 45 },
            ].map((project) => (
              <div key={project.name} className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span className='font-medium'>{project.name}</span>
                  <span className='text-gray-400'>{project.views} views</span>
                </div>
                <div className='h-2 bg-white/5 rounded-full overflow-hidden'>
                  <div 
                    className='h-full bg-primary rounded-full' 
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className='bg-white/5 border-white/10'>
        <CardHeader>
          <CardTitle>Device Distribution</CardTitle>
          <CardDescription>How users are accessing your profile</CardDescription>
        </CardHeader>
        <CardContent className='h-64 flex items-center justify-center'>
           <div className='flex items-center gap-10'>
              <div className='size-40 border-8 border-primary border-r-transparent border-b-transparent rounded-full flex items-center justify-center'>
                <PieChart className='size-10 text-primary' />
              </div>
              <div className='space-y-4'>
                <div className='flex items-center gap-2'><div className='size-3 bg-primary rounded-sm' /> <span>Desktop: 65%</span></div>
                <div className='flex items-center gap-2'><div className='size-3 bg-primary/60 rounded-sm' /> <span>Mobile: 25%</span></div>
                <div className='flex items-center gap-2'><div className='size-3 bg-primary/30 rounded-sm' /> <span>Tablet: 10%</span></div>
              </div>
           </div>
        </CardContent>
      </Card>
    </div>
  )
}
