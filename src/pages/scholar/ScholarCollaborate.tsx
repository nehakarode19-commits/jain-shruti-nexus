import { useState } from "react";
import { Link } from "react-router-dom";
import { ScholarLayout } from "@/components/scholar/ScholarLayout";
import { Card, CardContent } from "@/components/ui/card";
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
  Search, Users, FileText, Plus, MessageSquare, Calendar, CheckCircle, Clock, 
  BookOpen, Handshake, UserPlus, Upload, File, Download
} from "lucide-react";
import { toast } from "sonner";
import { FileShareDialog } from "@/components/scholar/FileShareDialog";

const collaborationProjects = [
  {
    id: "1",
    title: "Comparative Analysis of Jain and Buddhist Karma Theories",
    description: "A joint research project exploring the philosophical nuances between Jain and Buddhist concepts of Karma.",
    author: { id: "1", name: "Dr. Rajesh Sharma", avatar: "/src/assets/scholars/scholar-male-1.jpg", affiliation: "Gujarat University" },
    collaborators: 3, status: "active", publications: 2, createdAt: "2024-01-15",
    tags: ["Jain Philosophy", "Buddhism", "Karma"],
    files: [
      { id: "f1", name: "Research Proposal.pdf", size: "2.4 MB" },
      { id: "f2", name: "Literature Review.docx", size: "1.8 MB" },
    ]
  },
  {
    id: "2",
    title: "Digital Preservation of 15th Century Jain Manuscripts",
    description: "Collaborative effort to digitize and preserve rare Jain manuscripts with modern annotation tools.",
    author: { id: "2", name: "Prof. Meera Patel", avatar: "/src/assets/scholars/scholar-female-1.jpg", affiliation: "SOAS London" },
    collaborators: 5, status: "active", publications: 4, createdAt: "2023-11-20",
    tags: ["Manuscripts", "Digitization", "Preservation"],
    files: [
      { id: "f3", name: "Digitization Guidelines.pdf", size: "3.2 MB" },
    ]
  },
];

const collaborationRequests = [
  {
    id: "1",
    from: { name: "Dr. Sunita Devi", avatar: "/src/assets/scholars/scholar-female-2.jpg", affiliation: "Banaras Hindu University" },
    project: "Jain Iconography in Temple Architecture",
    message: "I would like to collaborate on documenting Jain iconographic elements in medieval temples.",
    status: "pending", date: "2024-03-10"
  },
];

export default function ScholarCollaborate() {
  const [searchQuery, setSearchQuery] = useState("");
  const [newProjectOpen, setNewProjectOpen] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [fileShareOpen, setFileShareOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof collaborationProjects[0] | null>(null);

  const filteredProjects = collaborationProjects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateProject = () => {
    if (!projectTitle.trim()) { toast.error("Please enter a project title"); return; }
    toast.success("Collaboration project created successfully!");
    setProjectTitle(""); setProjectDescription(""); setNewProjectOpen(false);
  };

  const handleJoinProject = (title: string) => toast.success(`Request sent to join "${title}"`);
  const handleAcceptRequest = () => toast.success("Collaboration request accepted!");
  const handleDeclineRequest = () => toast.info("Collaboration request declined");
  const handleShareFile = (project: typeof collaborationProjects[0]) => { setSelectedProject(project); setFileShareOpen(true); };

  return (
    <ScholarLayout title="Collaborate">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div>
            <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
              <Handshake className="h-6 w-6 text-primary" />
              Scholar Collaboration
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Connect with scholars and work together on research projects</p>
          </div>
          <Dialog open={newProjectOpen} onOpenChange={setNewProjectOpen}>
            <DialogTrigger asChild>
              <Button variant="hero"><Plus className="h-4 w-4 mr-2" />New Project</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Collaboration Project</DialogTitle>
                <DialogDescription>Start a new collaboration project and invite scholars to join.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Project Title</Label>
                  <Input placeholder="Enter project title..." value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Describe your project..." value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setNewProjectOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateProject}>Create Project</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="projects">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="my-projects">My Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <Card><CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search projects..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
              </div>
            </CardContent></Card>

            <div className="grid gap-4">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <Badge variant={project.status === "active" ? "default" : "secondary"} className="mb-2">
                          {project.status === "active" ? <><CheckCircle className="h-3 w-3 mr-1" />Active</> : <><UserPlus className="h-3 w-3 mr-1" />Seeking</>}
                        </Badge>
                        <h3 className="font-heading text-lg font-semibold mb-2">{project.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag) => (<Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>))}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><Users className="h-4 w-4" />{project.collaborators}</span>
                          <span className="flex items-center gap-1"><FileText className="h-4 w-4" />{project.publications}</span>
                          <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{new Date(project.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-start md:items-end gap-4 min-w-[200px]">
                        <Link to={`/scholar/profile/${project.author.id}`} className="flex items-center gap-3 hover:opacity-80">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={project.author.avatar} />
                            <AvatarFallback>{project.author.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                          </Avatar>
                          <div className="text-right">
                            <p className="text-sm font-medium">{project.author.name}</p>
                            <p className="text-xs text-muted-foreground">{project.author.affiliation}</p>
                          </div>
                        </Link>
                        <div className="flex gap-2 flex-wrap">
                          <Button variant="outline" size="sm" onClick={() => handleShareFile(project)}><Upload className="h-4 w-4 mr-1" />Share</Button>
                          <Button size="sm" onClick={() => handleJoinProject(project.title)}><UserPlus className="h-4 w-4 mr-1" />Join</Button>
                        </div>
                        {project.files.length > 0 && (
                          <div className="w-full mt-2 pt-2 border-t">
                            <p className="text-xs text-muted-foreground mb-2">Files ({project.files.length})</p>
                            {project.files.slice(0,2).map((file) => (
                              <div key={file.id} className="flex items-center justify-between text-xs p-2 bg-muted/50 rounded mb-1">
                                <span className="flex items-center gap-1"><File className="h-3 w-3" />{file.name}</span>
                                <Download className="h-3 w-3 cursor-pointer" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            {collaborationRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={request.from.avatar} />
                      <AvatarFallback>{request.from.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold">{request.from.name}</h4>
                      <p className="text-sm text-muted-foreground">{request.from.affiliation}</p>
                      <p className="font-medium mt-2">{request.project}</p>
                      <p className="text-sm text-muted-foreground mt-1">{request.message}</p>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" onClick={handleAcceptRequest}><CheckCircle className="h-4 w-4 mr-2" />Accept</Button>
                        <Button variant="outline" size="sm" onClick={handleDeclineRequest}>Decline</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="my-projects">
            <Card><CardContent className="py-16 text-center">
              <BookOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-heading text-xl font-semibold mb-2">No projects yet</h3>
              <p className="text-muted-foreground mb-6">Create your first collaboration project</p>
              <Button variant="hero" onClick={() => setNewProjectOpen(true)}><Plus className="h-4 w-4 mr-2" />Create New Project</Button>
            </CardContent></Card>
          </TabsContent>
        </Tabs>
      </div>

      <FileShareDialog open={fileShareOpen} onOpenChange={setFileShareOpen} projectTitle={selectedProject?.title || ""} />
    </ScholarLayout>
  );
}
