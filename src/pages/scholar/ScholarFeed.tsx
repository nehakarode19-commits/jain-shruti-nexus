import { useState } from "react";
import { Link } from "react-router-dom";
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
  Star,
  Send,
  X
} from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { toast } from "sonner";

interface FeedPost {
  id: string;
  author: {
    name: string;
    avatar: string | null;
    affiliation: string;
    badge: string;
  };
  content: string;
  image?: string;
  tags: string[];
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isBookmarked: boolean;
  commentsList?: { author: string; content: string; time: string }[];
}

// Initial feed data
const initialFeedPosts: FeedPost[] = [
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
    commentsList: [
      { author: "Prof. Meera Patel", content: "Excellent analysis! The section on causality was particularly insightful.", time: "1h ago" }
    ]
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
    commentsList: []
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
    commentsList: []
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
    commentsList: []
  },
];

export default function ScholarFeed() {
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState<FeedPost[]>(initialFeedPosts);
  const [expandedComments, setExpandedComments] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const { user } = useAdminAuth();

  const handlePost = () => {
    if (newPost.trim()) {
      const newFeedPost: FeedPost = {
        id: Date.now().toString(),
        author: {
          name: user?.name || "Demo Scholar",
          avatar: user?.avatar || null,
          affiliation: "Jambushrusti Scholar",
          badge: "Active Scholar"
        },
        content: newPost,
        tags: [],
        timestamp: "Just now",
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
        isBookmarked: false,
        commentsList: []
      };
      
      setPosts([newFeedPost, ...posts]);
      setNewPost("");
      toast.success("Post published successfully!");
    }
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleBookmark = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newBookmarkState = !post.isBookmarked;
        toast.success(newBookmarkState ? "Post bookmarked" : "Bookmark removed");
        return { ...post, isBookmarked: newBookmarkState };
      }
      return post;
    }));
  };

  const handleShare = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, shares: post.shares + 1 };
      }
      return post;
    }));
    toast.success("Post shared!");
  };

  const handleAddComment = (postId: string) => {
    if (!newComment.trim()) return;
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments + 1,
          commentsList: [
            ...(post.commentsList || []),
            { author: user?.name || "Demo Scholar", content: newComment, time: "Just now" }
          ]
        };
      }
      return post;
    }));
    
    setNewComment("");
    toast.success("Comment added!");
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
    toast.success("Post deleted");
  };

  const renderPostCard = (post: FeedPost) => (
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
                <Link 
                  to="/scholar/directory" 
                  className="font-semibold hover:text-primary transition-colors"
                >
                  {post.author.name}
                </Link>
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
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => handleDeletePost(post.id)}
          >
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
              onClick={() => handleLike(post.id)}
            >
              <Heart className={`h-4 w-4 mr-1 ${post.isLiked ? "fill-current" : ""}`} />
              {post.likes}
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setExpandedComments(expandedComments === post.id ? null : post.id)}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              {post.comments}
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleShare(post.id)}
            >
              <Share2 className="h-4 w-4 mr-1" />
              {post.shares}
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            className={post.isBookmarked ? "text-gold" : ""}
            onClick={() => handleBookmark(post.id)}
          >
            <Bookmark className={`h-5 w-5 ${post.isBookmarked ? "fill-current" : ""}`} />
          </Button>
        </div>

        {/* Comments Section */}
        {expandedComments === post.id && (
          <div className="mt-4 pt-4 border-t space-y-3">
            {post.commentsList && post.commentsList.length > 0 && (
              <div className="space-y-2">
                {post.commentsList.map((comment, idx) => (
                  <div key={idx} className="flex gap-2 text-sm">
                    <span className="font-medium">{comment.author}:</span>
                    <span className="text-muted-foreground">{comment.content}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{comment.time}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <Input
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddComment(post.id)}
                className="flex-1"
              />
              <Button 
                size="sm" 
                onClick={() => handleAddComment(post.id)}
                disabled={!newComment.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

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
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/scholar/publications">
                        <FileText className="h-4 w-4 mr-2" />
                        Paper
                      </Link>
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
            {posts.map(renderPostCard)}
          </TabsContent>

          <TabsContent value="trending" className="mt-4 space-y-4">
            {posts
              .sort((a, b) => b.likes - a.likes)
              .slice(0, 5)
              .map(renderPostCard)}
          </TabsContent>

          <TabsContent value="following" className="mt-4 space-y-4">
            {posts.slice(0, 2).map(renderPostCard)}
          </TabsContent>

          <TabsContent value="favorites" className="mt-4 space-y-4">
            {posts.filter(post => post.isBookmarked).length > 0 ? (
              posts.filter(post => post.isBookmarked).map(renderPostCard)
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
