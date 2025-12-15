import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/shared/SEO";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ResearchToolsSection } from "@/components/home/ResearchToolsSection";
import { StatsAndServicesSection } from "@/components/home/StatsAndServicesSection";
import { GuruvaniPreview } from "@/components/home/GuruvaniPreview";
import { CommunitySection } from "@/components/home/CommunitySection";
import { AdaniFoundation } from "@/components/home/AdaniFoundation";

const Index = () => {
  return (
    <Layout>
      <SEO />
      <div className="bg-background">
        <HeroSection />
        <ResearchToolsSection />
        <AboutPreview />
        <GuruvaniPreview />
        <AdaniFoundation />
        <CommunitySection />
        <StatsAndServicesSection />
      </div>
    </Layout>
  );
};

export default Index;
