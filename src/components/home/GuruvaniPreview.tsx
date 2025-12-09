import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Mic, FileText, Calendar } from "lucide-react";

// Using project images for guruvani
import guruvaniImg1 from "@/assets/books/guruvani-1.jpg";
import guruvaniImg2 from "@/assets/books/guruvani-2.jpg";
import guruvaniImg3 from "@/assets/books/guruvani-3.jpg";

const guruvaniItems = [
  {
    type: "Discourse",
    icon: Mic,
    title: "आत्माનો સ્વરૂપ",
    subtitle: "On the Nature of Soul",
    excerpt: "The soul is eternal, ever-conscious, and inherently pure. Through right knowledge and conduct, one realizes the true self and attains liberation from the cycle of birth and death.",
    category: "Sacred Teaching",
    date: "1985",
    image: guruvaniImg1,
  },
  {
    type: "Written Work",
    icon: FileText,
    title: "તત્ત્વાર્થ સૂત્ર ભાષ્ય",
    subtitle: "Commentary on Tattvartha Sutra",
    excerpt: "A comprehensive examination of reality as presented in Jain scripture. This commentary illuminates the seven fundamental truths (tattvas) that form the basis of Jain philosophy and practice.",
    category: "Scholarly Work",
    date: "1972",
    image: guruvaniImg2,
  },
  {
    type: "Letter",
    icon: BookOpen,
    title: "સાધકોને માર્ગદર્શન",
    subtitle: "Guidance for Seekers",
    excerpt: "The path of spiritual progress requires discipline and devotion. A seeker must cultivate right faith, right knowledge, and right conduct while practicing non-violence and truthfulness.",
    category: "Personal Guidance",
    date: "1990",
    image: guruvaniImg3,
  },
];

export function GuruvaniPreview() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-[#4A6FA5] font-semibold mb-3 uppercase tracking-wider text-sm">Sacred Teachings</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#2B3A4A] mb-4">
            Guruvani
          </h2>
          <p className="text-[#555555] max-w-2xl mx-auto text-lg">
            Explore the profound discourses and spiritual guidance from Gurudev Muni Jambuvijayji.
          </p>
          <div className="w-20 h-1 bg-[#4A6FA5] mx-auto mt-5 rounded-full" />
        </div>

        {/* Preview Cards with Images */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {guruvaniItems.map((item) => (
            <Link 
              key={item.title}
              to="/guruvani"
              className="group rounded-2xl bg-white border border-[#DCE3E7] hover:border-[#4A6FA5] hover:shadow-xl transition-all overflow-hidden"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.subtitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-white/90 text-xs font-medium text-[#4A6FA5]">
                    {item.category}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#4A6FA5]/10 flex items-center justify-center">
                    <item.icon className="h-4 w-4 text-[#4A6FA5]" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#555555]">
                    <span>{item.type}</span>
                    <span>•</span>
                    <Calendar className="h-3 w-3" />
                    <span>{item.date}</span>
                  </div>
                </div>
                
                <h3 className="font-heading font-semibold text-[#2B3A4A] mb-1 text-lg group-hover:text-[#4A6FA5] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[#4A6FA5] mb-3">
                  {item.subtitle}
                </p>
                <p className="text-sm text-[#555555] line-clamp-3 leading-relaxed">
                  {item.excerpt}
                </p>
                
                <div className="mt-4 flex items-center gap-1 text-[#4A6FA5] text-sm font-medium group-hover:gap-2 transition-all">
                  <span>Read More</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg" 
            asChild
            className="bg-[#4A6FA5] hover:bg-[#3A5F95] text-white"
          >
            <Link to="/guruvani">
              Browse All Guruvani
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
