import { LearningLayout } from "@/components/learning/LearningLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  Bell,
  Shield,
  Mail,
  Globe,
  Save,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const LMSSettings = () => {
  const [settings, setSettings] = useState({
    siteName: "Jambushrusti Learning Portal",
    siteDescription: "A comprehensive Learning Management System for Jain studies and research",
    contactEmail: "learning@jambushrusti.org",
    enableEnrollmentNotifications: true,
    enableProgressNotifications: true,
    enableNewCourseNotifications: true,
    requireApprovalForEnrollment: false,
    allowPublicCoursePreview: true,
    maxEnrollmentsPerStudent: 10,
  });

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <LearningLayout title="LMS Settings">
      <div className="space-y-6 max-w-3xl">
        {/* General Settings */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              General Settings
            </CardTitle>
            <CardDescription>Configure basic LMS settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Portal Name</Label>
              <Input
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                rows={3}
              />
            </div>
            <div>
              <Label>Contact Email</Label>
              <Input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notifications
            </CardTitle>
            <CardDescription>Configure email and system notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Enrollment Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Notify instructors when students enroll
                </p>
              </div>
              <Switch
                checked={settings.enableEnrollmentNotifications}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, enableEnrollmentNotifications: checked })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Progress Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Notify students about their progress
                </p>
              </div>
              <Switch
                checked={settings.enableProgressNotifications}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, enableProgressNotifications: checked })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>New Course Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Notify students about new courses
                </p>
              </div>
              <Switch
                checked={settings.enableNewCourseNotifications}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, enableNewCourseNotifications: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Access Control */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Access Control
            </CardTitle>
            <CardDescription>Configure enrollment and access settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Require Enrollment Approval</Label>
                <p className="text-sm text-muted-foreground">
                  Admin approval required for enrollments
                </p>
              </div>
              <Switch
                checked={settings.requireApprovalForEnrollment}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, requireApprovalForEnrollment: checked })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Allow Public Course Preview</Label>
                <p className="text-sm text-muted-foreground">
                  Non-logged users can preview course info
                </p>
              </div>
              <Switch
                checked={settings.allowPublicCoursePreview}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, allowPublicCoursePreview: checked })
                }
              />
            </div>
            <Separator />
            <div>
              <Label>Max Enrollments Per Student</Label>
              <Input
                type="number"
                value={settings.maxEnrollmentsPerStudent}
                onChange={(e) =>
                  setSettings({ ...settings, maxEnrollmentsPerStudent: parseInt(e.target.value) || 10 })
                }
                className="w-32 mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </div>
    </LearningLayout>
  );
};

export default LMSSettings;
