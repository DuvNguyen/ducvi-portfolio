import { getProfile, getProjects } from '@/lib/data'
import { HeroBentoSection } from '@/components/HeroBentoSection'
import { TechMarquee } from '@/components/TechMarquee'
import { CapabilitiesSection } from '@/components/CapabilitiesSection'
import { StackingProjectsSection } from '@/components/StackingProjectsSection'
import { AboutBentoSection } from '@/components/AboutBentoSection'
import { ContactBentoSection } from '@/components/ContactBentoSection'
import { MinimalFooter } from '@/components/MinimalFooter'

export const revalidate = 60

export default async function HomePage() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()])

  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      <HeroBentoSection profile={profile} />
      <TechMarquee />
      <CapabilitiesSection profile={profile} />
      <StackingProjectsSection projects={projects} />
      <div className="relative z-30 bg-canvas">
        <AboutBentoSection profile={profile} />
        <ContactBentoSection profile={profile} />
        <MinimalFooter profile={profile} />
      </div>
    </div>
  )
}
