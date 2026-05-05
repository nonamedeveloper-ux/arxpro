'use client'

import { testimonials } from '@/constants'
import CustomerCard from '../cards/customer.card'
import Section from '../shared/section'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export default function CustomersSection() {
  const [visibleCount, setVisibleCount] = useState(4)
  const [isLoading, setIsLoading] = useState(false)

  const loadMore = () => {
    if (visibleCount >= testimonials.length) return
    
    setIsLoading(true)
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 4, testimonials.length))
      setIsLoading(false)
    }, 600)
  }

  const visibleTestimonials = testimonials.slice(0, visibleCount)
  const hasMore = visibleCount < testimonials.length

  return (
    <Section
      sectionHeaderTitle='Happy Customer'
      sectionClassName='bg-black-1 max-sm:px-4 sm:px-24'
      moreButtonLabel={isLoading ? 'Loading...' : hasMore ? 'More Testimonials' : ''}
      moreButtonOnClick={hasMore ? loadMore : undefined}
      moreButtonClassName='bg-black-1'
      sectionHeaderDescription="Read what our clients have to say about their journey with Archify. Their satisfaction is our greatest reward."
    >
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
        <AnimatePresence mode='popLayout'>
          {visibleTestimonials.map((item, index) => (
            <motion.div
              key={item.fullName + index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                duration: 0.5, 
                delay: (index % 4) * 0.1,
                ease: 'easeOut'
              }}
              layout
            >
              <CustomerCard
                fullName={item.fullName}
                profession={item.profession}
                comment={item.comment}
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
    </Section>
  )
}
