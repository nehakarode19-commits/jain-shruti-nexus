import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Bell, 
  MessageSquare, 
  Users, 
  FileText, 
  Check,
  CheckCheck,
  Trash2,
  Calendar
} from "lucide-react";
import { toast } from "sonner";

interface Notification {
  id: string;
  type: "message" | "collaboration" | "publication" | "event";
  title: string;
  description: string;
  from?: {
    name: string;
    avatar?: string;
  };
  link?: string;
  read: boolean;
  createdAt: string;
}

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "message",
    title: "New Message",
    description: "Dr. Rajesh Sharma sent you a message about the manuscript project.",
    from: { name: "Dr. Rajesh Sharma", avatar: "/src/assets/scholars/scholar-male-1.jpg" },
    link: "/scholar/chat",
    read: false,
    createdAt: "2024-03-15T10:30:00"
  },
  {
    id: "2",
    type: "collaboration",
    title: "Collaboration Request",
    description: "Prof. Meera Patel invited you to join 'Digital Preservation of Jain Manuscripts'",
    from: { name: "Prof. Meera Patel", avatar: "/src/assets/scholars/scholar-female-1.jpg" },
    link: "/scholar/collaborate",
    read: false,
    createdAt: "2024-03-15T09:15:00"
  },
  {
    id: "3",
    type: "publication",
    title: "Publication Approved",
    description: "Your publication 'Anekantavada in Modern Context' has been approved and published.",
    link: "/scholar/publications",
    read: true,
    createdAt: "2024-03-14T14:20:00"
  },
  {
    id: "4",
    type: "event",
    title: "Upcoming Event",
    description: "Reminder: 'Annual Jain Studies Conference' starts tomorrow at 9:00 AM",
    link: "/scholar/events",
    read: true,
    createdAt: "2024-03-13T16:00:00"
  },
  {
    id: "5",
    type: "collaboration",
    title: "Project Update",
    description: "New file uploaded in 'Comparative Analysis of Jain and Buddhist Karma Theories'",
    from: { name: "Dr. Amit Jain" },
    link: "/scholar/collaborate",
    read: true,
    createdAt: "2024-03-12T11:45:00"
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "message": return <MessageSquare className="h-4 w-4 text-blue-500" />;
    case "collaboration": return <Users className="h-4 w-4 text-green-500" />;
    case "publication": return <FileText className="h-4 w-4 text-purple-500" />;
    case "event": return <Calendar className="h-4 w-4 text-orange-500" />;
    default: return <Bell className="h-4 w-4" />;
  }
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
};

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.success("Notification deleted");
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="secondary">{unreadCount} new</Badge>
              )}
            </SheetTitle>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                <CheckCheck className="h-4 w-4 mr-1" />
                Mark all read
              </Button>
            )}
          </div>
          <SheetDescription>
            Stay updated with messages, collaborations, and events
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-150px)] mt-4 -mx-6 px-6">
          <div className="space-y-2">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Bell className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border transition-colors ${
                    notification.read 
                      ? "bg-background" 
                      : "bg-primary/5 border-primary/20"
                  }`}
                >
                  <div className="flex gap-3">
                    {notification.from?.avatar ? (
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={notification.from.avatar} />
                        <AvatarFallback>
                          {notification.from.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        {getNotificationIcon(notification.type)}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium text-sm flex items-center gap-2">
                            {getNotificationIcon(notification.type)}
                            {notification.title}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {notification.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {formatTime(notification.createdAt)}
                          </p>
                        </div>

                        <div className="flex items-center gap-1">
                          {!notification.read && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {notification.link && (
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="p-0 h-auto mt-2"
                          asChild
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <Link to={notification.link}>
                            View Details →
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
