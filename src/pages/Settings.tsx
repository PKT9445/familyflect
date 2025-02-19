
import { useState } from "react";
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
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [privacySettings, setPrivacySettings] = useState({
    profileVisible: false,
    showDob: false,
    showGender: false,
    showMarital: false,
    showBlood: false,
    showParents: false,
    showSiblings: false,
    showEmail: false,
    showPhone: false,
    showAddress: false,
    showEducation: false,
    showExperience: false,
    showBusiness: false,
  });

  const handlePrivacyChange = (setting: string) => {
    setPrivacySettings(prev => {
      const newSettings = {
        ...prev,
        [setting]: !prev[setting]
      };
      
      // Save to localStorage or your backend here
      localStorage.setItem('privacySettings', JSON.stringify(newSettings));
      
      toast({
        title: "Settings updated",
        description: "Your privacy settings have been saved successfully.",
      });
      
      return newSettings;
    });
  };

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
                <Switch 
                  id="profile-visible" 
                  checked={privacySettings.profileVisible}
                  onCheckedChange={() => handlePrivacyChange('profileVisible')}
                />
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
                  <Switch 
                    id="show-dob"
                    checked={privacySettings.showDob}
                    onCheckedChange={() => handlePrivacyChange('showDob')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-gender">Show Gender</Label>
                  <Switch 
                    id="show-gender"
                    checked={privacySettings.showGender}
                    onCheckedChange={() => handlePrivacyChange('showGender')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-marital">Show Marital Status</Label>
                  <Switch 
                    id="show-marital"
                    checked={privacySettings.showMarital}
                    onCheckedChange={() => handlePrivacyChange('showMarital')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-blood">Show Blood Group</Label>
                  <Switch 
                    id="show-blood"
                    checked={privacySettings.showBlood}
                    onCheckedChange={() => handlePrivacyChange('showBlood')}
                  />
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
                  <Switch 
                    id="show-parents"
                    checked={privacySettings.showParents}
                    onCheckedChange={() => handlePrivacyChange('showParents')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-siblings">Show Siblings</Label>
                  <Switch 
                    id="show-siblings"
                    checked={privacySettings.showSiblings}
                    onCheckedChange={() => handlePrivacyChange('showSiblings')}
                  />
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
                  <Switch 
                    id="show-email"
                    checked={privacySettings.showEmail}
                    onCheckedChange={() => handlePrivacyChange('showEmail')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-phone">Show Phone Number</Label>
                  <Switch 
                    id="show-phone"
                    checked={privacySettings.showPhone}
                    onCheckedChange={() => handlePrivacyChange('showPhone')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-address">Show Address</Label>
                  <Switch 
                    id="show-address"
                    checked={privacySettings.showAddress}
                    onCheckedChange={() => handlePrivacyChange('showAddress')}
                  />
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
                  <Switch 
                    id="show-education"
                    checked={privacySettings.showEducation}
                    onCheckedChange={() => handlePrivacyChange('showEducation')}
                  />
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
                  <Switch 
                    id="show-experience"
                    checked={privacySettings.showExperience}
                    onCheckedChange={() => handlePrivacyChange('showExperience')}
                  />
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
                  <Switch 
                    id="show-business"
                    checked={privacySettings.showBusiness}
                    onCheckedChange={() => handlePrivacyChange('showBusiness')}
                  />
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
