import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { AboutPreview } from "@/components/home/AboutPreview";
import { GuruvaniPreview } from "@/components/home/GuruvaniPreview";
import { CommunitySection } from "@/components/home/CommunitySection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <AboutPreview />
      <GuruvaniPreview />
      <CommunitySection />
      <CTASection />
    </Layout>
  );
};

export default Index;
