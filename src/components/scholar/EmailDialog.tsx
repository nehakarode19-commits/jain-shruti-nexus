import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Loader2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface Scholar {
  id: string;
  name: string;
  avatar?: string;
  affiliation: string;
  email: string;
}

interface EmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scholar: Scholar | null;
}

export function EmailDialog({ open, onOpenChange, scholar }: EmailDialogProps) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleOpenEmail = () => {
    if (!scholar) return;
    
    const mailtoUrl = `mailto:${scholar.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_blank');
    
    toast.success("Opening email client...");
    onOpenChange(false);
  };

  const handleCopyEmail = () => {
    if (!scholar) return;
    
    navigator.clipboard.writeText(scholar.email);
    toast.success("Email copied to clipboard!");
  };

  if (!scholar) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={scholar.avatar} alt={scholar.name} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {scholar.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{scholar.name}</div>
              <div className="text-sm font-normal text-muted-foreground">{scholar.email}</div>
            </div>
          </DialogTitle>
          <DialogDescription>
            Compose an email to send to this scholar via your email client.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email-subject">Subject</Label>
            <Input
              id="email-subject"
              placeholder="Enter email subject..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-body">Message</Label>
            <Textarea
              id="email-body"
              placeholder="Write your email message..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleCopyEmail}>
            Copy Email Address
          </Button>
          <Button onClick={handleOpenEmail}>
            <Mail className="h-4 w-4 mr-2" />
            Open Email Client
            <ExternalLink className="h-3 w-3 ml-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
