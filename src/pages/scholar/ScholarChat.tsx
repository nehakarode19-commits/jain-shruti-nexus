import { useState } from "react";
import { ScholarLayout } from "@/components/scholar/ScholarLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Send, 
  Plus, 
  Users, 
  MessageSquare,
  Clock,
  Circle,
  Paperclip,
  Smile
} from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

// Mock conversations
const conversations = [
  {
    id: "1",
    name: "Jain Philosophy Discussion",
    type: "group",
    members: 12,
    lastMessage: "Dr. Sharma: That's an interesting perspective on ahimsa...",
    time: "5m ago",
    unread: 3,
    avatar: null,
  },
  {
    id: "2",
    name: "Dr. Meera Patel",
    type: "direct",
    lastMessage: "Thank you for sharing the manuscript!",
    time: "1h ago",
    unread: 0,
    avatar: "/src/assets/scholars/scholar-female-1.jpg",
  },
  {
    id: "3",
    name: "Manuscript Digitization Team",
    type: "group",
    members: 8,
    lastMessage: "New batch of manuscripts uploaded",
    time: "3h ago",
    unread: 5,
    avatar: null,
  },
  {
    id: "4",
    name: "Prof. Vikram Singh",
    type: "direct",
    lastMessage: "Let's discuss the Agama research tomorrow",
    time: "Yesterday",
    unread: 0,
    avatar: "/src/assets/scholars/scholar-male-3.jpg",
  },
];

const messages = [
  { id: 1, sender: "Dr. Rajesh Sharma", content: "Has anyone reviewed the latest paper on Jain cosmology?", time: "10:30 AM", isOwn: false },
  { id: 2, sender: "You", content: "Yes, I found the section on Loka theory particularly insightful.", time: "10:35 AM", isOwn: true },
  { id: 3, sender: "Dr. Amit Jain", content: "I agree. The author's interpretation of the fourteen Rajloka is unique.", time: "10:40 AM", isOwn: false },
  { id: 4, sender: "Prof. Meera Patel", content: "Could someone share the reference for the Sanskrit text mentioned on page 45?", time: "10:45 AM", isOwn: false },
  { id: 5, sender: "You", content: "It's from Tattvārtha Sūtra, Chapter 3. I'll send the digital copy.", time: "10:50 AM", isOwn: true },
  { id: 6, sender: "Dr. Rajesh Sharma", content: "That's an interesting perspective on ahimsa and its practical applications in modern context.", time: "11:00 AM", isOwn: false },
];

export default function ScholarChat() {
  const [selectedChat, setSelectedChat] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAdminAuth();

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In real app, would send to backend
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <ScholarLayout title="Collaborate">
      <div className="h-[calc(100vh-140px)] flex gap-4">
        {/* Conversations List */}
        <Card className="w-80 flex flex-col shrink-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between mb-3">
              <CardTitle className="text-lg">Messages</CardTitle>
              <Button size="icon" variant="ghost">
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0 overflow-hidden">
            <Tabs defaultValue="all" className="h-full flex flex-col">
              <TabsList className="w-full justify-start rounded-none border-b px-4">
                <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                <TabsTrigger value="groups" className="text-xs">Groups</TabsTrigger>
                <TabsTrigger value="direct" className="text-xs">Direct</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="flex-1 m-0 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="p-2 space-y-1">
                    {conversations.map((conv) => (
                      <button
                        key={conv.id}
                        onClick={() => setSelectedChat(conv)}
                        className={`w-full p-3 rounded-xl text-left transition-colors ${
                          selectedChat.id === conv.id 
                            ? "bg-primary/10" 
                            : "hover:bg-muted"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            {conv.avatar ? (
                              <AvatarImage src={conv.avatar} />
                            ) : null}
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {conv.type === "group" ? (
                                <Users className="h-5 w-5" />
                              ) : (
                                conv.name.charAt(0)
                              )}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm truncate">{conv.name}</span>
                              <span className="text-xs text-muted-foreground">{conv.time}</span>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-muted-foreground truncate">{conv.lastMessage}</span>
                              {conv.unread > 0 && (
                                <Badge className="h-5 min-w-5 flex items-center justify-center bg-gold text-primary-foreground">
                                  {conv.unread}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="groups" className="flex-1 m-0">
                <ScrollArea className="h-full">
                  <div className="p-2 space-y-1">
                    {conversations.filter(c => c.type === "group").map((conv) => (
                      <button
                        key={conv.id}
                        onClick={() => setSelectedChat(conv)}
                        className={`w-full p-3 rounded-xl text-left transition-colors ${
                          selectedChat.id === conv.id ? "bg-primary/10" : "hover:bg-muted"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              <Users className="h-5 w-5" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <span className="font-medium text-sm truncate block">{conv.name}</span>
                            <span className="text-xs text-muted-foreground">{conv.members} members</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="direct" className="flex-1 m-0">
                <ScrollArea className="h-full">
                  <div className="p-2 space-y-1">
                    {conversations.filter(c => c.type === "direct").map((conv) => (
                      <button
                        key={conv.id}
                        onClick={() => setSelectedChat(conv)}
                        className={`w-full p-3 rounded-xl text-left transition-colors ${
                          selectedChat.id === conv.id ? "bg-primary/10" : "hover:bg-muted"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={conv.avatar || ""} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {conv.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-sm truncate">{conv.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                {selectedChat.avatar ? (
                  <AvatarImage src={selectedChat.avatar} />
                ) : null}
                <AvatarFallback className="bg-primary/10 text-primary">
                  {selectedChat.type === "group" ? (
                    <Users className="h-5 w-5" />
                  ) : (
                    selectedChat.name.charAt(0)
                  )}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{selectedChat.name}</h3>
                {selectedChat.type === "group" && (
                  <p className="text-xs text-muted-foreground">{selectedChat.members} members · 5 online</p>
                )}
                {selectedChat.type === "direct" && (
                  <p className="text-xs text-green-500 flex items-center gap-1">
                    <Circle className="h-2 w-2 fill-current" /> Online
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[70%] ${msg.isOwn ? "order-2" : ""}`}>
                    {!msg.isOwn && (
                      <p className="text-xs text-muted-foreground mb-1">{msg.sender}</p>
                    )}
                    <div
                      className={`p-3 rounded-2xl ${
                        msg.isOwn
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-muted rounded-bl-sm"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button variant="ghost" size="icon">
                <Smile className="h-5 w-5" />
              </Button>
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </ScholarLayout>
  );
}
