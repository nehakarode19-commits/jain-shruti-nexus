import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Library, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "10,000+", label: "Research Entries" },
  { value: "5,000+", label: "Manuscripts Indexed" },
  { value: "1,200+", label: "Scholars Connected" },
  { value: "50+", label: "Countries Reached" },
];

const services = [
  {
    icon: GraduationCap,
    title: "For Scholars",
    description: "Join our scholarly community and contribute to research",
    link: "/scholars",
    primary: true,
  },
  {
    icon: Library,
    title: "Library Access",
    description: "Browse our extensive catalog of Jain literature",
    link: "/library",
    primary: false,
  },
  {
    icon: Search,
    title: "AI Search",
    description: "Search inside texts with smart transliteration",
    link: "/research/shabdasangraha",
    primary: false,
  },
  {
    icon: Users,
    title: "Join Community",
    description: "Attend events and connect with like-minded seekers",
    link: "/community/events",
    primary: false,
  },
];

export function StatsAndServicesSection() {
  return (
    <section className="py-16 lg:py-20" style={{ background: 'linear-gradient(to bottom, #FAF7F2, #F5EFE6)' }}>
      <div className="container mx-auto px-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div 
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2" 
                style={{ fontFamily: 'Playfair Display, serif', color: '#C9A227' }}
              >
                {stat.value}
              </div>
              <div 
                className="text-sm md:text-base"
                style={{ fontFamily: 'Inter, sans-serif', color: '#8B8680' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Services Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <div
              key={index}
              className="rounded-xl p-6 transition-all duration-300 hover:shadow-lg bg-white border border-[#E8E4DD]"
            >
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                style={{ backgroundColor: '#FDF5E6' }}
              >
                <service.icon className="w-6 h-6" style={{ color: '#C9A227' }} />
              </div>
              <h3 
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: 'Inter, sans-serif', color: '#2D2A26' }}
              >
                {service.title}
              </h3>
              <p 
                className="text-sm mb-5 leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif', color: '#8B8680' }}
              >
                {service.description}
              </p>
              <Button
                asChild
                variant={service.primary ? "default" : "outline"}
                className={`w-full rounded-lg ${
                  service.primary 
                    ? 'text-white hover:opacity-90' 
                    : 'border-[#E8E4DD] hover:bg-[#F5EFE6]'
                }`}
                style={service.primary 
                  ? { backgroundColor: '#C9A227', fontFamily: 'Inter, sans-serif' }
                  : { fontFamily: 'Inter, sans-serif', color: '#2D2A26' }
                }
              >
                <Link to={service.link} className="flex items-center justify-center gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
