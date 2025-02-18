
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

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
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
            <CardDescription>
              Control what information is visible to other members
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="profile-visible">Make profile visible</Label>
              <Switch id="profile-visible" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-email">Show email address</Label>
              <Switch id="show-email" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-phone">Show phone number</Label>
              <Switch id="show-phone" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
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
