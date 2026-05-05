import Image from 'next/image'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className='relative min-h-screen w-full bg-black-1'>
      <Image
        src={'/images/bg-hero.png'}
        alt='Hero Image'
        fill
        className='opacity-25 object-cover'
      />
      <div className='border-white-1 border-4 absolute z-20  max-md:top-32 md:top-40 max-md:left-12 md:left-40 max-md:right-12 md:right-40 max-md:bottom-32 md:bottom-40'>
        <div className='size-full z-30 relative'>
          <div className='size-full max-md:flex-col flex items-center md:items-start max-md:pl-4 md:pl-24 lg:pl-36 max-md:pr-4 md:pr-12 lg:pr-24 max-md:gap-8 md:gap-12 lg:gap-24 md:mt-28'>
            <div className='flex flex-col gap-y-6 md:flex-1 max-md:mt-16'>
              <h2 className='max-md:text-2xl md:text-4xl font-bold '>
                This is a website where the works of the best architecture designers are shown.
              </h2>
              <div className='max-md:hidden'>
                <Link href={'#projects'}>
                  <Button className='rounded-[8px]'>
                    Show More <ArrowRight />
                  </Button>
                </Link>
              </div>
            </div>

            <p className='md:flex-1'>

            </p>

            <div className='md:hidden'>
              <Link href={'#projects'}>
                <Button className='rounded-[8px]'>
                  Show More <ArrowRight />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
