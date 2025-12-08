import { LMSLayout } from "@/components/lms/LMSLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Settings,
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Save,
  Upload,
  Shield,
} from "lucide-react";

export default function LMSSettings() {
  return (
    <LMSLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Manage library and account settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    LB
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Photo
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="adminName">Admin Name</Label>
                  <Input id="adminName" defaultValue="Library Administrator" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Email</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    defaultValue="admin@jambushrusti.org"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminPhone">Phone</Label>
                  <Input
                    id="adminPhone"
                    defaultValue="+91 98765 43210"
                  />
                </div>
              </div>

              <Button className="w-full gap-2">
                <Save className="h-4 w-4" />
                Update Profile
              </Button>
            </CardContent>
          </Card>

          {/* Library Settings */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                Library Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="libraryName">Library Name</Label>
                  <Input
                    id="libraryName"
                    defaultValue="जम्बू-श्रुति ज्ञान केन्द्र"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="libraryEmail">
                    <Mail className="h-3 w-3 inline mr-1" />
                    Email
                  </Label>
                  <Input
                    id="libraryEmail"
                    type="email"
                    defaultValue="library@jambushrusti.org"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="libraryPhone">
                    <Phone className="h-3 w-3 inline mr-1" />
                    Phone
                  </Label>
                  <Input
                    id="libraryPhone"
                    defaultValue="+91 79 2657 1234"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="libraryAddress">
                  <MapPin className="h-3 w-3 inline mr-1" />
                  Address
                </Label>
                <Textarea
                  id="libraryAddress"
                  defaultValue="Jain Derasar Road, Paldi, Ahmedabad, Gujarat 380007, India"
                  rows={2}
                />
              </div>

              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Save Library Settings
              </Button>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Change Password
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button className="gap-2">
                      <Lock className="h-4 w-4" />
                      Update Password
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Session Information</h3>
                  <div className="p-4 rounded-lg bg-secondary/30 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Last Login:</span>
                      <span>Today, 9:30 AM</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">IP Address:</span>
                      <span>192.168.1.100</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Browser:</span>
                      <span>Chrome on Windows</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Role:</span>
                      <span className="font-medium text-primary">Admin</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <p className="text-sm text-amber-700 dark:text-amber-400">
                      <strong>Security Tip:</strong> Change your password
                      regularly and never share your login credentials.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </LMSLayout>
  );
}
