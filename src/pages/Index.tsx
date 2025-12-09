import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutPreview } from "@/components/home/AboutPreview";
import { WhoWeServeSection } from "@/components/home/WhoWeServeSection";
import { FeaturesHighlight } from "@/components/home/FeaturesHighlight";
import { ResearchToolsSection } from "@/components/home/ResearchToolsSection";
import { LibraryToolsSection } from "@/components/home/LibraryToolsSection";
import { FeatureHighlightSection } from "@/components/home/FeatureHighlightSection";
import { GuruvaniPreview } from "@/components/home/GuruvaniPreview";
import { CommunitySection } from "@/components/home/CommunitySection";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { AdaniFoundation } from "@/components/home/AdaniFoundation";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <div className="bg-background">
        <HeroSection />
        <AboutPreview />
        <WhoWeServeSection />
        <FeaturesHighlight />
        <ResearchToolsSection />
        <LibraryToolsSection />
        <FeatureHighlightSection />
        <GuruvaniPreview />
        <CommunitySection />
        <GalleryPreview />
        <AdaniFoundation />
        <CTASection />
      </div>
    </Layout>
  );
};

export default Index;
