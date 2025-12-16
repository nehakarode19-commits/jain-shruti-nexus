import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ScholarLayout } from "@/components/scholar/ScholarLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  BookOpen, 
  Award, 
  Mail, 
  MessageSquare,
  Users,
  FileText,
  Calendar,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Globe
} from "lucide-react";
import { MessageDialog } from "@/components/scholar/MessageDialog";
import { EmailDialog } from "@/components/scholar/EmailDialog";

// Mock scholar data
const scholarsData: Record<string, any> = {
  "1": {
    id: "1",
    name: "Dr. Rajesh Sharma",
    avatar: "/src/assets/scholars/scholar-male-1.jpg",
    expertise: ["Jain Philosophy", "Sanskrit Studies", "Comparative Religion"],
    category: "Senior Scholar",
    affiliation: "Gujarat University",
    department: "Department of Indology",
    country: "India",
    city: "Ahmedabad",
    publications: 45,
    citations: 320,
    hIndex: 12,
    email: "r.sharma@gu.edu",
    website: "https://gu.edu/rsharm",
    bio: "Dr. Rajesh Sharma is a renowned scholar in Jain Philosophy with over 25 years of research experience. His work focuses on the intersection of Jain epistemology and modern philosophical discourse. He has contributed significantly to the preservation and interpretation of ancient Jain texts.",
    researchInterests: [
      "Jain Epistemology",
      "Anekantavada",
      "Sanskrit Paleography",
      "Ancient Manuscripts",
      "Comparative Philosophy"
    ],
    education: [
      { degree: "Ph.D. in Jain Philosophy", institution: "Gujarat University", year: 1998 },
      { degree: "M.A. in Sanskrit", institution: "Banaras Hindu University", year: 1993 },
      { degree: "B.A. in Philosophy", institution: "Delhi University", year: 1991 }
    ],
    experience: [
      { role: "Professor", institution: "Gujarat University", period: "2010 - Present" },
      { role: "Associate Professor", institution: "Gujarat University", period: "2005 - 2010" },
      { role: "Assistant Professor", institution: "Jain Vishva Bharati", period: "1999 - 2005" }
    ],
    publicationsList: [
      { id: "p1", title: "Anekantavada in Modern Context", year: 2023, type: "Journal Article", citations: 45 },
      { id: "p2", title: "Jain Theory of Knowledge", year: 2022, type: "Book", citations: 89 },
      { id: "p3", title: "Sanskrit Manuscripts: Preservation Methods", year: 2021, type: "Conference Paper", citations: 23 }
    ],
    collaborations: [
      { id: "c1", title: "Digital Preservation of Jain Manuscripts", role: "Lead Researcher", collaborators: 5 },
      { id: "c2", title: "Comparative Karma Studies", role: "Collaborator", collaborators: 3 }
    ]
  },
  "2": {
    id: "2",
    name: "Prof. Meera Patel",
    avatar: "/src/assets/scholars/scholar-female-1.jpg",
    expertise: ["Manuscript Studies", "Prakrit Literature"],
    category: "Active Scholar",
    affiliation: "SOAS London",
    department: "South Asian Studies",
    country: "UK",
    city: "London",
    publications: 32,
    citations: 210,
    hIndex: 9,
    email: "m.patel@soas.ac.uk",
    bio: "Prof. Meera Patel specializes in Prakrit literature and manuscript studies, with particular focus on medieval Jain texts.",
    researchInterests: ["Prakrit Grammar", "Medieval Manuscripts", "Jain Literature", "Text Digitization"],
    education: [
      { degree: "Ph.D. in South Asian Studies", institution: "SOAS London", year: 2005 }
    ],
    experience: [
      { role: "Professor", institution: "SOAS London", period: "2015 - Present" }
    ],
    publicationsList: [
      { id: "p1", title: "Prakrit Literary Traditions", year: 2023, type: "Book", citations: 67 }
    ],
    collaborations: [
      { id: "c1", title: "Digital Preservation of 15th Century Jain Manuscripts", role: "Lead", collaborators: 5 }
    ]
  }
};

export default function ScholarProfile() {
  const { id } = useParams();
  const scholar = scholarsData[id || "1"] || scholarsData["1"];
  
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Senior Scholar": return "bg-amber-500/10 text-amber-600 border-amber-500/30";
      case "Active Scholar": return "bg-blue-500/10 text-blue-500 border-blue-500/30";
      case "New Scholar": return "bg-green-500/10 text-green-500 border-green-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <ScholarLayout title="Scholar Profile">
      <div className="space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="h-32 w-32 border-4 border-border">
                <AvatarImage src={scholar.avatar} alt={scholar.name} />
                <AvatarFallback className="bg-primary/10 text-primary text-3xl font-semibold">
                  {scholar.name.split(" ").map((n: string) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <h1 className="font-heading text-2xl font-bold text-foreground">{scholar.name}</h1>
                    <p className="text-muted-foreground mt-1">{scholar.affiliation}</p>
                    {scholar.department && (
                      <p className="text-sm text-muted-foreground">{scholar.department}</p>
                    )}
                    <Badge variant="outline" className={`mt-2 ${getCategoryColor(scholar.category)}`}>
                      {scholar.category}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setMessageDialogOpen(true)}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setEmailDialogOpen(true)}>
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                    <Button size="sm" asChild>
                      <Link to="/scholar/collaborate">
                        <Users className="h-4 w-4 mr-2" />
                        Collaborate
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 mt-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {scholar.city}, {scholar.country}
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="font-semibold">{scholar.publications}</span> Publications
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="font-semibold">{scholar.citations}</span> Citations
                  </div>
                  {scholar.hIndex && (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">h-index: {scholar.hIndex}</span>
                    </div>
                  )}
                </div>

                {/* Contact Links */}
                <div className="flex flex-wrap gap-4 mt-4">
                  {scholar.email && (
                    <a href={`mailto:${scholar.email}`} className="text-sm text-primary hover:underline flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {scholar.email}
                    </a>
                  )}
                  {scholar.website && (
                    <a href={scholar.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="about">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="publications">Publications</TabsTrigger>
            <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
            <TabsTrigger value="background">Background</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            {scholar.bio && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Biography</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{scholar.bio}</p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Research Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {scholar.researchInterests?.map((interest: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Areas of Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {scholar.expertise.map((exp: string, index: number) => (
                    <Badge key={index} variant="outline" className="bg-primary/5">
                      {exp}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Publications Tab */}
          <TabsContent value="publications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Recent Publications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scholar.publicationsList?.map((pub: any) => (
                    <div key={pub.id} className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div>
                          <Link 
                            to={`/scholar/publications/${pub.id}`}
                            className="font-semibold text-foreground hover:text-primary transition-colors"
                          >
                            {pub.title}
                          </Link>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span>{pub.year}</span>
                            <Badge variant="outline">{pub.type}</Badge>
                            <span className="flex items-center gap-1">
                              <Award className="h-3 w-3" />
                              {pub.citations} citations
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/scholar/publications/${pub.id}`}>
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to={`/scholar/publications?author=${scholar.id}`}>
                    View All Publications
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Collaborations Tab */}
          <TabsContent value="collaborations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Active Collaborations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scholar.collaborations?.map((collab: any) => (
                    <div key={collab.id} className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div>
                          <Link 
                            to="/scholar/collaborate"
                            className="font-semibold text-foreground hover:text-primary transition-colors"
                          >
                            {collab.title}
                          </Link>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <Badge variant="secondary">{collab.role}</Badge>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {collab.collaborators} collaborators
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to="/scholar/collaborate">
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to="/scholar/collaborate">
                    View All Collaborations
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Background Tab */}
          <TabsContent value="background" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scholar.education?.map((edu: any, index: number) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <div>
                        <p className="font-semibold">{edu.degree}</p>
                        <p className="text-sm text-muted-foreground">{edu.institution}</p>
                        <p className="text-xs text-muted-foreground">{edu.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Professional Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scholar.experience?.map((exp: any, index: number) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <div>
                        <p className="font-semibold">{exp.role}</p>
                        <p className="text-sm text-muted-foreground">{exp.institution}</p>
                        <p className="text-xs text-muted-foreground">{exp.period}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogs */}
      <MessageDialog 
        open={messageDialogOpen} 
        onOpenChange={setMessageDialogOpen}
        scholar={scholar}
      />
      <EmailDialog 
        open={emailDialogOpen} 
        onOpenChange={setEmailDialogOpen}
        scholar={scholar}
      />
    </ScholarLayout>
  );
}
