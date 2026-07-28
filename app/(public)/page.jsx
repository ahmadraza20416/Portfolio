import HomeContent from '@/components/public/HomeContent';
import { getAllPublicData } from '@/lib/db';

// ⚡ ISR: Page is statically generated and revalidated every 60 seconds
export const revalidate = 60;

export default async function HomePage() {
  const { profile, navItems, skills, experience, projects, testimonials, dynamicSections } = await getAllPublicData();

  return (
    <HomeContent
      profile={profile}
      navItems={navItems}
      skills={skills}
      experience={experience}
      projects={projects}
      testimonials={testimonials}
      dynamicSections={dynamicSections}
    />
  );
}
