import { useState } from "react";
import { LMSLayout } from "@/components/lms/LMSLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Users,
  Save,
  RotateCcw,
  Search,
  Filter,
  Edit,
  Eye,
  BookOpen,
  UserCheck,
  UserX,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const sampleMembers = [
  {
    id: 1,
    memberId: "M-001",
    name: "Ramesh Patel",
    phone: "+91 98765 43210",
    email: "ramesh.patel@email.com",
    city: "Ahmedabad",
    state: "Gujarat",
    booksIssued: 3,
    status: "Active",
    memberSince: "2020-05-15",
    isApproved: true,
  },
  {
    id: 2,
    memberId: "M-002",
    name: "Suresh Shah",
    phone: "+91 87654 32109",
    email: "suresh.shah@email.com",
    city: "Mumbai",
    state: "Maharashtra",
    booksIssued: 1,
    status: "Active",
    memberSince: "2021-03-22",
    isApproved: true,
  },
  {
    id: 3,
    memberId: "M-003",
    name: "Dr. Meena Jain",
    phone: "+91 76543 21098",
    email: "meena.jain@email.com",
    city: "Delhi",
    state: "Delhi",
    booksIssued: 0,
    status: "Pending",
    memberSince: "2024-01-20",
    isApproved: false,
  },
];

export default function Members() {
  const [viewDialog, setViewDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const handleView = (member: any) => {
    setSelectedMember(member);
    setViewDialog(true);
  };

  return (
    <LMSLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Members</h1>
            <p className="text-muted-foreground">
              Manage library memberships
            </p>
          </div>
        </div>

        <Tabs defaultValue="list" className="space-y-6">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="list">Member List</TabsTrigger>
            <TabsTrigger value="register">New Registration</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">1,256</p>
                      <p className="text-xs text-muted-foreground">Total Members</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <UserCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">1,198</p>
                      <p className="text-xs text-muted-foreground">Active</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/10">
                      <BookOpen className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">156</p>
                      <p className="text-xs text-muted-foreground">With Active Issues</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-destructive/10">
                      <UserX className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-xs text-muted-foreground">Pending Approval</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search & Filter */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, ID, phone, or email..."
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </div>

                <div className="rounded-lg border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary/50">
                        <TableHead>Member</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Books Issued</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleMembers.map((member) => (
                        <TableRow key={member.id} className="hover:bg-secondary/30">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{member.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {member.memberId}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <p className="text-sm flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {member.phone}
                              </p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {member.email}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span>
                                {member.city}, {member.state}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{member.booksIssued}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                member.status === "Active"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {member.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleView(member)}
                              >
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

          <TabsContent value="register" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  New Member Registration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" placeholder="Enter full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input id="phone" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aadhaar">Aadhaar No</Label>
                    <Input id="aadhaar" placeholder="XXXX XXXX XXXX" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Textarea id="address" placeholder="Full address..." rows={2} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" placeholder="City" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input id="state" placeholder="State" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input id="pincode" placeholder="XXXXXX" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="refMember">Reference Member (if any)</Label>
                  <Input id="refMember" placeholder="Existing member ID" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="remarks">Remarks</Label>
                  <Textarea id="remarks" placeholder="Any additional notes..." rows={2} />
                </div>

                <div className="flex gap-3">
                  <Button className="gap-2" variant="hero">
                    <Save className="h-4 w-4" />
                    Register Member
                  </Button>
                  <Button className="gap-2" variant="ghost">
                    <RotateCcw className="h-4 w-4" />
                    Reset Form
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Member Detail Dialog */}
        <Dialog open={viewDialog} onOpenChange={setViewDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Member Details</DialogTitle>
            </DialogHeader>
            {selectedMember && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-primary/10 text-primary text-xl">
                      {selectedMember.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedMember.name}</h3>
                    <p className="text-muted-foreground">{selectedMember.memberId}</p>
                    <Badge
                      variant={
                        selectedMember.status === "Active"
                          ? "default"
                          : "secondary"
                      }
                      className="mt-1"
                    >
                      {selectedMember.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{selectedMember.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedMember.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">
                      {selectedMember.city}, {selectedMember.state}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium">{selectedMember.memberSince}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Books Issued</p>
                    <p className="font-medium">{selectedMember.booksIssued}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </LMSLayout>
  );
}
