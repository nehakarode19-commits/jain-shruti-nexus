import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/shared/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { 
  Play, 
  Clock, 
  User, 
  Calendar,
  Search,
  Filter,
  BookOpen,
  Video,
  Award,
  Eye,
  Download,
  Share2,
  Heart,
  Bookmark,
  GraduationCap,
  Sparkles
} from "lucide-react";

const topics = [
  "All Topics",
  "Jain Philosophy",
  "Agam Studies",
  "Sanskrit & Prakrit",
  "Manuscript Studies",
  "Jain History",
  "Comparative Religion",
  "Meditation & Practice"
];

const speakers = [
  "All Speakers",
  "Dr. Kalpana Jain",
  "Prof. Samani Charitra Prajna",
  "Dr. Peter Flügel",
  "Prof. John Cort",
  "Dr. Paul Dundas",
  "Muni Shri Jambuvijayaji"
];

const lectures = [
  {
    id: 1,
    title: "Understanding Anekāntavāda: The Jain Theory of Multiple Perspectives",
    speaker: "Dr. Kalpana Jain",
    institution: "L.D. Institute of Indology",
    topic: "Jain Philosophy",
    duration: "58:23",
    date: "2024-11-15",
    views: 2450,
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
    featured: true,
    description: "A comprehensive exploration of Anekāntavāda and its significance in Jain epistemology."
  },
  {
    id: 2,
    title: "Paleographic Analysis of Early Jain Manuscripts",
    speaker: "Prof. Samani Charitra Prajna",
    institution: "Jain Vishva Bharati University",
    topic: "Manuscript Studies",
    duration: "1:12:45",
    date: "2024-10-28",
    views: 1890,
    thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
    featured: true,
    description: "Techniques for dating and analyzing ancient Jain palm-leaf manuscripts."
  },
  {
    id: 3,
    title: "The Āgamas: Structure and Classification of Jain Canon",
    speaker: "Dr. Peter Flügel",
    institution: "SOAS University of London",
    topic: "Agam Studies",
    duration: "45:12",
    date: "2024-10-10",
    views: 3200,
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    featured: false,
    description: "Overview of the canonical literature and its historical development."
  },
  {
    id: 4,
    title: "Prakrit Grammar: An Introduction for Jain Text Studies",
    speaker: "Prof. John Cort",
    institution: "Denison University",
    topic: "Sanskrit & Prakrit",
    duration: "52:30",
    date: "2024-09-22",
    views: 1560,
    thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400",
    featured: false,
    description: "Foundational grammar for reading original Jain texts in Prakrit."
  },
  {
    id: 5,
    title: "Jain Art and Iconography Through the Ages",
    speaker: "Dr. Paul Dundas",
    institution: "University of Edinburgh",
    topic: "Jain History",
    duration: "1:05:18",
    date: "2024-09-05",
    views: 2100,
    thumbnail: "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=400",
    featured: false,
    description: "Visual representations in Jain tradition from ancient to modern times."
  },
  {
    id: 6,
    title: "Comparative Study: Jainism and Buddhism on Karma",
    speaker: "Dr. Kalpana Jain",
    institution: "L.D. Institute of Indology",
    topic: "Comparative Religion",
    duration: "48:55",
    date: "2024-08-18",
    views: 1780,
    thumbnail: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
    featured: false,
    description: "Analyzing similarities and differences in karmic theories."
  },
  {
    id: 7,
    title: "Introduction to Preksha Meditation",
    speaker: "Prof. Samani Charitra Prajna",
    institution: "Jain Vishva Bharati University",
    topic: "Meditation & Practice",
    duration: "38:42",
    date: "2024-08-01",
    views: 4500,
    thumbnail: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=400",
    featured: true,
    description: "Traditional Jain meditation techniques for modern practitioners."
  },
  {
    id: 8,
    title: "The Life and Works of Muni Jambuvijayaji Maharaj",
    speaker: "Muni Shri Jambuvijayaji",
    institution: "MJRC Archives",
    topic: "Jain History",
    duration: "1:25:00",
    date: "2024-07-15",
    views: 5200,
    thumbnail: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
    featured: true,
    description: "Documentary lecture on the scholarly contributions of Gurudev."
  }
];

const playlists = [
  {
    id: 1,
    title: "Introduction to Jain Philosophy",
    lectures: 8,
    duration: "6h 45m",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400"
  },
  {
    id: 2,
    title: "Manuscript Reading Skills",
    lectures: 12,
    duration: "10h 20m",
    thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400"
  },
  {
    id: 3,
    title: "Agam Studies Complete Course",
    lectures: 24,
    duration: "18h 30m",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
  },
  {
    id: 4,
    title: "Prakrit Language Fundamentals",
    lectures: 16,
    duration: "12h 15m",
    thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400"
  }
];

export default function VideoLectures() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [selectedSpeaker, setSelectedSpeaker] = useState("All Speakers");

  const filteredLectures = lectures.filter(lecture => {
    const matchesSearch = lecture.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lecture.speaker.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = selectedTopic === "All Topics" || lecture.topic === selectedTopic;
    const matchesSpeaker = selectedSpeaker === "All Speakers" || lecture.speaker === selectedSpeaker;
    return matchesSearch && matchesTopic && matchesSpeaker;
  });

  const featuredLectures = lectures.filter(l => l.featured);

  return (
    <Layout>
      <SEO
        title="Video Lecture Gallery | Muni Jambuvijayaji Research Center"
        description="Watch recorded academic lectures on Jain philosophy, manuscript studies, Agam texts, and Indology from leading scholars worldwide."
      />

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-b from-secondary/50 to-background overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern-jain.svg')] opacity-5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Video className="w-3 h-3 mr-1" />
              Academic Video Repository
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Video Lecture <span className="text-primary">Gallery</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Access recorded lectures from leading scholars on Jain philosophy, Indology, 
              manuscript studies, and more. Learn at your own pace.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-primary" />
                <span>{lectures.length}+ Lectures</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                <span>{speakers.length - 1} Speakers</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                <span>{topics.length - 1} Topics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Lectures */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold" />
                Featured Lectures
              </h2>
              <p className="text-muted-foreground text-sm">Popular and recommended content</p>
            </div>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredLectures.map(lecture => (
              <Card key={lecture.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={lecture.thumbnail} 
                    alt={lecture.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="secondary" className="rounded-full">
                      <Play className="w-6 h-6" />
                    </Button>
                  </div>
                  <Badge className="absolute top-2 left-2 bg-gold text-gold-foreground">
                    <Award className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                  <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
                    <Clock className="w-3 h-3 mr-1" />
                    {lecture.duration}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                    {lecture.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">{lecture.speaker}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {lecture.views.toLocaleString()}
                    </span>
                    <Badge variant="secondary" className="text-[10px]">{lecture.topic}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content with Filters */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <TabsList>
                <TabsTrigger value="all">All Lectures</TabsTrigger>
                <TabsTrigger value="playlists">Playlists</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
              </TabsList>
              
              {/* Search & Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search lectures..." 
                    className="pl-10 w-full sm:w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {topics.map(topic => (
                      <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedSpeaker} onValueChange={setSelectedSpeaker}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Speaker" />
                  </SelectTrigger>
                  <SelectContent>
                    {speakers.map(speaker => (
                      <SelectItem key={speaker} value={speaker}>{speaker}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="all" className="space-y-6">
              {filteredLectures.length === 0 ? (
                <div className="text-center py-12">
                  <Video className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No lectures found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search query</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredLectures.map(lecture => (
                    <Card key={lecture.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="relative aspect-video overflow-hidden">
                        <img 
                          src={lecture.thumbnail} 
                          alt={lecture.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="icon" variant="secondary" className="rounded-full">
                            <Play className="w-6 h-6" />
                          </Button>
                        </div>
                        <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
                          <Clock className="w-3 h-3 mr-1" />
                          {lecture.duration}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <Badge variant="secondary" className="text-[10px] mb-2">{lecture.topic}</Badge>
                        <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                          {lecture.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{lecture.description}</p>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs font-medium">{lecture.speaker}</p>
                            <p className="text-[10px] text-muted-foreground">{lecture.institution}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {lecture.views.toLocaleString()} views
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(lecture.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Heart className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Bookmark className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <Button size="sm">
                            <Play className="w-4 h-4 mr-1" />
                            Watch
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="playlists" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {playlists.map(playlist => (
                  <Card key={playlist.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={playlist.thumbnail} 
                        alt={playlist.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <p className="text-xs opacity-80">{playlist.lectures} lectures • {playlist.duration}</p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                        {playlist.title}
                      </h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recent" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lectures.slice(0, 6).map(lecture => (
                  <Card key={lecture.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={lecture.thumbnail} 
                        alt={lecture.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" variant="secondary" className="rounded-full">
                          <Play className="w-6 h-6" />
                        </Button>
                      </div>
                      <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
                        <Clock className="w-3 h-3 mr-1" />
                        {lecture.duration}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                        {lecture.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">{lecture.speaker}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Want to Learn Systematically?
          </h2>
          <p className="text-lg mb-6 opacity-90 max-w-xl mx-auto">
            Enroll in our structured courses for a comprehensive learning experience with certificates.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/learning/courses">
              Browse Full Courses
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
