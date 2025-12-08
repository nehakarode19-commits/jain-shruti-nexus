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
import { Switch } from "@/components/ui/switch";
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
  Save,
  FileText,
  RotateCcw,
  Download,
  Printer,
  Search,
  Filter,
  Edit,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const sampleBooks = [
  {
    id: 1,
    bookNo: "B-001",
    title: "आगम एनसाइक्लोपीडिया खंड १",
    author: "आचार्य श्री जम्बूविजयजी",
    publisher: "Siddhi Publications",
    year: 1998,
    pages: 542,
    condition: "Good",
    location: "Rack A, Bin 3",
    status: "Available",
  },
  {
    id: 2,
    bookNo: "B-002",
    title: "जैन धर्म का इतिहास",
    author: "डॉ. हीरालाल जैन",
    publisher: "Bhartiya Vidya Prakashan",
    year: 1974,
    pages: 380,
    condition: "Fair",
    location: "Rack B, Bin 1",
    status: "Issued",
  },
  {
    id: 3,
    bookNo: "B-003",
    title: "कल्प सूत्र",
    author: "भद्रबाहु स्वामी",
    publisher: "Jain Sahitya Prakashan",
    year: 1952,
    pages: 256,
    condition: "Fragile",
    location: "Rack C, Bin 5",
    status: "Reference Only",
  },
];

export default function BookEntry() {
  const [frontWise, setFrontWise] = useState(true);

  return (
    <LMSLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Book Entry</h1>
            <p className="text-muted-foreground">
              Add new books or manage existing entries
            </p>
          </div>
        </div>

        <Tabs defaultValue="entry" className="space-y-6">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="entry">New Entry</TabsTrigger>
            <TabsTrigger value="list">Book List</TabsTrigger>
          </TabsList>

          <TabsContent value="entry" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Form */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Book Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bookNo">Book No *</Label>
                      <Input id="bookNo" placeholder="e.g., B-001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">
                        Title * (supports Gujarati/Hindi)
                      </Label>
                      <Input
                        id="title"
                        placeholder="Enter title in any language"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="author">Author</Label>
                      <Input id="author" placeholder="Author name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="publisher">Publisher</Label>
                      <Input id="publisher" placeholder="Publisher name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year">Year</Label>
                      <Input id="year" type="number" placeholder="Publication year" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pages">Total Pages</Label>
                      <Input id="pages" type="number" placeholder="Number of pages" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="condition">Condition</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                          <SelectItem value="fragile">Fragile</SelectItem>
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
                          <SelectItem value="agam">Agam</SelectItem>
                          <SelectItem value="prakrit">Prakrit</SelectItem>
                          <SelectItem value="encyclopedia">Encyclopedia</SelectItem>
                          <SelectItem value="philosophy">Philosophy</SelectItem>
                          <SelectItem value="history">History</SelectItem>
                          <SelectItem value="biography">Biography</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Location Fields */}
                  <div className="pt-4 border-t border-border">
                    <h3 className="font-medium mb-4">Location Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="rack">Rack</Label>
                        <Input id="rack" placeholder="e.g., Rack A" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bin">Bin</Label>
                        <Input id="bin" placeholder="e.g., Bin 3" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cupboard">Cupboard</Label>
                        <Input id="cupboard" placeholder="e.g., Cupboard 1" />
                      </div>
                    </div>
                  </div>

                  {/* Remarks */}
                  <div className="space-y-2">
                    <Label htmlFor="remarks">Remarks</Label>
                    <Textarea
                      id="remarks"
                      placeholder="Any additional notes..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Indexing Panel */}
              <Card>
                <CardHeader>
                  <CardTitle>Indexing Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="indexStart">Index Start</Label>
                    <Input id="indexStart" placeholder="e.g., 1A" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="indexEnd">Index End</Label>
                    <Input id="indexEnd" placeholder="e.g., 1B" />
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-medium mb-3">Missing Pages</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="missingFrom">From</Label>
                        <Input id="missingFrom" type="number" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="missingTo">To</Label>
                        <Input id="missingTo" type="number" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="space-y-1">
                      <Label>Page Direction</Label>
                      <p className="text-xs text-muted-foreground">
                        {frontWise ? "Front to Back" : "Back to Front"}
                      </p>
                    </div>
                    <Switch
                      checked={frontWise}
                      onCheckedChange={setFrontWise}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 space-y-3">
                    <Button className="w-full gap-2" variant="hero">
                      <Save className="h-4 w-4" />
                      Save Entry
                    </Button>
                    <Button className="w-full gap-2" variant="outline">
                      <FileText className="h-4 w-4" />
                      Save as Draft
                    </Button>
                    <Button className="w-full gap-2" variant="ghost">
                      <RotateCcw className="h-4 w-4" />
                      Reset Form
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="list" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle>Book Catalog</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search books..." className="pl-10 w-64" />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Printer className="h-4 w-4" />
                      Print
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary/50">
                        <TableHead>Book No</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Condition</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleBooks.map((book) => (
                        <TableRow key={book.id} className="hover:bg-secondary/30">
                          <TableCell className="font-medium">{book.bookNo}</TableCell>
                          <TableCell>{book.title}</TableCell>
                          <TableCell>{book.author}</TableCell>
                          <TableCell>{book.year}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                book.condition === "Fragile"
                                  ? "destructive"
                                  : book.condition === "Good"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {book.condition}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                book.status === "Available"
                                  ? "default"
                                  : book.status === "Issued"
                                  ? "secondary"
                                  : "outline"
                              }
                            >
                              {book.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-destructive">
                                <Trash2 className="h-4 w-4" />
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
