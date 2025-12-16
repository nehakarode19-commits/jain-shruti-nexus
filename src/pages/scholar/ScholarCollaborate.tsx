import { useState } from "react";
import { Link } from "react-router-dom";
import { ScholarLayout } from "@/components/scholar/ScholarLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Search, 
  Users, 
  FileText, 
  Plus,
  MessageSquare,
  Calendar,
  CheckCircle,
  Clock,
  Send,
  BookOpen,
  Handshake,
  UserPlus
} from "lucide-react";
import { toast } from "sonner";

// Mock collaboration projects
const collaborationProjects = [
  {
    id: "1",
    title: "Comparative Analysis of Jain and Buddhist Karma Theories",
    description: "A joint research project exploring the philosophical nuances between Jain and Buddhist concepts of Karma.",
    author: {
      id: "1",
      name: "Dr. Rajesh Sharma",
      avatar: "/src/assets/scholars/scholar-male-1.jpg",
      affiliation: "Gujarat University"
    },
    collaborators: 3,
    status: "active",
    publications: 2,
    createdAt: "2024-01-15",
    tags: ["Jain Philosophy", "Buddhism", "Karma"]
  },
  {
    id: "2",
    title: "Digital Preservation of 15th Century Jain Manuscripts",
    description: "Collaborative effort to digitize and preserve rare Jain manuscripts with modern annotation tools.",
    author: {
      id: "2",
      name: "Prof. Meera Patel",
      avatar: "/src/assets/scholars/scholar-female-1.jpg",
      affiliation: "SOAS London"
    },
    collaborators: 5,
    status: "active",
    publications: 4,
    createdAt: "2023-11-20",
    tags: ["Manuscripts", "Digitization", "Preservation"]
  },
  {
    id: "3",
    title: "Anekantavada in Contemporary Environmental Ethics",
    description: "Exploring the relevance of Jain philosophy of non-absolutism in modern environmental discourse.",
    author: {
      id: "3",
      name: "Dr. Amit Jain",
      avatar: "/src/assets/scholars/scholar-male-2.jpg",
      affiliation: "JNU Delhi"
    },
    collaborators: 2,
    status: "seeking",
    publications: 1,
    createdAt: "2024-03-01",
    tags: ["Anekantavada", "Environment", "Ethics"]
  },
];

// Mock collaboration requests
const collaborationRequests = [
  {
    id: "1",
    from: {
      name: "Dr. Sunita Devi",
      avatar: "/src/assets/scholars/scholar-female-2.jpg",
      affiliation: "Banaras Hindu University"
    },
    project: "Jain Iconography in Temple Architecture",
    message: "I would like to collaborate on documenting Jain iconographic elements in medieval temples.",
    status: "pending",
    date: "2024-03-10"
  },
  {
    id: "2",
    from: {
      name: "Prof. Vikram Singh",
      avatar: "/src/assets/scholars/scholar-male-3.jpg",
      affiliation: "Mumbai University"
    },
    project: "Agama Studies Translation Project",
    message: "Looking for collaborators to help translate Agama texts into modern languages.",
    status: "pending",
    date: "2024-03-08"
  }
];

export default function ScholarCollaborate() {
  const [searchQuery, setSearchQuery] = useState("");
  const [newProjectOpen, setNewProjectOpen] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const filteredProjects = collaborationProjects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreateProject = () => {
    if (!projectTitle.trim()) {
      toast.error("Please enter a project title");
      return;
    }
    
    toast.success("Collaboration project created successfully!");
    setProjectTitle("");
    setProjectDescription("");
    setNewProjectOpen(false);
  };

  const handleJoinProject = (projectTitle: string) => {
    toast.success(`Request sent to join "${projectTitle}"`);
  };

  const handleAcceptRequest = (requestId: string) => {
    toast.success("Collaboration request accepted!");
  };

  const handleDeclineRequest = (requestId: string) => {
    toast.info("Collaboration request declined");
  };

  return (
    <ScholarLayout title="Collaborate">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div>
            <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
              <Handshake className="h-6 w-6 text-primary" />
              Scholar Collaboration
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Connect with scholars and work together on research projects
            </p>
          </div>
          <Dialog open={newProjectOpen} onOpenChange={setNewProjectOpen}>
            <DialogTrigger asChild>
              <Button variant="hero">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Collaboration Project</DialogTitle>
                <DialogDescription>
                  Start a new collaboration project and invite scholars to join.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="project-title">Project Title</Label>
                  <Input
                    id="project-title"
                    placeholder="Enter project title..."
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-desc">Description</Label>
                  <Textarea
                    id="project-desc"
                    placeholder="Describe your collaboration project..."
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setNewProjectOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateProject}>
                  Create Project
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="projects">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="my-projects">My Projects</TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            {/* Search */}
            <Card variant="feature">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search collaboration projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Project Cards */}
            <div className="grid gap-4">
              {filteredProjects.map((project) => (
                <Card key={project.id} variant="feature" className="hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={project.status === "active" ? "default" : "secondary"}>
                            {project.status === "active" ? (
                              <>
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Active
                              </>
                            ) : (
                              <>
                                <UserPlus className="h-3 w-3 mr-1" />
                                Seeking Collaborators
                              </>
                            )}
                          </Badge>
                        </div>
                        <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {project.description}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {project.collaborators} collaborators
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="h-4 w-4" />
                            {project.publications} publications
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Started {new Date(project.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Author & Actions */}
                      <div className="flex flex-col items-start md:items-end gap-4 min-w-[200px]">
                        <Link to={`/scholar/directory`} className="flex items-center gap-3 hover:opacity-80">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={project.author.avatar} alt={project.author.name} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {project.author.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-right">
                            <p className="text-sm font-medium">{project.author.name}</p>
                            <p className="text-xs text-muted-foreground">{project.author.affiliation}</p>
                          </div>
                        </Link>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to="/scholar/chat">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Message
                            </Link>
                          </Button>
                          <Button size="sm" onClick={() => handleJoinProject(project.title)}>
                            <UserPlus className="h-4 w-4 mr-2" />
                            Join
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-4">
            {collaborationRequests.length > 0 ? (
              collaborationRequests.map((request) => (
                <Card key={request.id} variant="feature">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={request.from.avatar} alt={request.from.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {request.from.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{request.from.name}</h4>
                            <p className="text-sm text-muted-foreground">{request.from.affiliation}</p>
                          </div>
                          <Badge variant="outline">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(request.date).toLocaleDateString()}
                          </Badge>
                        </div>
                        <p className="font-medium mt-2">{request.project}</p>
                        <p className="text-sm text-muted-foreground mt-1">{request.message}</p>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" onClick={() => handleAcceptRequest(request.id)}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Accept
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeclineRequest(request.id)}>
                            Decline
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link to="/scholar/chat">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Message
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card variant="feature">
                <CardContent className="py-16 text-center">
                  <Users className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="font-heading text-xl font-semibold mb-2">No pending requests</h3>
                  <p className="text-muted-foreground">
                    Collaboration requests will appear here
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* My Projects Tab */}
          <TabsContent value="my-projects" className="space-y-4">
            <Card variant="feature">
              <CardContent className="py-16 text-center">
                <BookOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="font-heading text-xl font-semibold mb-2">No projects yet</h3>
                <p className="text-muted-foreground mb-6">
                  Create your first collaboration project to get started
                </p>
                <Button variant="hero" onClick={() => setNewProjectOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Project
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ScholarLayout>
  );
}
