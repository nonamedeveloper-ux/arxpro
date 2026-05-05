'use client'

import { projects } from '@/constants'
import ProjectCard from '../cards/project.card'
import Section from '../shared/section'
import { useState, useEffect } from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import { Star, X, Quote, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const PartialStar = ({ fillPercentage }: { fillPercentage: number }) => {
  return (
    <div className='relative inline-block'>
      <Star className='size-5 text-gray-400' />
      <div
        className='absolute top-0 left-0 overflow-hidden whitespace-nowrap'
        style={{ width: `${fillPercentage * 100}%` }}
      >
        <Star className='size-5 fill-primary text-primary' />
      </div>
    </div>
  )
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className='flex gap-1 items-center'>
      {[1, 2, 3, 4, 5].map((starIndex) => {
        const fillPercentage = Math.min(Math.max(rating - (starIndex - 1), 0), 1)
        return <PartialStar key={starIndex} fillPercentage={fillPercentage} />
      })}
      <span className='ml-2 text-lg font-bold text-white'>{rating.toFixed(1)}</span>
    </div>
  )
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [visibleCount, setVisibleCount] = useState(5)
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const loadMore = () => {
    if (visibleCount >= projects.length) return
    
    setIsLoading(true)
    // Simulate network delay for better UX
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 6, projects.length))
      setIsLoading(false)
    }, 600)
  }

  if (!mounted) return null

  const visibleProjects = projects.slice(0, visibleCount)
  const hasMore = visibleCount < projects.length

  return (
    <Section
      id='projects'
      sectionHeaderTitle='Projects'
      moreButtonLabel={isLoading ? 'Loading...' : hasMore ? 'More Projects' : ''}
      moreButtonOnClick={hasMore ? loadMore : undefined}
      sectionHeaderDescription="Explore our latest architectural masterpieces. From modern villas to sustainable urban designs, each project tells a unique story."
    >
      <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6'>
        <AnimatePresence mode='popLayout'>
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.title + index}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ 
                duration: 0.4, 
                delay: (index % 6) * 0.1,
                type: 'spring',
                stiffness: 100 
              }}
              layout
            >
              <ProjectCard
                index={index + 1}
                title={project.title}
                description={project.description}
                image={project.image}
                onClick={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {isLoading && (
        <div className='flex justify-center mt-8'>
          <Loader2 className='size-8 text-primary animate-spin' />
        </div>
      )}

      <AnimatePresence mode='wait'>
        {selectedProject && (
          <Dialog open={true} onOpenChange={() => setSelectedProject(null)}>
            <DialogContent className='max-w-4xl w-[95vw] max-h-[90vh] p-0 overflow-hidden bg-[#181928] border border-blue-1/20 rounded-2xl z-[9999] shadow-2xl overflow-y-auto custom-scrollbar'>
              <button 
                onClick={() => setSelectedProject(null)}
                className='absolute right-6 top-6 z-[10000] p-2 bg-black/50 hover:bg-black/80 rounded-full transition-colors text-white'
              >
                <X className='size-6' />
              </button>

              <div className='flex flex-col'>
                <div className='relative w-full aspect-video md:aspect-[21/9] overflow-hidden'>
                  <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className='size-full'
                  >
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      className='object-cover'
                    />
                  </motion.div>
                  <div className='absolute inset-0 bg-gradient-to-t from-[#181928] to-transparent' />
                  <div className='absolute bottom-8 left-8'>
                    <h2 className='text-4xl md:text-5xl font-black text-white shadow-sm'>
                      {selectedProject.title}
                    </h2>
                  </div>
                </div>

                <div className='p-8 md:p-12 space-y-12'>
                  <div className='space-y-4'>
                    <h3 className='text-xl font-bold text-primary uppercase tracking-wider'>Description</h3>
                    <p className='text-xl text-gray-2 leading-relaxed'>
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className='bg-blue-1/10 p-8 rounded-2xl border border-blue-1/20 relative'>
                    <Quote className='absolute -top-4 -left-4 size-12 text-primary opacity-20' />
                    <h3 className='text-xl font-bold text-white mb-4 flex items-center gap-2'>
                      Client&apos;s Thought
                    </h3>
                    <p className='text-2xl italic text-gray-1 leading-snug font-serif'>
                      &ldquo;{selectedProject.clientThought}&rdquo;
                    </p>
                  </div>

                  <div className='pt-8 border-t border-blue-1/20'>
                    <h3 className='text-xl font-bold text-primary uppercase tracking-wider mb-6'>Lead Architect</h3>
                    <div className='flex items-center gap-6'>
                      <div className='relative size-20 rounded-full overflow-hidden border-2 border-primary'>
                        <Image
                          src={selectedProject.architect.image}
                          alt={selectedProject.architect.name}
                          fill
                          className='object-cover'
                        />
                      </div>
                      <div className='space-y-2'>
                        <h4 className='text-2xl font-bold text-white'>{selectedProject.architect.name}</h4>
                        <StarRating rating={selectedProject.architect.rating} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </Section>
  )
}
