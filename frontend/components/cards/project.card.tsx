import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface ProjectCardProps {
  index: number
  title: string
  description: string
  image: string
  onClick?: () => void
}

export default function ProjectCard({ index, title, description, image, onClick }: ProjectCardProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        'rounded-[4px] border-2 border-transparent transition-all duration-300 hover:scale-105 hover:border-primary hover:shadow-2xl hover:shadow-primary/20',
        index % 2 === 1 ? 'bg-secondary' : 'bg-blue-4'
      )}
    >
      <CardContent className='flex flex-col items-center gap-y-4 py-2'>
        <div className='relative size-[90px] mb-2'>
          <Image src={image} alt={title} fill className='object-cover rounded-full' />
        </div>
        <article className='flex flex-col items-center gap-y-3'>
          <CardTitle className='text-lg font-semibold'>{title}</CardTitle>
          <CardDescription className='text-center text-white-1'>{description}</CardDescription>
        </article>
      </CardContent>
    </Card>
  )
}
