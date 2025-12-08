import { useState } from "react";
import { LMSLayout } from "@/components/lms/LMSLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ScrollText,
  Save,
  FileText,
  RotateCcw,
  Download,
  Printer,
  Search,
  Filter,
  Edit,
  Eye,
  Lock,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const sampleManuscripts = [
  {
    id: 1,
    hastrapNo: "H-001",
    granthName: "कल्प सूत्र",
    mulkarta: "भद्रबाहु स्वामी",
    tikakarta: "शांतिसूरि",
    language: "Prakrit",
    category: "Agam",
    folioNo: 127,
    year: "12th Century",
    totalPages: 254,
    availablePages: 248,
    location: "Safe A",
    restricted: true,
    status: "Active",
  },
  {
    id: 2,
    hastrapNo: "H-002",
    granthName: "नयचक्र",
    mulkarta: "देवसूरि",
    tikakarta: "मलयगिरि",
    language: "Sanskrit",
    category: "Philosophy",
    folioNo: 89,
    year: "14th Century",
    totalPages: 178,
    availablePages: 178,
    location: "Safe B",
    restricted: false,
    status: "Pending",
  },
];

const categories = [
  "Agam",
  "Philosophy",
  "Grammar",
  "Logic",
  "Poetry",
  "Astronomy",
  "Medicine",
  "Ritual",
];

const languages = [
  "Prakrit",
  "Sanskrit",
  "Gujarati",
  "Hindi",
  "Marathi",
  "Apabhramsha",
];

export default function Manuscripts() {
  const [filters, setFilters] = useState({
    granthName: "",
    mulkarta: "",
    tikakarta: "",
    year: "",
    category: "",
    language: "",
    folioNo: "",
    location: "",
  });

  return (
    <LMSLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Manuscripts</h1>
            <p className="text-muted-foreground">
              Manage precious manuscript collections
            </p>
          </div>
        </div>

        <Tabs defaultValue="entry" className="space-y-6">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="entry">New Entry</TabsTrigger>
            <TabsTrigger value="inquiry">Inquiry</TabsTrigger>
          </TabsList>

          <TabsContent value="entry" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Form */}
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ScrollText className="h-5 w-5 text-primary" />
                    Manuscript Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="hastrapNo">Hastrap No *</Label>
                      <Input id="hastrapNo" placeholder="e.g., H-001" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="granthName">
                        Granth Name * (supports transliteration)
                      </Label>
                      <Input
                        id="granthName"
                        placeholder="Enter in Gujarati/Hindi/English"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="mulkarta">Mulkarta (Author)</Label>
                      <Input id="mulkarta" placeholder="Original author" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tikakarta">Tikakarta (Commentator)</Label>
                      <Input id="tikakarta" placeholder="Commentator name" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((lang) => (
                            <SelectItem key={lang} value={lang.toLowerCase()}>
                              {lang}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat.toLowerCase()}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="folioNo">Folio No</Label>
                      <Input id="folioNo" type="number" placeholder="e.g., 127" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="year">Year / Century</Label>
                      <Input id="year" placeholder="e.g., 12th Century" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="totalPages">Total Pages</Label>
                      <Input id="totalPages" type="number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="availablePages">Available Pages</Label>
                      <Input id="availablePages" type="number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="Safe / Rack" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="remarks">Remarks</Label>
                    <Textarea
                      id="remarks"
                      placeholder="Additional notes about the manuscript..."
                      rows={3}
                    />
                  </div>

                  {/* Restricted Notice */}
                  <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-amber-700 dark:text-amber-400">
                          Approval Required
                        </p>
                        <p className="text-sm text-muted-foreground">
                          All manuscript entries require Admin approval before
                          becoming active. Restricted manuscripts can only be
                          read inside the library.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full gap-2" variant="hero">
                    <Save className="h-4 w-4" />
                    Submit for Approval
                  </Button>
                  <Button className="w-full gap-2" variant="outline">
                    <FileText className="h-4 w-4" />
                    Save as Draft
                  </Button>
                  <Button className="w-full gap-2" variant="ghost">
                    <RotateCcw className="h-4 w-4" />
                    Reset Form
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inquiry" className="space-y-6">
            {/* Filter Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Search Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Granth Name</Label>
                    <Input placeholder="Search granth..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Mulkarta</Label>
                    <Input placeholder="Author name..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Tikakarta</Label>
                    <Input placeholder="Commentator..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Year</Label>
                    <Input placeholder="Century..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat.toLowerCase()}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All languages" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        {languages.map((lang) => (
                          <SelectItem key={lang} value={lang.toLowerCase()}>
                            {lang}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Folio No</Label>
                    <Input type="number" placeholder="Folio..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input placeholder="Safe/Rack..." />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button className="gap-2">
                    <Search className="h-4 w-4" />
                    Search
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </Button>
                  <div className="flex-1" />
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Printer className="h-4 w-4" />
                    Print
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results Table */}
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-lg border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary/50">
                        <TableHead>Hastrap No</TableHead>
                        <TableHead>Granth Name</TableHead>
                        <TableHead>Mulkarta</TableHead>
                        <TableHead>Language</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Pages</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleManuscripts.map((ms) => (
                        <TableRow key={ms.id} className="hover:bg-secondary/30">
                          <TableCell className="font-medium">
                            {ms.hastrapNo}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {ms.granthName}
                              {ms.restricted && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Lock className="h-3 w-3 text-amber-500" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      Read inside library only
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{ms.mulkarta}</TableCell>
                          <TableCell>{ms.language}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{ms.category}</Badge>
                          </TableCell>
                          <TableCell>
                            {ms.availablePages}/{ms.totalPages}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                ms.status === "Active"
                                  ? "default"
                                  : ms.status === "Pending"
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              {ms.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </LMSLayout>
  );
}
