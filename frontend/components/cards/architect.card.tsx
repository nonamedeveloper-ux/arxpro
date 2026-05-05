import { Star } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Card, CardContent } from '../ui/card'
import { cn } from '@/lib/utils'

interface ArchitectCardProps {
  fullName: string
  profession: string
  rating: number
  image: string
  feedback: string
  index: number
  onClick?: () => void
}

const PartialStar = ({ fillPercentage }: { fillPercentage: number }) => {
  return (
    <div className='relative inline-block'>
      <Star className='size-4 text-gray-400' />
      <div
        className='absolute top-0 left-0 overflow-hidden whitespace-nowrap'
        style={{ width: `${fillPercentage * 100}%` }}
      >
        <Star className='size-4 fill-primary text-primary' />
      </div>
    </div>
  )
}

export default function ArchitectCard({
  fullName,
  profession,
  rating,
  image,
  feedback,
  index,
  onClick,
}: ArchitectCardProps) {
  return (
    <Card
      onClick={onClick}
      className={cn('border-blue-1 border-2 rounded-[1rem] bg-background cursor-pointer hover:border-primary transition-colors')}
    >
      <CardContent className='flex gap-8'>
        <Avatar
          className={cn(
            'size-20 border-4 bg-background',
            index % 2 === 1 ? 'border-primary' : 'border-blue-1'
          )}
        >
          <AvatarImage src={image} alt={fullName} className='object-cover' />
          <AvatarFallback className='text-4xl font-bold'>
            {fullName
              .split(' ')
              .map(item => item.at(0))
              .join('')}
          </AvatarFallback>
        </Avatar>

        <div className='flex-1 flex-col space-y-3'>
          <h3 className='text-lg font-bold text-primary'>{fullName}</h3>

          <p className='text-gray-1'>{feedback}</p>

          <div className='flex items-center justify-between'>
            <h4 className='text-base'>{profession}</h4>
            <div className='flex items-center gap-x-1'>
              <div className='flex'>
                {[1, 2, 3, 4, 5].map((starIndex) => {
                  const fillPercentage = Math.min(Math.max(rating - (starIndex - 1), 0), 1)
                  return <PartialStar key={starIndex} fillPercentage={fillPercentage} />
                })}
              </div>
              <span className='text-sm font-bold'>{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
