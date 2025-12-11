import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ResearchToolsSection } from "@/components/home/ResearchToolsSection";
import { GuruvaniPreview } from "@/components/home/GuruvaniPreview";
import { CommunitySection } from "@/components/home/CommunitySection";
import { AdaniFoundation } from "@/components/home/AdaniFoundation";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <div className="bg-background">
        <HeroSection />
        <ResearchToolsSection />
        <AboutPreview />
        <GuruvaniPreview />
        <AdaniFoundation />
        <CommunitySection />
        <CTASection />
      </div>
    </Layout>
  );
};

export default Index;
