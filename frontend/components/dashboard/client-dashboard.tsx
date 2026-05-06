'use client'

import React from 'react'
import {
  Search,
  Heart,
  MessageSquare,
  History,
  Star,
  MapPin,
  ArrowRight,
  Sparkles,
  LayoutGrid,
  Filter
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { getProjects } from '@/actions/marketplace.action'
import { createOrder, getMyOrders } from '@/actions/order.action'
import { useEffect, useState } from 'react'
import { toast } from 'sonner' // or your toast library

const popularArchitects = [
  {
    id: 1,
    name: 'Alex Rivera',
    specialty: 'Modern Residential',
    location: 'Tashkent',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Elena Sokolova',
    specialty: 'Eco-Friendly Design',
    location: 'Samarkand',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop'
  }
]

const recentRequests = [
  {
    id: 'REQ-001',
    title: 'Minimalist Office Hub',
    status: 'In Progress',
    architect: 'Alex Rivera',
    date: 'Oct 12, 2023'
  },
  {
    id: 'REQ-002',
    title: 'Glass House Project',
    status: 'Pending',
    architect: 'TBD',
    date: 'Oct 15, 2023'
  }
]

export default function ClientDashboard({ user }: { user: any }) {
  const [projects, setProjects] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [isLoadingProjects, setIsLoadingProjects] = useState(true)
  const [isLoadingOrders, setIsLoadingOrders] = useState(true)

  useEffect(() => {
    getProjects().then(res => {
      if (res.status === 200) {
        setProjects(res.data)
      }
      setIsLoadingProjects(false)
    })

    getMyOrders().then(res => {
      if (res.status === 200) {
        setOrders(res.data)
      }
      setIsLoadingOrders(false)
    })
  }, [])

  const handleBuy = async (projectId: string) => {
    const res = await createOrder(projectId)
    if (res.status === 201) {
      toast.success('Order created! Our team will contact you for payment.')
      // Refresh orders
      getMyOrders().then(res => res.status === 200 && setOrders(res.data))
    } else {
      toast.error(res.message)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10 pb-20"
    >
      {/* Hero Section */}
      <motion.div variants={itemVariants} className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-1">
        <div className="bg-[#050505] rounded-[31px] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <Badge variant="outline" className="mb-4 border-indigo-500/50 text-indigo-400 bg-indigo-500/5 px-3 py-1">
              <Sparkles className="size-3 mr-2" /> Welcome back, {user?.nickName || 'Client'}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Let's build your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">Dream Space</span> today.
            </h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-500" />
                <Input
                  placeholder="Search for architects, styles or projects..."
                  className="pl-12 h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all text-white"
                />
              </div>
              <Button size="lg" className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-xl shadow-indigo-600/20">
                Explore Now
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Requests & Saved */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Card className="bg-white/5 border-white/10 hover:border-indigo-500/30 transition-all">
              <CardContent className="p-6">
                <div className="size-10 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
                  <History className="size-5 text-indigo-500" />
                </div>
                <div className="text-2xl font-bold text-white">08</div>
                <div className="text-sm text-gray-500">Active Requests</div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 hover:border-pink-500/30 transition-all">
              <CardContent className="p-6">
                <div className="size-10 bg-pink-500/10 rounded-xl flex items-center justify-center mb-4">
                  <Heart className="size-5 text-pink-500" />
                </div>
                <div className="text-2xl font-bold text-white">24</div>
                <div className="text-sm text-gray-500">Saved Designs</div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 hover:border-blue-500/30 transition-all hidden sm:block">
              <CardContent className="p-6">
                <div className="size-10 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                  <MessageSquare className="size-5 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-sm text-gray-500">Unread Messages</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Project Requests */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <LayoutGrid className="size-6 text-indigo-500" />
                Your Project Status
              </h2>
              <Button variant="ghost" className="text-indigo-400 hover:text-indigo-300">View All</Button>
            </div>
            <div className="space-y-4">
              {isLoadingOrders ? (
                <div className="h-20 bg-white/5 animate-pulse rounded-2xl" />
              ) : orders.length > 0 ? (
                orders.map((order) => (
                  <Card key={order.id} className="bg-[#0A0A0A] border-white/5 hover:border-white/10 transition-all group overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex items-center p-5">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-semibold text-white">Project #{order.project?.name || 'Unknown'}</h3>
                            <Badge className={
                              order.status === 'paid' 
                                ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                                : order.status === 'cancelled'
                                ? 'bg-red-500/10 text-red-400 border-red-500/20'
                                : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                            }>
                              {order.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-4">
                            <span>Price: <span className="text-gray-300">${order.amount}</span></span>
                            <span>Date: <span className="text-gray-300">{new Date(order.createdAt).toLocaleDateString()}</span></span>
                          </div>
                        </div>
                        <Button variant="outline" className="border-white/10 hover:bg-white/5 rounded-xl group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all">
                          Details <ArrowRight className="ml-2 size-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="py-8 text-center text-gray-500 border border-dashed border-white/10 rounded-2xl">
                  You haven't requested any projects yet.
                </div>
              )}
            </div>
          </motion.div>

          {/* Marketplace / Buying Section */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Sparkles className="size-6 text-orange-500" />
                Ready-to-Build Plans
              </h2>
              <Button variant="link" className="text-orange-500">View Marketplace</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {isLoadingProjects ? (
                Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="h-64 bg-white/5 animate-pulse rounded-2xl" />
                ))
              ) : projects.length > 0 ? (
                projects.map((plan, i) => (
                  <Card key={i} className="bg-white/5 border-white/10 overflow-hidden group hover:border-orange-500/50 transition-all">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={plan.projectImagePath ? `${process.env.NEXT_PUBLIC_API_URL}${plan.projectImagePath}` : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'} 
                        alt={plan.name} 
                        className="size-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                      <Badge className="absolute top-3 left-3 bg-orange-600 border-none">{plan.price > 1000 ? 'Premium' : 'New'}</Badge>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <Button size="sm" className="bg-white text-black hover:bg-white/90">Preview</Button>
                        <Button 
                          size="sm" 
                          className="bg-orange-600 text-white border-none"
                          onClick={() => handleBuy(plan.id)}
                        >
                          Buy Now
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-white text-sm mb-1">Project #{plan.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-orange-500 font-bold">${plan.price}</span>
                        <div className="flex items-center gap-1 text-[10px] text-gray-500">
                          <Star className="size-3 fill-orange-500 text-orange-500" />
                          4.9
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full py-10 text-center text-gray-500 border border-dashed border-white/10 rounded-2xl">
                  No projects found in the marketplace.
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Featured Architects */}
        <div className="space-y-8">
          <motion.div variants={itemVariants} className="bg-[#0A0A0A] rounded-[24px] border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Top Architects</h2>
              <Filter className="size-4 text-gray-500" />
            </div>
            <div className="space-y-6">
              {popularArchitects.map((arc) => (
                <div key={arc.id} className="group cursor-pointer">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="size-14 rounded-2xl overflow-hidden border border-white/10 group-hover:border-indigo-500 transition-all">
                      <img src={arc.image} alt={arc.name} className="size-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white group-hover:text-indigo-400 transition-colors">{arc.name}</h3>
                      <p className="text-xs text-gray-500">{arc.specialty}</p>
                    </div>
                    <div className="flex items-center gap-1 text-orange-400">
                      <Star className="size-3 fill-orange-400" />
                      <span className="text-xs font-bold">{arc.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-4">
                    <MapPin className="size-3" />
                    {arc.location}
                  </div>
                  <Button variant="outline" className="w-full border-white/5 bg-white/[0.02] hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all rounded-xl text-xs h-9">
                    Request Consultation
                  </Button>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-indigo-400 text-sm py-4 h-auto hover:bg-indigo-500/5">
                Explore More Architects
              </Button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gradient-to-br from-orange-600 to-pink-600 rounded-[24px] p-6 text-white relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 size-32 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
            <h3 className="text-xl font-bold mb-2 relative z-10">Premium Support</h3>
            <p className="text-sm text-white/80 mb-6 relative z-10">Get a dedicated advisor for your large-scale architectural projects.</p>
            <Button className="w-full bg-white text-orange-600 hover:bg-white/90 rounded-xl font-bold relative z-10 border-none">
              Get Started
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
