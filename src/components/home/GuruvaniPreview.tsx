import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Mic, FileText, Calendar } from "lucide-react";

import guruvaniImg1 from "@/assets/books/guruvani-1.jpg";
import guruvaniImg2 from "@/assets/books/guruvani-2.jpg";
import guruvaniImg3 from "@/assets/books/guruvani-3.jpg";

const guruvaniItems = [
  {
    type: "Discourse",
    icon: Mic,
    title: "આત્માનો સ્વરૂપ",
    subtitle: "On the Nature of Soul",
    excerpt: "The soul is eternal, ever-conscious, and inherently pure.",
    category: "Sacred Teaching",
    date: "1985",
    image: guruvaniImg1,
  },
  {
    type: "Written Work",
    icon: FileText,
    title: "તત્ત્વાર્થ સૂત્ર ભાષ્ય",
    subtitle: "Commentary on Tattvartha Sutra",
    excerpt: "A comprehensive examination of reality as presented in Jain scripture.",
    category: "Scholarly Work",
    date: "1972",
    image: guruvaniImg2,
  },
  {
    type: "Letter",
    icon: BookOpen,
    title: "સાધકોને માર્ગદર્શન",
    subtitle: "Guidance for Seekers",
    excerpt: "The path of spiritual progress requires discipline and devotion.",
    category: "Personal Guidance",
    date: "1990",
    image: guruvaniImg3,
  },
];

export function GuruvaniPreview() {
  return (
    <section className="py-14 lg:py-18 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="text-[#4A6FA5] font-semibold mb-2 uppercase tracking-wider text-sm">Sacred Teachings</p>
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-[#2B3A4A] mb-3">
            Guruvani
          </h2>
          <p className="text-[#555555] max-w-xl mx-auto">
            Wisdom from Gurudev Muni Jambuvijayji Maharaj's teachings and writings.
          </p>
          <div className="w-16 h-1 bg-[#4A6FA5] mx-auto mt-4 rounded-full" />
        </div>

        {/* Compact Grid */}
        <div className="grid md:grid-cols-3 gap-5 mb-8 max-w-5xl mx-auto">
          {guruvaniItems.map((item, index) => (
            <Link
              key={index}
              to="/guruvani"
              className="group bg-white border border-[#DCE3E7] rounded-xl overflow-hidden hover:shadow-lg hover:border-[#4A6FA5] transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.subtitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#4A6FA5]/10 text-[#4A6FA5] text-xs font-medium">
                    {item.category}
                  </span>
                  <span className="text-xs text-[#555555]">{item.date}</span>
                </div>
                <h3 className="font-semibold text-[#2B3A4A] mb-1 group-hover:text-[#4A6FA5] transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-sm text-[#555555] line-clamp-2">
                  {item.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            variant="outline"
            asChild
            className="border-[#4A6FA5] text-[#4A6FA5] hover:bg-[#4A6FA5] hover:text-white"
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
