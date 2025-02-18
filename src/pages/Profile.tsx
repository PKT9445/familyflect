
import { useState } from "react";
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
import { Camera, Mail, Phone, MapPin, Edit2 } from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    location: "New York, USA",
    bio: "Community member since 2020",
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="profile-card">
        <CardHeader className="text-center relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <div className="mx-auto relative">
            <div className="w-32 h-32 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Camera className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
          {isEditing ? (
            <Input
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              className="text-2xl font-bold text-center"
            />
          ) : (
            <CardTitle className="text-2xl">{profile.name}</CardTitle>
          )}
          <CardDescription>{profile.bio}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              {isEditing ? (
                <Input
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                />
              ) : (
                <p className="text-sm">{profile.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone
              </Label>
              {isEditing ? (
                <Input
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                />
              ) : (
                <p className="text-sm">{profile.phone}</p>
              )}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              {isEditing ? (
                <Input
                  value={profile.location}
                  onChange={(e) =>
                    setProfile({ ...profile, location: e.target.value })
                  }
                />
              ) : (
                <p className="text-sm">{profile.location}</p>
              )}
            </div>
          </div>
          {isEditing && (
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setIsEditing(false)}>
                Save Changes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
