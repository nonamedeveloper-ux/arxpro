'use client'

import React, { useState, useEffect } from 'react'
import { 
  User, 
  MapPin, 
  Briefcase, 
  Globe, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  Camera, 
  Loader, 
  Save, 
  Tag, 
  ExternalLink,
  ChevronRight,
  Plus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import useCurrentUser from '@/hooks/use-current-user'
import { 
  getArchitectByUserId, 
  updateArchitect, 
  createArchitect, 
  uploadImages 
} from '@/actions/project.action'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ProfilePage() {
  const { currentUser } = useCurrentUser()
  const [architect, setArchitect] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [projects, setProjects] = useState<any[]>([])

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nickName: '',
    email: '',
    aboutMe: '',
    category: '',
    instagram: '',
    telegram: '',
    facebook: '',
    birthDate: '',
  })
  
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (currentUser?.id) {
      loadProfile()
    }
  }, [currentUser])

  const loadProfile = async () => {
    setIsLoading(true)
    try {
      const res = await getArchitectByUserId(currentUser!.id!)
      if (res.status === 200 && res.data) {
        setArchitect(res.data)
        setFormData({
          firstName: res.data.firstName || '',
          lastName: res.data.lastName || '',
          nickName: res.data.nickName || '',
          email: res.data.email || '',
          aboutMe: res.data.aboutMe || '',
          category: res.data.category || '',
          instagram: res.data.instagram || '',
          telegram: res.data.telegram || '',
          facebook: res.data.facebook || '',
          birthDate: res.data.birthDate ? new Date(res.data.birthDate).toISOString().split('T')[0] : '',
        })
        if (res.data.profileImagePath) {
          setPreviewUrl(`${process.env.NEXT_PUBLIC_API_URL}/${res.data.profileImagePath}`)
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfileImage(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSave = async () => {
    if (!formData.firstName || !formData.lastName || !formData.nickName) {
      toast.error('First name, last name, and nickname are required')
      return
    }

    setIsSaving(true)
    try {
      let profileImageId = architect?.profileImageId

      // 1. Upload Image if changed
      if (profileImage) {
        const imageFormData = new FormData()
        imageFormData.append('file', profileImage)
        
        const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/file/upload-one-image`, {
          method: 'POST',
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('access_token')}` 
          },
          body: imageFormData,
        })
        
        const uploadJson = await uploadRes.json()
        if (uploadRes.ok) {
          profileImageId = uploadJson.data.id
        }
      }

      const payload = {
        ...formData,
        userId: currentUser?.id,
        profileImageId,
        backgroundImageId: architect?.backgroundImageId || '00000000-0000-0000-0000-000000000000', // Default or existing
        districtId: architect?.districtId || '00000000-0000-0000-0000-000000000000', // Default or existing
      }

      let res
      if (architect?.id) {
        res = await updateArchitect(architect.id, payload)
      } else {
        res = await createArchitect(payload)
      }

      if (res.status === 200 || res.status === 201) {
        toast.success('Profile updated successfully')
        loadProfile()
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader className="size-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className='space-y-12'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
        {/* Left Column: Preview */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className='space-y-8'
        >
          <Card className='bg-[#0A0A0A]/50 border-white/10 overflow-hidden backdrop-blur-md'>
            <div className='h-32 bg-gradient-to-r from-orange-600 to-orange-900 relative' />
            <CardContent className='relative pt-0 flex flex-col items-center -mt-16 text-center px-6 pb-8'>
              <div className='relative group'>
                <Avatar className='size-32 border-4 border-[#050505] shadow-2xl'>
                  <AvatarImage src={previewUrl || ''} />
                  <AvatarFallback className='text-4xl bg-primary/20 text-primary'>
                    {formData.firstName.at(0)}{formData.lastName.at(0)}
                  </AvatarFallback>
                </Avatar>
                <label className='absolute bottom-0 right-0 size-10 bg-orange-600 rounded-full flex items-center justify-center cursor-pointer border-4 border-[#050505] hover:bg-orange-700 transition-colors'>
                  <Camera className='size-5' />
                  <input type='file' className='hidden' onChange={handleImageChange} accept='image/*' />
                </label>
              </div>
              
              <div className='mt-6 space-y-2'>
                <h2 className='text-2xl font-bold'>{formData.firstName} {formData.lastName}</h2>
                <p className='text-orange-500 font-medium'>@{formData.nickName}</p>
                <div className='flex items-center justify-center gap-2 text-gray-400 text-sm'>
                  <MapPin className='size-3' />
                  <span>Uzbekistan</span>
                </div>
              </div>

              <div className='w-full border-t border-white/5 my-6 pt-6'>
                <p className='text-sm text-gray-400 italic line-clamp-4'>
                  "{formData.aboutMe || 'Your architectural journey starts here. Add a bio to let others know about your vision.'}"
                </p>
              </div>

              <div className='flex gap-4'>
                <Button variant='outline' size='icon' className='rounded-full border-white/10 hover:bg-white/5'>
                  <Instagram className='size-4' />
                </Button>
                <Button variant='outline' size='icon' className='rounded-full border-white/10 hover:bg-white/5'>
                  <Linkedin className='size-4' />
                </Button>
                <Button variant='outline' size='icon' className='rounded-full border-white/10 hover:bg-white/5'>
                  <Globe className='size-4' />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-white/5 border-white/10'>
            <CardHeader>
              <CardTitle className='text-lg'>Specialization</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-wrap gap-2'>
              {formData.category.split(',').map(tag => tag.trim()).filter(Boolean).map(tag => (
                <Badge key={tag} className='bg-orange-500/10 text-orange-500 border-none px-3 py-1'>
                  {tag}
                </Badge>
              )) || <p className='text-xs text-gray-500'>No tags added</p>}
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column: Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className='lg:col-span-2 space-y-8'
        >
          <Card className='bg-[#0A0A0A]/50 border-white/10 backdrop-blur-md'>
            <CardHeader className='flex flex-row items-center justify-between border-b border-white/5 pb-6'>
              <div>
                <CardTitle className='text-2xl'>Edit Profile</CardTitle>
                <p className='text-sm text-gray-400 mt-1'>Keep your professional information up to date.</p>
              </div>
              <Button 
                onClick={handleSave} 
                className='bg-orange-600 hover:bg-orange-700 text-white px-8'
                disabled={isSaving}
              >
                {isSaving ? <Loader className='size-4 animate-spin mr-2' /> : <Save className='size-4 mr-2' />}
                Save Changes
              </Button>
            </CardHeader>
            <CardContent className='pt-8 space-y-8'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <Label htmlFor='firstName'>First Name</Label>
                  <Input id='firstName' value={formData.firstName} onChange={handleInputChange} className='bg-white/5 border-white/10 h-12' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='lastName'>Last Name</Label>
                  <Input id='lastName' value={formData.lastName} onChange={handleInputChange} className='bg-white/5 border-white/10 h-12' />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <Label htmlFor='nickName'>Nickname</Label>
                  <Input id='nickName' value={formData.nickName} onChange={handleInputChange} className='bg-white/5 border-white/10 h-12' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email Address</Label>
                  <Input id='email' type='email' value={formData.email} onChange={handleInputChange} className='bg-white/5 border-white/10 h-12' />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='aboutMe'>Bio / About Me</Label>
                <Textarea 
                  id='aboutMe' 
                  value={formData.aboutMe} 
                  onChange={handleInputChange} 
                  className='bg-white/5 border-white/10 min-h-[150px] resize-none' 
                  placeholder='Describe your architectural philosophy and experience...'
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <Label htmlFor='category'>Specialization (Tags, comma separated)</Label>
                  <Input 
                    id='category' 
                    value={formData.category} 
                    onChange={handleInputChange} 
                    placeholder='Residential, Commercial, Sustainable' 
                    className='bg-white/5 border-white/10 h-12' 
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='birthDate'>Birth Date</Label>
                  <Input id='birthDate' type='date' value={formData.birthDate} onChange={handleInputChange} className='bg-white/5 border-white/10 h-12' />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <Label htmlFor='instagram'>Instagram Profile URL</Label>
                  <Input id='instagram' value={formData.instagram} onChange={handleInputChange} className='bg-white/5 border-white/10 h-12' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='telegram'>Telegram Handle / Link</Label>
                  <Input id='telegram' value={formData.telegram} onChange={handleInputChange} className='bg-white/5 border-white/10 h-12' />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Section: Portfolio Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className='space-y-8'
      >
        <div className='flex items-center justify-between'>
          <h2 className='text-3xl font-bold'>Portfolio Preview</h2>
          <Button variant='link' asChild className='text-orange-500 hover:no-underline'>
            <Link href='/projects' className='flex items-center'>
              Manage Portfolio <ChevronRight className='size-4 ml-1' />
            </Link>
          </Button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
           {projects.length > 0 ? (
             projects.slice(0, 3).map((project, idx) => (
               <Card key={idx} className='bg-white/5 border-white/10 overflow-hidden group cursor-pointer'>
                 <div className='aspect-video relative overflow-hidden'>
                   <img src={project.image} alt='' className='size-full object-cover group-hover:scale-110 transition-transform duration-500' />
                 </div>
                 <CardContent className='p-4'>
                   <h3 className='font-bold text-lg'>{project.title}</h3>
                   <p className='text-sm text-gray-500'>{project.category}</p>
                 </CardContent>
               </Card>
             ))
           ) : (
             <Card className='md:col-span-3 bg-white/5 border-dashed border-white/10 h-64 flex flex-col items-center justify-center space-y-4'>
                <Plus className='size-12 text-gray-600' />
                <div className='text-center'>
                  <p className='text-gray-400'>No projects in portfolio yet.</p>
                  <Link href='/projects' className='text-orange-500 text-sm font-semibold hover:underline'>Start building your portfolio</Link>
                </div>
             </Card>
           )}
        </div>
      </motion.div>
    </div>
  )
}
