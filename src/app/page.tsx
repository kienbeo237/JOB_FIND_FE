import HeroBanner from "../components/home/hero-banner"
import JobSearch from "../components/home/job-search"
import TopEmployers from "../components/home/top-employers"
import HotJobs from "../components/home/hot-jobs"
import UrgentJobs from "../components/home/urgent-jobs"
import WhyChooseUs from "../components/home/why-choose-us"
import FeaturedJobs from "../components/home/featured-jobs"
import SalaryCalculator from "../components/home/salary-calculator"
import SkillsSection from "../components/home/skills-section"
import PremiumFeature from "../components/home/premium-feature"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeroBanner />
      <div className="container mx-auto px-4 py-8">
        <JobSearch />
        <TopEmployers />
        <HotJobs />
        <FeaturedJobs />
        <PremiumFeature />
        <UrgentJobs />
        <SkillsSection />
        <SalaryCalculator />
        <WhyChooseUs />
      </div>
    </div>
  )
}
