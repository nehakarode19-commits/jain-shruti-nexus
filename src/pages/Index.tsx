import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutPreview } from "@/components/home/AboutPreview";
import { WhoWeServeSection } from "@/components/home/WhoWeServeSection";
import { ResearchToolsSection } from "@/components/home/ResearchToolsSection";
import { GuruvaniPreview } from "@/components/home/GuruvaniPreview";
import { CommunitySection } from "@/components/home/CommunitySection";

import { AdaniFoundation } from "@/components/home/AdaniFoundation";
import { CTASection } from "@/components/home/CTASection";
import { SectionDivider } from "@/components/home/SectionDivider";

const Index = () => {
  return (
    <Layout>
      <div className="bg-background">
        <HeroSection />
        <SectionDivider variant="dots" />
        <ResearchToolsSection />
        <SectionDivider />
        <AboutPreview />
        <SectionDivider variant="dots" />
        <GuruvaniPreview />
        <SectionDivider />
        <AdaniFoundation />
        <SectionDivider variant="dots" />
        <CommunitySection />
        <CTASection />
      </div>
    </Layout>
  );
};

export default Index;
