import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/shared/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  BookOpen, 
  Globe, 
  Award, 
  Quote,
  Scroll,
  Calendar,
  MapPin,
  Users,
  Image
} from "lucide-react";
import { gurudevBio, galleryImages } from "@/data/gurudevData";

const milestones = [
  { year: "1923", event: "Born as Chunilal Bhogilal Joitram in Mandal, Gujarat into a deeply religious family" },
  { year: "1946", event: "Initiation into monkhood (Diksha) in the Tapa Gaccha order of Shwetambar Jainism" },
  { year: "1950s", event: "Began intensive study of ancient texts and manuscripts" },
  { year: "1960s", event: "Started extensive manuscript research and preservation work" },
  { year: "1970s", event: "Published critical editions of Jain Agamas" },
  { year: "1980s", event: "Received international recognition for scholarly contributions" },
  { year: "1990s", event: "Continued teaching and mentoring new generation of scholars" },
  { year: "2009", event: "Attained Samadhi, leaving behind an unparalleled legacy of scholarship" },
];

const achievements = [
  {
    icon: BookOpen,
    title: "Scholarly Works",
    description: "Authored and edited over 50 critical editions of Jain Agamas and philosophical texts including Sthananga Sutra, Anuyogdwar Sutra, and Dvadasharam Naychakram",
  },
  {
    icon: Globe,
    title: "Languages Mastered",
    description: "Proficient in Sanskrit, Prakrit, Ardhamagadhi, Gujarati, Hindi, and other classical languages essential for Jain scriptural studies",
  },
  {
    icon: Award,
    title: "Manuscript Preservation",
    description: "Catalogued and preserved thousands of rare Jain manuscripts across India, including the comprehensive Hastlikhit Granthsuchi series",
  },
];

const familyInfo = {
  father: { name: gurudevBio.fatherName, years: gurudevBio.fatherYears },
  mother: { name: gurudevBio.motherName, years: gurudevBio.motherYears },
};

const AboutGurudev = () => {
  return (
    <Layout>
      <SEO 
        title="About Gurudev Muni Jambuvijayji Maharaj Saheb"
        description="Explore the life, teachings, and legacy of Gurudev Muni Jambuvijayji Maharaj Saheb (1923-2009) - a revered Jain saint, scholar, and pioneer in manuscript preservation."
      />
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-hero lotus-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Link 
              to="/about" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
            >
              ← Back to About
            </Link>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-up">
                <p className="text-primary font-heading text-lg mb-2">
                  {gurudevBio.hindiName}
                </p>
                <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
                  Gurudev Muni Jambuvijayji Maharaj Saheb
                </h1>
                <p className="font-body text-lg text-muted-foreground mb-6">
                  {gurudevBio.shortBio}
                </p>
                
                {/* Key Facts */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-body text-base text-muted-foreground">Birth Place</p>
                      <p className="font-body font-medium text-foreground">{gurudevBio.birthPlace}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-body text-base text-muted-foreground">Life Span</p>
                      <p className="font-body font-medium text-foreground">{gurudevBio.birthYear}–{gurudevBio.deathYear}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-body text-base text-muted-foreground">Order</p>
                      <p className="font-body font-medium text-foreground text-base">{gurudevBio.order}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BookOpen className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-body text-base text-muted-foreground">Birth Name</p>
                      <p className="font-body font-medium text-foreground">{gurudevBio.birthName}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button variant="spiritual" asChild>
                    <Link to="/guruvani">
                      Explore Guruvani
                      <Scroll className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/gallery">
                      Photo Gallery
                      <Image className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Gurudev's Photo */}
              <div className="animate-fade-up delay-200">
                <div className="relative rounded-2xl overflow-hidden shadow-elevated">
                  <img 
                    src={gurudevBio.mainImage}
                    alt="Jambuvijayji Maharaj Saheb in white robes sitting cross-legged"
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-6">
                    <p className="font-body text-base text-muted-foreground">
                      Gurudev Muni Jambuvijayji Maharaj Saheb
                    </p>
                  </div>
                </div>
                
                {/* Centenary Logo */}
                <div className="flex justify-center mt-6">
                  <img 
                    src={gurudevBio.centenaryLogo}
                    alt="100th Anniversary Celebration Logo"
                    className="h-32 w-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Family Background */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl font-bold text-foreground text-center mb-8">
              Family Background
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card variant="default">
                <CardContent className="p-6 text-center">
                  <p className="font-body text-base text-muted-foreground mb-1">Father</p>
                  <p className="font-heading font-semibold text-foreground">{familyInfo.father.name}</p>
                  <p className="font-body text-base text-muted-foreground">({familyInfo.father.years})</p>
                </CardContent>
              </Card>
              <Card variant="default">
                <CardContent className="p-6 text-center">
                  <p className="font-body text-base text-muted-foreground mb-1">Mother</p>
                  <p className="font-heading font-semibold text-foreground">{familyInfo.mother.name}</p>
                  <p className="font-body text-base text-muted-foreground">({familyInfo.mother.years})</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-12 bg-burgundy/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Quote className="h-10 w-10 text-burgundy/30 mx-auto mb-4" />
            <blockquote className="font-heading text-xl sm:text-2xl italic text-foreground mb-4">
              "True knowledge illuminates the path of liberation. Through rigorous study 
              and unwavering devotion, one attains the wisdom that transcends worldly bonds."
            </blockquote>
            <p className="font-body text-base text-muted-foreground">— Gurudev Muni Jambuvijayji</p>
          </div>
        </div>
      </section>

      {/* Life Journey */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-12">
            Life Journey
          </h2>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

              {milestones.map((milestone, index) => (
                <div 
                  key={milestone.year}
                  className="relative pl-20 pb-8 animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute left-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <Card variant="default">
                    <CardContent className="p-4">
                      <p className="font-body text-base font-medium text-primary mb-1">{milestone.year}</p>
                      <p className="font-body text-base text-foreground">{milestone.event}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 lg:py-24 bg-gradient-spiritual">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-12">
            Contributions & Achievements
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {achievements.map((item, index) => (
              <Card 
                key={item.title}
                variant="feature"
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="font-body text-base text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Preview */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Photo Gallery
            </h2>
            <Button variant="outline" asChild>
              <Link to="/gallery">
                View All Photos
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {galleryImages.slice(0, 6).map((image, index) => (
              <Link 
                key={index}
                to="/gallery"
                className="aspect-square rounded-xl overflow-hidden group shadow-soft hover:shadow-elevated transition-all"
              >
                <img
                  src={image.thumb}
                  alt={image.alt || `Gurudev Photo ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
            Continue Exploring
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/about/parivar">
                Legacy of Pujyapad Muni Jambuvijayaji Maharaj
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/about/gyan-kendra">
                Research Center
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button variant="hero" asChild>
              <Link to="/guruvani">
                Access Guruvani
                <Scroll className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutGurudev;
