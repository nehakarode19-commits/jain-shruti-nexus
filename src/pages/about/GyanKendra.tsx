import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Building2, 
  BookOpen, 
  Scroll,
  Image as ImageIcon,
  Video,
  MapPin,
  Clock,
  Mail,
  ExternalLink,
  Quote,
  
  Globe,
  MessageSquare,
  PlayCircle,
  Users,
  Search,
  FileText,
  GraduationCap,
  Languages
} from "lucide-react";

const facilities = [
  {
    icon: Scroll,
    title: "Manuscript Archives",
    description: "Rare handwritten manuscripts, palm leaf texts, and historical documents preserved with utmost care"
  },
  {
    icon: BookOpen,
    title: "Library Section",
    description: "Extensive collection of published works, including Gurudev's edited Agamas and philosophical texts"
  },
  {
    icon: ImageIcon,
    title: "Photo Gallery",
    description: "Historical photographs documenting Gurudev's life, travels, and scholarly activities"
  },
  {
    icon: Video,
    title: "Audio-Visual Archives",
    description: "Recordings of lectures, discourses, and documentaries about Gurudev's contributions"
  },
];

const highlights = [
  {
    title: "Original Manuscripts",
    count: "500+",
    description: "Rare handwritten texts"
  },
  {
    title: "Published Works",
    count: "200+",
    description: "Books and publications"
  },
  {
    title: "Historical Photos",
    count: "1000+",
    description: "Archival photographs"
  },
  {
    title: "Audio Recordings",
    count: "100+",
    description: "Lectures and discourses"
  },
];

const testimonials = [
  {
    name: "Dr. Ramesh Jain",
    designation: "Professor, Jain Studies",
    institution: "University of Mumbai",
    quote: "Muni Jambuvijayaji Research Center is an invaluable resource for Jain scholarship. The manuscript collection is unparalleled, and the staff's dedication to preservation is commendable.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
  },
  {
    name: "Prof. Nalini Shah",
    designation: "Research Scholar",
    institution: "Gujarat University",
    quote: "My research on Prakrit literature was transformed by the resources available here. The digital archives and expert guidance made my work significantly easier.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
  },
  {
    name: "Dr. Mahavir Sanghi",
    designation: "Indologist",
    institution: "Bhandarkar Oriental Research Institute",
    quote: "This center bridges traditional Jain knowledge with modern research methodologies. A must-visit for anyone serious about Agamic studies.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
  }
];

const indologyFeatures = [
  {
    icon: Scroll,
    title: "Manuscript Studies",
    description: "Explore ancient Jain manuscripts with scholarly annotations and detailed textual analysis"
  },
  {
    icon: Languages,
    title: "Multi-Script Support",
    description: "Access texts in Prakrit, Sanskrit, Gujarati, and Devanagari with transliteration support"
  },
  {
    icon: BookOpen,
    title: "Comparative Studies",
    description: "Research connections between Jain literature and Vedic, Buddhist, and Sanskrit traditions"
  },
  {
    icon: Globe,
    title: "Indology Resources",
    description: "Comprehensive databases connecting Jain philosophy with broader Indian scholarly traditions"
  }
];

const forumFeatures = [
  {
    icon: MessageSquare,
    title: "Discussion Forums",
    description: "Engage with scholars worldwide on topics ranging from Agamic interpretation to manuscript authentication",
    link: "/scholar/feed",
    linkText: "Join Discussions"
  },
  {
    icon: PlayCircle,
    title: "Lecture Repository",
    description: "Access recorded lectures from renowned scholars on Jain philosophy, history, and textual studies",
    link: "/learning/courses",
    linkText: "Browse Lectures"
  },
  {
    icon: Users,
    title: "Scholar Network",
    description: "Connect with researchers, professors, and students from institutions worldwide",
    link: "/scholars",
    linkText: "View Directory"
  },
  {
    icon: FileText,
    title: "Indology Research",
    description: "Explore manuscript analysis tools, cross-reference databases, and collaboration opportunities",
    link: "/research/indology",
    linkText: "Explore Indology"
  }
];

const GyanKendra = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-hero lotus-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-primary/20 text-sm mb-6">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Digital Museum</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Muni Jambuvijayaji Research Center
            </h1>
            <p className="text-lg text-muted-foreground">
              A dedicated center preserving Gurudev Muni Jambuvijayaji Maharaj Saheb's scholarly works, 
              manuscripts, and teachings for future generations.
            </p>
          </div>
        </div>
      </section>

      {/* About the Kendra */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="animate-fade-up">
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                Preserving <span className="text-primary">Wisdom</span> for Generations
              </h2>
              <p className="text-muted-foreground mb-4">
                Muni Jambuvijayaji Research Center stands as a testament to Gurudev's extraordinary life of scholarship 
                and spiritual service. Located in Shantigram, this center houses an extensive collection 
                of manuscripts, books, photographs, and audio-visual materials.
              </p>
              <p className="text-muted-foreground mb-6">
                The Kendra serves as both a museum and a research facility, welcoming scholars, students, 
                and devotees who wish to explore and study Gurudev's contributions to Jain literature 
                and philosophy.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {highlights.map((item, index) => (
                  <div 
                    key={item.title}
                    className="p-4 rounded-xl bg-secondary/50 border border-border"
                  >
                    <div className="text-2xl font-display font-bold text-primary mb-1">
                      {item.count}
                    </div>
                    <div className="text-sm font-medium text-foreground">{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </div>
                ))}
              </div>

              <Button variant="hero" asChild>
                <Link to="/gallery">
                  Explore Gallery
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="relative animate-fade-up delay-200">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-elevated">
                <img 
                  src="https://siddhijambuparivar.com/wp-content/uploads/2022/11/111-min.jpg"
                  alt="Research Center"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 p-4 rounded-xl bg-card shadow-soft border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-foreground">Research Center</div>
                    <div className="text-xs text-muted-foreground">Shantigram, Gujarat</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16 lg:py-20 bg-gradient-spiritual">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              What You'll Find Here
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore the various sections and facilities available at Muni Jambuvijayaji Research Center
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {facilities.map((item, index) => (
              <Card 
                key={item.title}
                variant="feature"
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Indology & Research Section */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm mb-4">
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="text-primary font-medium">Scholarly Research</span>
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Indology & Comparative Studies
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore the rich traditions of Jain scholarship and their connections to broader Indian 
                philosophical heritage through our comprehensive research resources.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {indologyFeatures.map((item, index) => (
                <Card 
                  key={item.title}
                  variant="feature"
                  className="animate-fade-up group hover:border-primary/30 transition-colors"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-secondary/30 rounded-2xl p-8 border border-border">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">
                    Bridging Ancient Wisdom with Modern Research
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Our Indology division specializes in comparative studies, exploring connections between 
                    Jain literature and broader Indian philosophical traditions including Vedic, Buddhist, 
                    and Sanskrit scholarly works.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Cross-referencing with major Indological databases
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Collaborative research with international institutions
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Digital preservation using latest archival standards
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center">
                  <Button variant="hero" asChild>
                    <Link to="/research">
                      Explore Research Tools
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Discussion Forum & Lecture Repository */}
      <section className="py-16 lg:py-20 bg-gradient-spiritual">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm mb-4">
                <GraduationCap className="h-4 w-4 text-primary" />
                <span className="text-primary font-medium">Academic Community</span>
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Discussion Forum & Lecture Repository
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join a vibrant community of scholars and access an extensive library of academic 
                lectures, discussions, and research materials.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {forumFeatures.map((item, index) => (
                <Card 
                  key={item.title}
                  variant="feature"
                  className="animate-fade-up group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <item.icon className="h-7 w-7 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display font-semibold text-foreground mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {item.description}
                        </p>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={item.link}>
                            {item.linkText}
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-muted-foreground mb-4">
                Ready to contribute to the scholarly community?
              </p>
              <Button variant="hero" asChild>
                <Link to="/scholar/login">
                  Join as Scholar
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm mb-4">
                <Quote className="h-4 w-4 text-primary" />
                <span className="text-primary font-medium">Testimonials</span>
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                What Scholars Say
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Hear from researchers and academics who have benefited from our resources
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((item, index) => (
                <Card 
                  key={item.name}
                  variant="feature"
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <Quote className="h-8 w-8 text-primary/20 mb-4" />
                    <p className="text-muted-foreground text-sm mb-6 italic leading-relaxed">
                      "{item.quote}"
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-display font-semibold text-foreground text-sm">
                          {item.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {item.designation}
                        </div>
                        <div className="text-xs text-primary">
                          {item.institution}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visit Information */}
      <section className="py-16 lg:py-20 bg-gradient-spiritual">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Plan Your Visit
              </h2>
              <p className="text-muted-foreground">
                Experience the Research Center in person and explore Gurudev's legacy
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card variant="feature" className="animate-fade-up">
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                    Visiting Hours
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium text-foreground">Mon - Sat</div>
                        <div className="text-sm text-muted-foreground">
                          Office: 10:00 AM - 6:00 PM IST<br />
                          Visiting: 10:45 AM - 5:15 PM IST
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      * Closed on Sundays, major Jain festivals and special occasions
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="feature" className="animate-fade-up delay-100">
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium text-foreground">Location</div>
                        <div className="text-sm text-muted-foreground">
                          Shantigram, Gujarat, India
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <a 
                        href="mailto:contact@jambushrusti.org"
                        className="text-sm text-primary hover:underline"
                      >
                        contact@jambushrusti.org
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* External Link */}
      <section className="py-16 bg-gradient-hero lotus-pattern">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Visit Siddhi Jambu Parivar Website
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            For more information about events, updates, and resources from the Parivar
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" asChild>
              <a 
                href="https://siddhijambuparivar.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Official Website
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/about/gurudev">
                Read Gurudev's Biography
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GyanKendra;