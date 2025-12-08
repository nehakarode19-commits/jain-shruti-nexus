import { LMSLayout } from "@/components/lms/LMSLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  BarChart3,
  Download,
  Printer,
  Filter,
  Calendar,
  BookOpen,
  Users,
  ScrollText,
  FileSpreadsheet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const issueReceiveData = [
  {
    date: "2024-01-20",
    memberId: "M-001",
    memberName: "Ramesh Patel",
    bookNo: "B-001",
    bookTitle: "आगम एनसाइक्लोपीडिया",
    type: "Issue",
    status: "Active",
  },
  {
    date: "2024-01-19",
    memberId: "M-002",
    memberName: "Suresh Shah",
    bookNo: "B-002",
    bookTitle: "जैन धर्म का इतिहास",
    type: "Receive",
    status: "Completed",
  },
  {
    date: "2024-01-18",
    memberId: "M-003",
    memberName: "Meena Jain",
    bookNo: "B-004",
    bookTitle: "Prakrit Grammar",
    type: "Issue",
    status: "Active",
  },
];

const memberUsageData = [
  {
    memberId: "M-001",
    memberName: "Ramesh Patel",
    totalIssued: 45,
    currentlyHolding: 3,
    overdueCount: 1,
    memberSince: "2020-05-15",
  },
  {
    memberId: "M-002",
    memberName: "Suresh Shah",
    totalIssued: 32,
    currentlyHolding: 1,
    overdueCount: 0,
    memberSince: "2021-03-22",
  },
  {
    memberId: "M-003",
    memberName: "Dr. Meena Jain",
    totalIssued: 12,
    currentlyHolding: 2,
    overdueCount: 0,
    memberSince: "2023-08-10",
  },
];

const manuscriptData = [
  {
    hastrapNo: "H-001",
    granthName: "कल्प सूत्र",
    mulkarta: "भद्रबाहु स्वामी",
    category: "Agam",
    language: "Prakrit",
    pages: "248/254",
    status: "Active",
  },
  {
    hastrapNo: "H-002",
    granthName: "नयचक्र",
    mulkarta: "देवसूरि",
    category: "Philosophy",
    language: "Sanskrit",
    pages: "178/178",
    status: "Active",
  },
];

export default function Reports() {
  return (
    <LMSLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Reports</h1>
            <p className="text-muted-foreground">
              Generate and export library reports
            </p>
          </div>
        </div>

        <Tabs defaultValue="issue-receive" className="space-y-6">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="issue-receive" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Issue/Receive
            </TabsTrigger>
            <TabsTrigger value="member-usage" className="gap-2">
              <Users className="h-4 w-4" />
              Member Usage
            </TabsTrigger>
            <TabsTrigger value="manuscript" className="gap-2">
              <ScrollText className="h-4 w-4" />
              Manuscript Catalog
            </TabsTrigger>
          </TabsList>

          {/* Issue/Receive Report */}
          <TabsContent value="issue-receive" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>From Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>To Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="issue">Issue</SelectItem>
                        <SelectItem value="receive">Receive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Member</Label>
                    <Input placeholder="Search member..." />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button className="gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Generate Report
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export Excel
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Printer className="h-4 w-4" />
                    Print
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="rounded-lg border border-border overflow-auto">
                  <Table>
                    <TableHeader className="sticky top-0 bg-secondary/50">
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Member</TableHead>
                        <TableHead>Book</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {issueReceiveData.map((row, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{row.date}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{row.memberName}</p>
                              <p className="text-xs text-muted-foreground">
                                {row.memberId}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{row.bookTitle}</p>
                              <p className="text-xs text-muted-foreground">
                                {row.bookNo}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={row.type === "Issue" ? "default" : "secondary"}
                            >
                              {row.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                row.status === "Active" ? "outline" : "default"
                              }
                            >
                              {row.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                  <span>Showing 3 of 245 records</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Member Usage Report */}
          <TabsContent value="member-usage" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Member Since (From)</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Member Since (To)</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Sort By</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Total Issued" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="total-issued">Total Issued</SelectItem>
                        <SelectItem value="currently-holding">
                          Currently Holding
                        </SelectItem>
                        <SelectItem value="overdue">Overdue Count</SelectItem>
                        <SelectItem value="member-since">Member Since</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button className="gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Generate Report
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    Export Excel
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Printer className="h-4 w-4" />
                    Print
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="rounded-lg border border-border overflow-auto">
                  <Table>
                    <TableHeader className="sticky top-0 bg-secondary/50">
                      <TableRow>
                        <TableHead>Member</TableHead>
                        <TableHead className="text-center">Total Issued</TableHead>
                        <TableHead className="text-center">Currently Holding</TableHead>
                        <TableHead className="text-center">Overdue</TableHead>
                        <TableHead>Member Since</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {memberUsageData.map((row, idx) => (
                        <TableRow key={idx}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{row.memberName}</p>
                              <p className="text-xs text-muted-foreground">
                                {row.memberId}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-center font-medium">
                            {row.totalIssued}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="secondary">{row.currentlyHolding}</Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge
                              variant={row.overdueCount > 0 ? "destructive" : "outline"}
                            >
                              {row.overdueCount}
                            </Badge>
                          </TableCell>
                          <TableCell>{row.memberSince}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manuscript Catalog Report */}
          <TabsContent value="manuscript" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="agam">Agam</SelectItem>
                        <SelectItem value="philosophy">Philosophy</SelectItem>
                        <SelectItem value="grammar">Grammar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="prakrit">Prakrit</SelectItem>
                        <SelectItem value="sanskrit">Sanskrit</SelectItem>
                        <SelectItem value="gujarati">Gujarati</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Search</Label>
                    <Input placeholder="Granth name..." />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button className="gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Generate Report
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    Export Excel
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Printer className="h-4 w-4" />
                    Print
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="rounded-lg border border-border overflow-auto">
                  <Table>
                    <TableHeader className="sticky top-0 bg-secondary/50">
                      <TableRow>
                        <TableHead>Hastrap No</TableHead>
                        <TableHead>Granth Name</TableHead>
                        <TableHead>Mulkarta</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Language</TableHead>
                        <TableHead>Pages</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {manuscriptData.map((row, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium">
                            {row.hastrapNo}
                          </TableCell>
                          <TableCell>{row.granthName}</TableCell>
                          <TableCell>{row.mulkarta}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{row.category}</Badge>
                          </TableCell>
                          <TableCell>{row.language}</TableCell>
                          <TableCell>{row.pages}</TableCell>
                          <TableCell>
                            <Badge variant="default">{row.status}</Badge>
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
