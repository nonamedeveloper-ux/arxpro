'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2, MapPin, Tag, X, Upload, Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { createProject, uploadImages, getArchitectByUserId } from '@/actions/project.action'
import useCurrentUser from '@/hooks/use-current-user'

export default function ProjectsPage() {
  const { currentUser } = useCurrentUser()
  const [architect, setArchitect] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [open, setOpen] = useState(false)
  
  // Form State
  const [title, setTitle] = useState('')
  const [size, setSize] = useState('')
  const [area, setArea] = useState('')
  const [price, setPrice] = useState('')
  const [tegs, setTegs] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Modern Minimalist Villa',
      description: 'A stunning minimalist villa with floor-to-ceiling glass walls.',
      category: 'Residential',
      location: 'Tashkent, Uzbekistan',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'Eco-Friendly Office Hub',
      description: 'Zero-emission office building featuring vertical gardens.',
      category: 'Commercial',
      location: 'Samarkand, Uzbekistan',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'
    }
  ])

  useEffect(() => {
    if (currentUser?.id) {
      getArchitectByUserId(currentUser.id).then(res => {
        if (res.status === 200) setArchitect(res.data)
      })
    }
  }, [currentUser])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    setSelectedFiles(prev => [...prev, ...files])
    
    const newPreviews = files.map(file => URL.createObjectURL(file))
    setPreviews(prev => [...prev, ...newPreviews])
  }

  const removeImage = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
    setPreviews(prev => {
      URL.revokeObjectURL(prev[index])
      return prev.filter((_, i) => i !== index)
    })
  }

  const handleSave = async () => {
    if (!title || selectedFiles.length === 0) {
      toast.error('Title and at least one image are required')
      return
    }

    if (!architect) {
      toast.error('Architect profile not found. Please complete your profile first.')
      return
    }

    setIsLoading(true)
    try {
      // 1. Upload Images
      const formData = new FormData()
      selectedFiles.forEach(file => formData.append('files', file))
      
      setIsUploading(true)
      const uploadRes = await uploadImages(formData)
      setIsUploading(false)

      if (uploadRes.status !== 201 || !uploadRes.data) {
        toast.error(uploadRes.message)
        setIsLoading(false)
        return
      }

      // 2. Create Project
      const projectData = {
        size: size || title, // Use title as fallback if size is empty
        area: area || 'Unknown',
        price: parseInt(price) || 0,
        tegs: tegs || '#archify',
        architektorId: architect.id,
        projectImageId: uploadRes.data
      }

      const createRes = await createProject(projectData)

      if (createRes.status === 201) {
        toast.success('Project created successfully')
        setOpen(false)
        // Reset form
        setTitle('')
        setSize('')
        setArea('')
        setPrice('')
        setTegs('')
        setSelectedFiles([])
        setPreviews([])
      } else {
        toast.error(createRes.message)
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='space-y-10'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <div>
          <h1 className='text-4xl font-bold'>My Projects</h1>
          <p className='text-gray-400 mt-2'>Manage and showcase your architectural masterpieces.</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className='bg-primary text-white-1 hover:bg-primary/90 rounded-full px-6'>
              <Plus className='mr-2 size-4' /> Add New Project
            </Button>
          </DialogTrigger>
          <DialogContent className='bg-[#0A0A0A] border-white/10 text-white sm:max-w-[700px] max-h-[90vh] overflow-y-auto custom-scrollbar'>
            <DialogHeader>
              <DialogTitle className="text-2xl">Add New Project</DialogTitle>
              <DialogDescription className='text-gray-400'>
                Fill in the details below to showcase your new project.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-6 py-4'>
              <div className='grid gap-2'>
                <Label htmlFor='title'>Project Title <span className="text-red-500">*</span></Label>
                <Input 
                  id='title' 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder='e.g. Modern Minimalist Villa' 
                  className='bg-white/5 border-white/10 h-11' 
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='size'>Size / Dimensions</Label>
                  <Input 
                    id='size' 
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    placeholder='e.g. 250m²' 
                    className='bg-white/5 border-white/10 h-11' 
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='area'>Area / District</Label>
                  <Input 
                    id='area' 
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder='e.g. Chilanzar, Tashkent' 
                    className='bg-white/5 border-white/10 h-11' 
                  />
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='price'>Price (USD)</Label>
                  <Input 
                    id='price' 
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder='e.g. 150000' 
                    className='bg-white/5 border-white/10 h-11' 
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='tegs'>Tags</Label>
                  <Input 
                    id='tegs' 
                    value={tegs}
                    onChange={(e) => setTegs(e.target.value)}
                    placeholder='#modern #sustainable' 
                    className='bg-white/5 border-white/10 h-11' 
                  />
                </div>
              </div>

              <div className='grid gap-3'>
                <Label>Project Images <span className="text-red-500">*</span></Label>
                
                <div className="grid grid-cols-4 gap-4">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group">
                      <img src={preview} alt={`Preview ${index}`} className="size-full object-cover" />
                      <button 
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 size-6 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  ))}
                  
                  <label className="aspect-square rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
                    <Upload className="size-6 text-gray-500" />
                    <span className="text-[10px] text-gray-500 font-medium">Upload</span>
                    <input type="file" multiple className="hidden" onChange={handleFileChange} accept="image/*" />
                  </label>
                </div>
              </div>
            </div>
            <div className='flex justify-end gap-4 pt-4 border-t border-white/10'>
              <Button variant='ghost' onClick={() => setOpen(false)} disabled={isLoading}>Cancel</Button>
              <Button 
                onClick={handleSave} 
                className='bg-primary text-white-1 px-8'
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="mr-2 size-4 animate-spin" />
                    {isUploading ? 'Uploading Images...' : 'Saving Project...'}
                  </>
                ) : 'Save Project'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500' />
          <Input 
            placeholder='Search projects...' 
            className='pl-10 bg-white/5 border-white/10 w-full'
          />
        </div>
        <Button variant='outline' className='border-white/10 hover:bg-white/5'>
          <Filter className='mr-2 size-4' /> Filter
        </Button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {projects.map((project) => (
          <Card key={project.id} className='bg-white/5 border-white/10 overflow-hidden group'>
            <div className='relative h-64'>
              <img 
                src={project.image} 
                alt={project.title} 
                className='size-full object-cover group-hover:scale-105 transition-transform duration-500'
              />
              <div className='absolute top-4 right-4'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size='icon' variant='secondary' className='rounded-full bg-black/50 backdrop-blur-md border-white/10 hover:bg-black/70'>
                      <MoreVertical className='size-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end' className='bg-[#0A0A0A] border-white/10 text-white'>
                    <DropdownMenuItem className='cursor-pointer'>
                      <Edit2 className='mr-2 size-4' /> Edit Project
                    </DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer text-destructive focus:text-destructive'>
                      <Trash2 className='mr-2 size-4' /> Delete Project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <CardHeader>
              <div className='flex justify-between items-start'>
                <CardTitle className='text-xl'>{project.title}</CardTitle>
              </div>
              <div className='flex items-center gap-4 text-sm text-gray-400 mt-2'>
                <span className='flex items-center'><Tag className='size-3 mr-1' /> {project.category}</span>
                <span className='flex items-center'><MapPin className='size-3 mr-1' /> {project.location}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className='text-gray-400 text-sm line-clamp-2'>{project.description}</p>
            </CardContent>
            <CardFooter className='border-t border-white/5 pt-4'>
              <Button variant='link' className='text-primary p-0 h-auto font-semibold hover:no-underline'>
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
