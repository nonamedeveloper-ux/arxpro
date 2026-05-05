import AboutSection from '@/components/sections/about.section'
import ArchitectsSection from '@/components/sections/architects.section'
import CustomersSection from '@/components/sections/customers.section'
import HeroSection from '@/components/sections/hero.section'
import NewsSection from '@/components/sections/news.section'
import ProjectsSection from '@/components/sections/projects.section'
import StatisticsSection from '@/components/sections/statistics.section'
import SubscriptionSection from '@/components/sections/subscription.section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Archify | Home',
  openGraph: {
    title: 'Archify | Home',
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <CustomersSection />
      <ArchitectsSection />
      {/* <CategoriesSection /> */}
      <SubscriptionSection />
      <NewsSection />
      <StatisticsSection />
    </>
  )
}
