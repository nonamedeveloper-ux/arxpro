import Link from 'next/link'
import { Button } from '../ui/button'

interface MoreButtonProps {
  label: string
  path?: string
  className?: string
  onClick?: () => void
}

export default function MoreButton({ label, className, path, onClick }: MoreButtonProps) {
  if (onClick) {
    return (
      <Button
        variant={'outline'}
        onClick={onClick}
        className={`border-primary text-primary rounded-[8px] hover:text-primary hover:bg-transparent ${className}`}
      >
        {label}
      </Button>
    )
  }

  return (
    <Button
      variant={'outline'}
      className={`border-primary text-primary rounded-[8px] hover:text-primary hover:bg-transparent ${className}`}
      asChild
    >
      <Link href={path || '#'}>{label}</Link>
    </Button>
  )
}
