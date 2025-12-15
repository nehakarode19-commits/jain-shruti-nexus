import { useState } from "react";
import { ScholarLayout } from "@/components/scholar/ScholarLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Image, 
  Link2, 
  FileText, 
  Heart, 
  MessageSquare, 
  Share2, 
  Bookmark,
  MoreHorizontal,
  TrendingUp,
  Clock,
  Star
} from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

// Mock feed data
const feedPosts = [
  {
    id: "1",
    author: {
      name: "Dr. Rajesh Sharma",
      avatar: "/src/assets/scholars/scholar-male-1.jpg",
      affiliation: "Gujarat University",
      badge: "Senior Scholar",
    },
    content: "Just published a new paper on the comparative analysis of Jain and Buddhist concepts of Karma. The nuanced differences in understanding causality between these traditions offer fascinating insights into Indian philosophical thought. Link to the full paper in comments.",
    tags: ["JainPhilosophy", "Buddhism", "Karma", "Research"],
    timestamp: "2 hours ago",
    likes: 45,
    comments: 12,
    shares: 8,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: "2",
    author: {
      name: "Prof. Meera Patel",
      avatar: "/src/assets/scholars/scholar-female-1.jpg",
      affiliation: "SOAS London",
      badge: "Active Scholar",
    },
    content: "Excited to announce that our team has successfully digitized 500+ rare Jain manuscripts from the 15th century. These will be available on the Jambushrusti digital library next month. A milestone in preservation efforts! 📚✨",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600",
    tags: ["Manuscripts", "Digitization", "Preservation"],
    timestamp: "5 hours ago",
    likes: 128,
    comments: 34,
    shares: 45,
    isLiked: true,
    isBookmarked: true,
  },
  {
    id: "3",
    author: {
      name: "Dr. Amit Jain",
      avatar: "/src/assets/scholars/scholar-male-2.jpg",
      affiliation: "JNU Delhi",
      badge: "Senior Scholar",
    },
    content: "Looking for collaborators on a research project exploring the ethical dimensions of Jain Anekantavada in contemporary environmental discourse. If interested, please reach out via DM or email. #ResearchCollaboration",
    tags: ["Anekantavada", "Environment", "Collaboration"],
    timestamp: "Yesterday",
    likes: 67,
    comments: 23,
    shares: 15,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: "4",
    author: {
      name: "Jambushrusti Admin",
      avatar: null,
      affiliation: "Official",
      badge: "Announcement",
    },
    content: "📢 Reminder: The Annual Jain Scholars Conference 2026 registration is now open! Early bird discounts available until January 15th. Topics include manuscript studies, digital humanities, and contemporary Jain philosophy. Register now!",
    tags: ["Conference", "Event", "Registration"],
    timestamp: "2 days ago",
    likes: 234,
    comments: 56,
    shares: 89,
    isLiked: true,
    isBookmarked: false,
  },
];

export default function ScholarFeed() {
  const [newPost, setNewPost] = useState("");
  const { user } = useAdminAuth();

  const handlePost = () => {
    if (newPost.trim()) {
      console.log("Posting:", newPost);
      setNewPost("");
    }
  };

  return (
    <ScholarLayout title="Community Feed">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Create Post */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {user?.name?.charAt(0) || "S"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Share an update, research finding, or question..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="min-h-[80px] resize-none border-0 p-0 focus-visible:ring-0"
                />
                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Image className="h-4 w-4 mr-2" />
                      Image
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Link2 className="h-4 w-4 mr-2" />
                      Link
                    </Button>
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Paper
                    </Button>
                  </div>
                  <Button onClick={handlePost} disabled={!newPost.trim()}>
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feed Tabs */}
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Latest
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Favorites
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4 space-y-4">
            {feedPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        {post.author.avatar ? (
                          <AvatarImage src={post.author.avatar} />
                        ) : null}
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {post.author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{post.author.name}</h4>
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${
                              post.author.badge === "Announcement" 
                                ? "bg-gold/10 text-gold" 
                                : ""
                            }`}
                          >
                            {post.author.badge}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {post.author.affiliation} · {post.timestamp}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-foreground whitespace-pre-wrap mb-3">{post.content}</p>
                  
                  {post.image && (
                    <div className="rounded-xl overflow-hidden mb-3">
                      <img 
                        src={post.image} 
                        alt="Post image" 
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs cursor-pointer hover:bg-primary/10">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className={post.isLiked ? "text-red-500" : ""}
                      >
                        <Heart className={`h-4 w-4 mr-1 ${post.isLiked ? "fill-current" : ""}`} />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {post.comments}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4 mr-1" />
                        {post.shares}
                      </Button>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className={post.isBookmarked ? "text-gold" : ""}
                    >
                      <Bookmark className={`h-5 w-5 ${post.isBookmarked ? "fill-current" : ""}`} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="trending" className="mt-4">
            <div className="text-center py-8 text-muted-foreground">
              Trending posts coming soon...
            </div>
          </TabsContent>

          <TabsContent value="following" className="mt-4">
            <div className="text-center py-8 text-muted-foreground">
              Follow scholars to see their posts here
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="mt-4 space-y-4">
            {feedPosts.filter(post => post.isBookmarked).length > 0 ? (
              feedPosts.filter(post => post.isBookmarked).map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <CardHeader className="p-4 pb-0">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          {post.author.avatar ? (
                            <AvatarImage src={post.author.avatar} />
                          ) : null}
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {post.author.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{post.author.name}</h4>
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${
                                post.author.badge === "Announcement" 
                                  ? "bg-gold/10 text-gold" 
                                  : ""
                              }`}
                            >
                              {post.author.badge}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {post.author.affiliation} · {post.timestamp}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-foreground whitespace-pre-wrap mb-3">{post.content}</p>
                    
                    {post.image && (
                      <div className="rounded-xl overflow-hidden mb-3">
                        <img 
                          src={post.image} 
                          alt="Post image" 
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs cursor-pointer hover:bg-primary/10">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className={post.isLiked ? "text-red-500" : ""}
                        >
                          <Heart className={`h-4 w-4 mr-1 ${post.isLiked ? "fill-current" : ""}`} />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4 mr-1" />
                          {post.shares}
                        </Button>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-gold"
                      >
                        <Bookmark className="h-5 w-5 fill-current" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Star className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>No favorite posts yet</p>
                <p className="text-sm">Bookmark posts to see them here</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </ScholarLayout>
  );
}
