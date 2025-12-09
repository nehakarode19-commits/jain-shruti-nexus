import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
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
      <AboutPreview />
      <ResearchToolsSection />
      <GuruvaniPreview />
      <CommunitySection />
      <CTASection />
      <AdaniFoundation />
    </Layout>
  );
};

export default Index;
