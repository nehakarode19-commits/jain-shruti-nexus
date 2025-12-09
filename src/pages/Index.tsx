import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutPreview } from "@/components/home/AboutPreview";
import { WhoWeServeSection } from "@/components/home/WhoWeServeSection";
import { FeaturesHighlight } from "@/components/home/FeaturesHighlight";
import { ResearchToolsSection } from "@/components/home/ResearchToolsSection";
import { GuruvaniPreview } from "@/components/home/GuruvaniPreview";
import { CommunitySection } from "@/components/home/CommunitySection";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { AdaniFoundation } from "@/components/home/AdaniFoundation";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutPreview />
      <WhoWeServeSection />
      <FeaturesHighlight />
      <ResearchToolsSection />
      <GuruvaniPreview />
      <CommunitySection />
      <GalleryPreview />
      <AdaniFoundation />
      <CTASection />
    </Layout>
  );
};

export default Index;
