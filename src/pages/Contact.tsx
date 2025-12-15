import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { GoogleMap } from "@/components/shared/GoogleMap";
import { FeedbackQRCode } from "@/components/shared/FeedbackQRCode";
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send,
  Clock
} from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    content: "Muni Jambuvijayji Gyan Mandir\nNear Adani Shantigram Jain Temple\nAdani Shantigram Township\nAhmedabad 382 421",
  },
  {
    icon: Mail,
    title: "Email",
    content: "contact@jambushrusti.org",
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+91-98250 44911",
  },
  {
    icon: Clock,
    title: "Hours",
    content: "Mon - Sat: 10:00 AM - 6:00 PM IST\nVisiting: 10:45 AM - 5:15 PM IST",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll respond within 2-3 business days.",
    });
    
    setFormData({
      name: "",
      email: "",
      inquiryType: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-20 bg-gradient-hero lotus-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6 animate-fade-up">
              Contact Us
            </h1>
            <p className="font-body text-muted-foreground animate-fade-up delay-100">
              Have questions about our research, library, or programs? 
              We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                Get in Touch
              </h2>
              {contactInfo.map((item, index) => (
                <div 
                  key={item.title}
                  className="flex items-start gap-4 animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-medium text-foreground">{item.title}</h3>
                    <p className="font-body text-muted-foreground whitespace-pre-line">
                      {item.content}
                    </p>
                  </div>
                </div>
              ))}

              {/* Feedback QR Code */}
              <div className="pt-4">
                <FeedbackQRCode compact />
              </div>
            </div>

            {/* Contact Form */}
            <Card variant="elevated" className="lg:col-span-2 animate-fade-up delay-200">
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="inquiryType">Inquiry Type</Label>
                      <Select
                        value={formData.inquiryType}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, inquiryType: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="scholar">Scholar Access</SelectItem>
                          <SelectItem value="library">Library Visit</SelectItem>
                          <SelectItem value="research">Research Collaboration</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                        placeholder="Subject of your message"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="How can we help you?"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-3">
              Find Us
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Visit our library and research center located near Adani Shantigram Jain Temple
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <GoogleMap height="450px" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
