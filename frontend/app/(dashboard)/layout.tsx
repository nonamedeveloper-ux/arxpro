import Header from '@/components/shared/header'
import Footer from '@/components/shared/footer'
import { ChildProps } from '@/types'

export default function DashboardLayout({ children }: ChildProps) {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Header />
      <main className="pt-28 pb-20 px-4 sm:px-10 lg:px-20 max-w-7xl mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  )
}
