
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Briefcase, Building2, GraduationCap, Heart, Shield, User } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">
      <section className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and privacy
        </p>
      </section>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Profile Privacy Settings */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-orange-500" />
              <CardTitle>Profile Privacy Settings</CardTitle>
            </div>
            <CardDescription>
              Control what information is visible to other members
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Main Profile Visibility */}
            <div className="pb-4 border-b">
              <div className="flex items-center justify-between">
                <Label htmlFor="profile-visible" className="font-medium">Make profile visible</Label>
                <Switch id="profile-visible" />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Your profile will be hidden from all members if turned off
              </p>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-blue-500" />
                <h3 className="font-semibold">Personal Information</h3>
              </div>
              <div className="grid gap-4 pl-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-dob">Show Date of Birth</Label>
                  <Switch id="show-dob" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-gender">Show Gender</Label>
                  <Switch id="show-gender" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-marital">Show Marital Status</Label>
                  <Switch id="show-marital" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-blood">Show Blood Group</Label>
                  <Switch id="show-blood" />
                </div>
              </div>
            </div>

            {/* Family Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-rose-500" />
                <h3 className="font-semibold">Family Information</h3>
              </div>
              <div className="grid gap-4 pl-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-parents">Show Parents' Information</Label>
                  <Switch id="show-parents" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-siblings">Show Siblings</Label>
                  <Switch id="show-siblings" />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-green-500" />
                <h3 className="font-semibold">Contact Information</h3>
              </div>
              <div className="grid gap-4 pl-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-email">Show Email Address</Label>
                  <Switch id="show-email" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-phone">Show Phone Number</Label>
                  <Switch id="show-phone" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-address">Show Address</Label>
                  <Switch id="show-address" />
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-purple-500" />
                <h3 className="font-semibold">Education</h3>
              </div>
              <div className="grid gap-4 pl-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-education">Show Educational Background</Label>
                  <Switch id="show-education" />
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-amber-500" />
                <h3 className="font-semibold">Experience</h3>
              </div>
              <div className="grid gap-4 pl-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-experience">Show Work Experience</Label>
                  <Switch id="show-experience" />
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-cyan-500" />
                <h3 className="font-semibold">Business Information</h3>
              </div>
              <div className="grid gap-4 pl-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-business">Show Business Details</Label>
                  <Switch id="show-business" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Password Change Card */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" />
              <CardTitle>Change Password</CardTitle>
            </div>
            <CardDescription>
              Update your password to keep your account secure
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input type="password" id="current-password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input type="password" id="new-password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input type="password" id="confirm-password" />
            </div>
            <Button className="w-full">Update Password</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
