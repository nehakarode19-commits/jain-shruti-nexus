import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Newspaper, 
  Calendar,
  MapPin,
  ExternalLink,
  Bell
} from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "श्रीजम्बूविजयजी म.सा. की वार्षिक पुण्यतिथि समारोह",
    titleEn: "Annual Remembrance Ceremony of Shri Jambuvijayji Maharaj Saheb",
    date: "November 20, 2024",
    location: "Shantigram, Gujarat",
    description: "The annual memorial ceremony honoring Gurudev was observed with spiritual discourses, prayers, and community gatherings.",
    image: "https://siddhijambuparivar.com/wp-content/uploads/2022/11/WhatsApp-Image-2020-10-21-at-11.31.35-PM-261x152.jpeg",
    type: "Event"
  },
  {
    id: 2,
    title: "ભવ્ય ઉપધાન તપ આયોજન",
    titleEn: "Grand Updhan Tap Ceremony Organized",
    date: "December 18, 2024 - February 5, 2025",
    location: "Multiple Locations",
    description: "A significant spiritual austerity program following traditional Jain practices, organized by the Parivar.",
    image: "https://siddhijambuparivar.com/wp-content/uploads/2021/05/MicrosoftTeams-image-22-270x152.jpg",
    type: "Spiritual Program"
  },
  {
    id: 3,
    title: "New Manuscript Collection Added to Digital Archive",
    titleEn: "New Manuscript Collection Added to Digital Archive",
    date: "October 15, 2024",
    location: "Muni Jambuvijayaji Research Center",
    description: "50 new rare manuscripts have been digitized and added to our searchable online collection.",
    image: "https://siddhijambuparivar.com/wp-content/uploads/2022/11/99-min.jpg",
    type: "Update"
  },
  {
    id: 4,
    title: "Janm Shatabdi Mahotsav Documentary Released",
    titleEn: "Centenary Celebration Documentary Released",
    date: "September 28, 2024",
    location: "Online",
    description: "A comprehensive documentary covering Gurudev's centenary celebrations is now available for viewing.",
    image: "https://siddhijambuparivar.com/wp-content/uploads/2022/11/107-min.jpg",
    type: "Media"
  },
  {
    id: 5,
    title: "Research Collaboration with Universities Announced",
    titleEn: "Research Collaboration with Universities Announced",
    date: "August 10, 2024",
    location: "Academic",
    description: "Partnerships established with leading universities for Jain manuscript research and preservation.",
    image: "https://siddhijambuparivar.com/wp-content/uploads/2022/11/111-min.jpg",
    type: "Announcement"
  },
];

const News = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: '#FAF7F2' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <p 
              className="font-semibold mb-3 uppercase tracking-wider text-sm"
              style={{ color: '#D2811D', fontFamily: 'Inter, sans-serif' }}
            >
              Our News
            </p>
            <h1 
              className="text-4xl sm:text-5xl font-bold mb-6"
              style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}
            >
              News <span style={{ fontStyle: 'italic' }}>&</span> Announcements
            </h1>
            <p className="text-lg" style={{ color: '#6B6764' }}>
              Stay informed about events, updates, and announcements from Jambushrusti 
              and the Siddhi Jambu Parivar community.
            </p>
          </div>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          {newsItems.length > 0 && (
            <Card 
              variant="feature" 
              className="overflow-hidden mb-12 animate-fade-up"
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                  <img 
                    src={newsItems[0].image}
                    alt={newsItems[0].titleEn}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {newsItems[0].type}
                    </span>
                    <span className="text-sm text-muted-foreground">Featured</span>
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                    {newsItems[0].title}
                  </h2>
                  <p className="text-muted-foreground mb-2">
                    {newsItems[0].titleEn}
                  </p>
                  <p className="text-muted-foreground mb-4">
                    {newsItems[0].description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{newsItems[0].date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{newsItems[0].location}</span>
                    </div>
                  </div>
                  <Button variant="hero" className="w-fit">
                    Read More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </div>
            </Card>
          )}

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.slice(1).map((news, index) => (
              <Card 
                key={news.id}
                variant="interactive"
                className="overflow-hidden group animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img 
                    src={news.image}
                    alt={news.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 rounded-full bg-secondary text-muted-foreground text-xs">
                      {news.type}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {news.titleEn}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {news.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{news.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{news.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* External Events Link */}
      <section className="py-12 bg-gradient-spiritual">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            View All Events
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Visit the official Siddhi Jambu Parivar website for complete event listings
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" asChild>
              <a 
                href="https://siddhijambuparivar.com/events-list/"
                target="_blank"
                rel="noopener noreferrer"
              >
                View All Events
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/community/events">
                Community Events
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <Card variant="feature" className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Bell className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                Get Notified
              </h3>
              <p className="text-muted-foreground mb-6">
                Subscribe to receive updates about events, new articles, and community announcements
              </p>
              <Button variant="hero">
                Subscribe to Updates
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default News;