import { useState } from "react";
import { ScholarLayout } from "@/components/scholar/ScholarLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sparkles, 
  Search, 
  FileText, 
  Languages, 
  BookOpen,
  Wand2,
  Send,
  Copy,
  RotateCcw,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const aiTools = [
  {
    id: "assistant",
    name: "Research Assistant",
    description: "Ask questions about Jain philosophy, texts, and research",
    icon: Sparkles,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    id: "search",
    name: "Smart Search",
    description: "AI-powered search across manuscripts and texts",
    icon: Search,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    id: "summarize",
    name: "Text Summarizer",
    description: "Summarize long texts and research papers",
    icon: FileText,
    color: "bg-green-500/10 text-green-500",
  },
  {
    id: "translate",
    name: "Translation Helper",
    description: "Sanskrit, Prakrit, Gujarati to English translation",
    icon: Languages,
    color: "bg-gold/10 text-gold",
  },
];

export default function ScholarAITools() {
  const [selectedTool, setSelectedTool] = useState("assistant");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    setOutput("");
    
    // Simulate AI response (in production, would call Lovable AI)
    setTimeout(() => {
      const responses: Record<string, string> = {
        assistant: `Based on my knowledge of Jain philosophy and texts, here's what I can tell you about "${input}":\n\nJain philosophy emphasizes the principles of Ahimsa (non-violence), Anekantavada (multiplicity of viewpoints), and Aparigraha (non-attachment). Your query touches on important aspects of Jain metaphysics and ethics.\n\nFor detailed scholarly references, I recommend consulting the following texts:\n1. Tattvārtha Sūtra by Umāsvāti\n2. Samayasāra by Kundakunda\n3. Uttarādhyayana Sūtra\n\nWould you like me to elaborate on any specific aspect?`,
        search: `Search results for "${input}":\n\n📚 Found 15 relevant manuscripts and 8 research papers.\n\nTop Results:\n1. "Analysis of Karma Theory in Jain Philosophy" - Dr. Sharma, 2024\n2. Historical manuscript #JM-2345 - Discusses related concepts\n3. "Comparative Studies in Indian Philosophy" - Chapter 5\n\nClick on any result to view the full text.`,
        summarize: `Summary of the provided text:\n\n${input.substring(0, 100)}...\n\n**Key Points:**\n• Main argument revolves around the interpretation of classical texts\n• Author presents three supporting evidences\n• Conclusion suggests need for further research\n\n**Reading Time:** Approximately 5 minutes\n**Complexity:** Academic`,
        translate: `Translation of "${input.substring(0, 50)}...":\n\n**Original:** ${input}\n\n**English Translation:**\nThe essence of this passage speaks to the fundamental principles of spiritual practice and the path toward liberation (Moksha).\n\n**Notes:**\n- Some terms have been transliterated where no direct English equivalent exists\n- Context-dependent meanings have been interpreted based on classical commentaries`,
      };
      
      setOutput(responses[selectedTool] || "Response generated successfully.");
      setIsLoading(false);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast({ title: "Copied to clipboard" });
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
  };

  const getPlaceholder = () => {
    const placeholders: Record<string, string> = {
      assistant: "Ask any question about Jain philosophy, texts, or research...",
      search: "Enter keywords or concepts to search across the digital library...",
      summarize: "Paste the text you want to summarize...",
      translate: "Enter Sanskrit, Prakrit, or Gujarati text to translate...",
    };
    return placeholders[selectedTool];
  };

  return (
    <ScholarLayout title="AI Tools">
      <div className="space-y-6">
        {/* Tool Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {aiTools.map((tool) => (
            <Card
              key={tool.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedTool === tool.id 
                  ? "ring-2 ring-primary shadow-md" 
                  : ""
              }`}
              onClick={() => {
                setSelectedTool(tool.id);
                setOutput("");
              }}
            >
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center ${tool.color}`}>
                  <tool.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{tool.name}</h3>
                <p className="text-xs text-muted-foreground">{tool.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Interface */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-primary" />
                {aiTools.find(t => t.id === selectedTool)?.name}
              </CardTitle>
              <CardDescription>
                {aiTools.find(t => t.id === selectedTool)?.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder={getPlaceholder()}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[200px] resize-none"
              />
              <div className="flex gap-2">
                <Button 
                  onClick={handleSubmit} 
                  disabled={!input.trim() || isLoading}
                  className="flex-1"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4 mr-2" />
                  )}
                  {isLoading ? "Processing..." : "Generate"}
                </Button>
                <Button variant="outline" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Output */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-gold" />
                  AI Response
                </CardTitle>
                {output && (
                  <Button variant="ghost" size="sm" onClick={handleCopy}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin mb-4" />
                  <p>Analyzing your request...</p>
                </div>
              ) : output ? (
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm bg-muted p-4 rounded-xl">
                    {output}
                  </pre>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
                  <Sparkles className="h-8 w-8 mb-4" />
                  <p>Response will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant="outline" 
                className="cursor-pointer hover:bg-primary/10 py-2 px-4"
                onClick={() => setInput("Explain the concept of Karma in Jain philosophy")}
              >
                Explain Karma Theory
              </Badge>
              <Badge 
                variant="outline" 
                className="cursor-pointer hover:bg-primary/10 py-2 px-4"
                onClick={() => setInput("What is Anekantavada and its significance?")}
              >
                Anekantavada
              </Badge>
              <Badge 
                variant="outline" 
                className="cursor-pointer hover:bg-primary/10 py-2 px-4"
                onClick={() => setInput("Compare Jain and Buddhist concepts of liberation")}
              >
                Jain vs Buddhist Liberation
              </Badge>
              <Badge 
                variant="outline" 
                className="cursor-pointer hover:bg-primary/10 py-2 px-4"
                onClick={() => setInput("Summarize the key teachings of Mahavira")}
              >
                Mahavira's Teachings
              </Badge>
              <Badge 
                variant="outline" 
                className="cursor-pointer hover:bg-primary/10 py-2 px-4"
                onClick={() => setInput("Explain the Jain concept of Ahimsa")}
              >
                Ahimsa Concept
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScholarLayout>
  );
}
