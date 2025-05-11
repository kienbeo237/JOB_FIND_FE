import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

const HeroBanner = dynamic(() => import("../components/home/hero-banner"), {
  loading: () => (
    <div className="h-[500px] w-full bg-gradient-to-r from-emerald-600/30 to-emerald-400/30 animate-pulse"></div>
  ),
})

const JobSearch = dynamic(() => import("../components/home/job-search"), {
  loading: () => <Skeleton className="h-20 w-full mb-8" />,
})

const TopEmployers = dynamic(() => import("../components/home/top-employers"), {
  loading: () => <Skeleton className="h-40 w-full mb-8" />,
})

const HotJobs = dynamic(() => import("../components/home/hot-jobs"), {
  loading: () => <Skeleton className="h-80 w-full mb-8" />,
})

const FeaturedJobs = dynamic(() => import("../components/home/featured-jobs"), {
  loading: () => <Skeleton className="h-60 w-full mb-8" />,
})

const PremiumFeature = dynamic(() => import("../components/home/premium-feature"), {
  loading: () => <Skeleton className="h-40 w-full mb-8" />,
})

const UrgentJobs = dynamic(() => import("../components/home/urgent-jobs"), {
  loading: () => <Skeleton className="h-60 w-full mb-8" />,
})

const SkillsSection = dynamic(() => import("../components/home/skills-section"), {
  loading: () => <Skeleton className="h-40 w-full mb-8" />,
})

const SalaryCalculator = dynamic(() => import("../components/home/salary-calculator"), {
  loading: () => <Skeleton className="h-40 w-full mb-8" />,
})

const WhyChooseUs = dynamic(() => import("../components/home/why-choose-us"), {
  loading: () => <Skeleton className="h-60 w-full mb-8" />,
})

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Suspense
        fallback={
          <div className="h-[500px] w-full bg-gradient-to-r from-emerald-600/30 to-emerald-400/30 animate-pulse"></div>
        }
      >
        <HeroBanner />
      </Suspense>
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<Skeleton className="h-20 w-full mb-8" />}>
          <JobSearch />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-40 w-full mb-8" />}>
          <TopEmployers />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-60 w-full mb-8" />}>
          <FeaturedJobs />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-60 w-full mb-8" />}>
          <UrgentJobs />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-60 w-full mb-8" />}>
          <WhyChooseUs />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-40 w-full mb-8" />}>
          <SalaryCalculator />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-80 w-full mb-8" />}>
          <HotJobs />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-40 w-full mb-8" />}>
          <SkillsSection />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-40 w-full mb-8" />}>
          <PremiumFeature />
        </Suspense>
      </div>
    </div>
  )
}
