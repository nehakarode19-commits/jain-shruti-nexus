import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { WhoWeServeSection } from "@/components/home/WhoWeServeSection";
import { ResearchToolsSection } from "@/components/home/ResearchToolsSection";
import { AboutPreview } from "@/components/home/AboutPreview";
import { GuruvaniPreview } from "@/components/home/GuruvaniPreview";
import { CommunitySection } from "@/components/home/CommunitySection";
import { AdaniFoundation } from "@/components/home/AdaniFoundation";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <WhoWeServeSection />
      <AboutPreview />
      <ResearchToolsSection />
      <GuruvaniPreview />
      <CommunitySection />
      <AdaniFoundation />
      <CTASection />
    </Layout>
  );
};

export default Index;
