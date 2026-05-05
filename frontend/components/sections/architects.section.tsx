'use client'

import { architects } from '@/constants'
import ArchitectCard from '../cards/architect.card'
import Section from '../shared/section'
import { useState, useEffect } from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import { Star, X, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/button'

const PartialStar = ({ fillPercentage }: { fillPercentage: number }) => {
  return (
    <div className='relative inline-block'>
      <Star className='size-6 text-gray-400' />
      <div
        className='absolute top-0 left-0 overflow-hidden whitespace-nowrap'
        style={{ width: `${fillPercentage * 100}%` }}
      >
        <Star className='size-6 fill-primary text-primary' />
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
      <span className='ml-2 text-xl font-bold text-white'>{rating.toFixed(1)}</span>
    </div>
  )
}

export default function ArchitectsSection() {
  const [selectedArch, setSelectedArch] = useState<(typeof architects)[0] | null>(null)
  const [visibleCount, setVisibleCount] = useState(3)
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLoadMore = () => {
    if (visibleCount >= architects.length) return
    
    setIsLoading(true)
    // Small delay for the loader feel
    setTimeout(() => {
      setVisibleCount((prev) => prev + 6)
      setIsLoading(false)
    }, 600)
  }

  if (!mounted) return null

  const visibleArchitects = architects.slice(0, visibleCount)
  const hasMore = visibleCount < architects.length

  return (
    <Section
      id='architects'
      sectionHeaderTitle='Our Architects'
      sectionClassName='max-sm:px-4 sm:px-24'
      sectionHeaderDescription="Our team of world-class architects is dedicated to turning your vision into reality."
    >
      <div className='flex flex-col gap-y-12'>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-8'>
          <AnimatePresence mode='popLayout'>
            {visibleArchitects.map((arch, index) => (
              <motion.div
                key={`${arch.fullName}-${index}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.4, 
                  delay: (index % 6) * 0.1 
                }}
              >
                <ArchitectCard
                  fullName={arch.fullName}
                  image={arch.image}
                  feedback={arch.feedback}
                  profession={arch.profession}
                  rating={arch.rating}
                  index={index + 1}
                  onClick={() => setSelectedArch(arch)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {hasMore && (
          <div className='flex justify-center'>
            <Button
              onClick={handleLoadMore}
              disabled={isLoading}
              className='bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white px-10 py-6 rounded-xl text-lg font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/10'
            >
              {isLoading ? (
                <div className='flex items-center gap-2'>
                  <Loader2 className='animate-spin size-5' />
                  <span>Loading Professionals...</span>
                </div>
              ) : (
                'More Architects'
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Modal remains the same */}
      <AnimatePresence>
        {selectedArch && (
          <Dialog open={true} onOpenChange={() => setSelectedArch(null)}>
            <DialogContent className='max-w-6xl w-[95vw] h-[85vh] p-0 overflow-hidden bg-[#181928] border border-blue-1/20 rounded-2xl z-[9999] shadow-2xl'>
              <button 
                onClick={() => setSelectedArch(null)}
                className='absolute right-6 top-6 z-[10000] p-2 bg-black/50 hover:bg-black/80 rounded-full transition-colors text-white'
              >
                <X className='size-6' />
              </button>

              <div className='flex h-full flex-col md:flex-row overflow-hidden'>
                <div className='w-full md:w-[40%] p-8 md:p-12 flex flex-col justify-center bg-blue-1/5 h-full border-r border-blue-1/20 overflow-y-auto'>
                  <div className='flex flex-col items-center md:items-start space-y-6'>
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className='relative size-48 md:size-64 rounded-2xl overflow-hidden border-4 border-primary shadow-2xl'
                    >
                      <Image
                        src={selectedArch.image}
                        alt={selectedArch.fullName}
                        fill
                        className='object-cover'
                      />
                    </motion.div>
                    
                    <div className='text-center md:text-left space-y-4 w-full'>
                      <h2 className='text-4xl md:text-5xl font-black text-primary leading-tight'>
                        {selectedArch.fullName}
                      </h2>
                      <p className='text-xl md:text-2xl text-gray-2 font-semibold'>
                        {selectedArch.profession}
                      </p>
                      
                      <div className='py-6 border-y border-blue-1/20'>
                        <p className='text-lg italic text-gray-2 mb-6'>
                          "{selectedArch.feedback}"
                        </p>
                        <StarRating rating={selectedArch.rating} />
                      </div>

                      <div className='flex flex-wrap gap-4 pt-4'>
                        <div className='bg-blue-1/20 p-4 rounded-xl shadow-sm border border-blue-1/10 flex-1 text-center'>
                          <p className='text-2xl font-bold text-primary'>15+</p>
                          <p className='text-sm text-gray-200'>Projects</p>
                        </div>
                        <div className='bg-blue-1/20 p-4 rounded-xl shadow-sm border border-blue-1/10 flex-1 text-center'>
                          <p className='text-2xl font-bold text-primary'>8+</p>
                          <p className='text-sm text-gray-200'>Experience</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='w-full md:w-[60%] p-8 bg-[#181928] flex flex-col h-full'>
                  <h3 className='text-2xl font-bold mb-6 text-white flex items-center gap-2'>
                    Portfolio Showcase
                  </h3>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto pr-2 custom-scrollbar'>
                    {selectedArch.projects.map((proj, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className='group relative aspect-video rounded-xl overflow-hidden cursor-pointer bg-blue-1/10'
                      >
                        <Image
                          src={proj}
                          alt={`Project ${idx + 1}`}
                          fill
                          className='object-cover transition-transform duration-500 group-hover:scale-110'
                        />
                        <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                          <span className='text-white font-bold border-2 border-white px-4 py-2 rounded-lg'>
                            View Project
                          </span>
                        </div>
                      </motion.div>
                    ))}
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
