import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSubmitFeedback } from "@/hooks/useFeedback";
import { MessageSquare, Star, Send, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const feedbackTypes = [
  { value: "general", label: "General Feedback" },
  { value: "suggestion", label: "Suggestion" },
  { value: "complaint", label: "Complaint" },
  { value: "appreciation", label: "Appreciation" },
];

export default function Feedback() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [feedbackType, setFeedbackType] = useState("general");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = useSubmitFeedback();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      return;
    }

    await submitMutation.mutateAsync({
      name: name.trim() || undefined,
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      feedback_type: feedbackType,
      message: message.trim(),
      rating: rating > 0 ? rating : undefined,
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Layout>
        <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-background to-secondary/20 py-16">
          <div className="container mx-auto px-4">
            <Card className="max-w-md mx-auto text-center border-primary/20 shadow-elegant">
              <CardContent className="pt-12 pb-10">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-3">
                  Thank You!
                </h2>
                <p className="text-muted-foreground mb-6">
                  Your feedback has been submitted successfully. We appreciate your time and input.
                </p>
                <Button variant="hero" onClick={() => window.location.href = "/"}>
                  Return to Home
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Visitor Feedback
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We value your feedback. Please share your experience with us to help improve our services.
          </p>
        </div>
      </section>

      {/* Feedback Form */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-border/50 shadow-elegant">
            <CardHeader>
              <CardTitle className="font-heading text-xl">Share Your Feedback</CardTitle>
              <CardDescription>
                All fields marked with * are optional except the message.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Feedback Type */}
                <div className="space-y-3">
                  <Label>Feedback Type</Label>
                  <RadioGroup
                    value={feedbackType}
                    onValueChange={setFeedbackType}
                    className="flex flex-wrap gap-3"
                  >
                    {feedbackTypes.map((type) => (
                      <div key={type.value} className="flex items-center">
                        <RadioGroupItem
                          value={type.value}
                          id={type.value}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={type.value}
                          className={cn(
                            "px-4 py-2 rounded-full border cursor-pointer transition-all",
                            feedbackType === type.value
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-secondary/50 border-border hover:border-primary/50"
                          )}
                        >
                          {type.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Rating */}
                <div className="space-y-3">
                  <Label>Rate Your Experience</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Star
                          className={cn(
                            "h-8 w-8 transition-colors",
                            (hoveredRating || rating) >= star
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground/30"
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">
                    Your Message <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please share your feedback, suggestions, or experience..."
                    rows={5}
                    required
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={!message.trim() || submitMutation.isPending}
                >
                  {submitMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
