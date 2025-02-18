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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Camera, Mail, Phone, MapPin, Upload, Building2, Briefcase, GraduationCap, Heart, User } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    firstName: "John",
    middleName: "",
    lastName: "Doe",
    gender: "male",
    dateOfBirth: new Date(),
    placeOfBirth: "",
    maritalStatus: "single",
    gotra: "",
    bloodGroup: "",
    spouseName: "",

    fatherName: "",
    motherName: "",
    siblings: ["", "", "", "", ""],

    primaryAddress: "",
    phoneNumber: "",
    emailAddress: "john.doe@example.com",
    alternateContact: "",

    highestQualification: "",
    specialization: "",
    otherQualifications: "",

    currentJobTitle: "",
    companyName: "",
    yearsOfExperience: "",

    businessName: "",
    businessType: "",
    businessAddress: "",
    businessWebsite: "",

    organizationMemberships: "",
    postServed: "",
    volunteerWork: "",
    languagesKnown: "",
    skillsExpertise: "",
    hobbiesInterests: "",
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = (field: string, value: any) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <Card className="profile-card">
        <CardHeader className="text-center relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Upload className="h-4 w-4" />
          </Button>
          <div className="mx-auto relative group">
            <div className={cn(
              "w-32 h-32 rounded-full overflow-hidden flex items-center justify-center mb-4",
              profileImage ? "bg-transparent" : "bg-secondary"
            )}>
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <Camera className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="bg-black/50 rounded-full w-32 h-32 absolute flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-8 w-8 text-white" />
                </div>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="personal">
              <AccordionTrigger className="text-lg font-semibold">
                <User className="h-5 w-5 mr-2" /> Personal Information
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input
                      value={profile.firstName}
                      onChange={(e) => handleProfileUpdate("firstName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Middle Name</Label>
                    <Input
                      value={profile.middleName}
                      onChange={(e) => handleProfileUpdate("middleName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input
                      value={profile.lastName}
                      onChange={(e) => handleProfileUpdate("lastName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select
                      disabled={!isEditing}
                      value={profile.gender}
                      onValueChange={(value) => handleProfileUpdate("gender", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date of Birth</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !profile.dateOfBirth && "text-muted-foreground"
                          )}
                          disabled={!isEditing}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {profile.dateOfBirth ? format(profile.dateOfBirth, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={profile.dateOfBirth}
                          onSelect={(date) => date && handleProfileUpdate("dateOfBirth", date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Place of Birth</Label>
                    <Input
                      value={profile.placeOfBirth}
                      onChange={(e) => handleProfileUpdate("placeOfBirth", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Marital Status</Label>
                    <Select
                      disabled={!isEditing}
                      value={profile.maritalStatus}
                      onValueChange={(value) => handleProfileUpdate("maritalStatus", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Gotra</Label>
                    <Input
                      value={profile.gotra}
                      onChange={(e) => handleProfileUpdate("gotra", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Blood Group</Label>
                    <Select
                      disabled={!isEditing}
                      value={profile.bloodGroup}
                      onValueChange={(value) => handleProfileUpdate("bloodGroup", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                          <SelectItem key={group} value={group}>{group}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="family">
              <AccordionTrigger className="text-lg font-semibold">
                <Heart className="h-5 w-5 mr-2" /> Family Information
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Father's Name</Label>
                    <Input
                      value={profile.fatherName}
                      onChange={(e) => handleProfileUpdate("fatherName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Mother's Name</Label>
                    <Input
                      value={profile.motherName}
                      onChange={(e) => handleProfileUpdate("motherName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Label>Siblings</Label>
                  <div className="grid gap-2 mt-2">
                    {profile.siblings.map((sibling, index) => (
                      <Input
                        key={index}
                        value={sibling}
                        onChange={(e) => {
                          const newSiblings = [...profile.siblings];
                          newSiblings[index] = e.target.value;
                          handleProfileUpdate("siblings", newSiblings);
                        }}
                        placeholder={`Sibling ${index + 1}`}
                        disabled={!isEditing}
                      />
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="contact">
              <AccordionTrigger className="text-lg font-semibold">
                <Phone className="h-5 w-5 mr-2" /> Contact Information
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Primary Address</Label>
                    <Textarea
                      value={profile.primaryAddress}
                      onChange={(e) => handleProfileUpdate("primaryAddress", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <Input
                        value={profile.phoneNumber}
                        onChange={(e) => handleProfileUpdate("phoneNumber", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Alternate Contact</Label>
                      <Input
                        value={profile.alternateContact}
                        onChange={(e) => handleProfileUpdate("alternateContact", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email Address</Label>
                      <Input
                        type="email"
                        value={profile.emailAddress}
                        onChange={(e) => handleProfileUpdate("emailAddress", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="education">
              <AccordionTrigger className="text-lg font-semibold">
                <GraduationCap className="h-5 w-5 mr-2" /> Education
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Highest Qualification</Label>
                    <Input
                      value={profile.highestQualification}
                      onChange={(e) => handleProfileUpdate("highestQualification", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Specialization / Field of Study</Label>
                    <Input
                      value={profile.specialization}
                      onChange={(e) => handleProfileUpdate("specialization", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Other Qualifications or Certifications</Label>
                    <Textarea
                      value={profile.otherQualifications}
                      onChange={(e) => handleProfileUpdate("otherQualifications", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="experience">
              <AccordionTrigger className="text-lg font-semibold">
                <Briefcase className="h-5 w-5 mr-2" /> Experience
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Current Job Title</Label>
                      <Input
                        value={profile.currentJobTitle}
                        onChange={(e) => handleProfileUpdate("currentJobTitle", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Company Name</Label>
                      <Input
                        value={profile.companyName}
                        onChange={(e) => handleProfileUpdate("companyName", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Years of Experience</Label>
                    <Input
                      type="number"
                      value={profile.yearsOfExperience}
                      onChange={(e) => handleProfileUpdate("yearsOfExperience", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="business">
              <AccordionTrigger className="text-lg font-semibold">
                <Building2 className="h-5 w-5 mr-2" /> Business Information
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Business Name</Label>
                      <Input
                        value={profile.businessName}
                        onChange={(e) => handleProfileUpdate("businessName", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Business Type</Label>
                      <Input
                        value={profile.businessType}
                        onChange={(e) => handleProfileUpdate("businessType", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Business Address</Label>
                    <Textarea
                      value={profile.businessAddress}
                      onChange={(e) => handleProfileUpdate("businessAddress", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Business Website</Label>
                    <Input
                      type="url"
                      value={profile.businessWebsite}
                      onChange={(e) => handleProfileUpdate("businessWebsite", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="other">
              <AccordionTrigger className="text-lg font-semibold">
                Other Details
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Member of Other Organizations</Label>
                    <Textarea
                      value={profile.organizationMemberships}
                      onChange={(e) => handleProfileUpdate("organizationMemberships", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Post Served</Label>
                    <Input
                      value={profile.postServed}
                      onChange={(e) => handleProfileUpdate("postServed", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Volunteer Work</Label>
                    <Textarea
                      value={profile.volunteerWork}
                      onChange={(e) => handleProfileUpdate("volunteerWork", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Languages Known</Label>
                    <Input
                      value={profile.languagesKnown}
                      onChange={(e) => handleProfileUpdate("languagesKnown", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Skills/Expertise</Label>
                    <Textarea
                      value={profile.skillsExpertise}
                      onChange={(e) => handleProfileUpdate("skillsExpertise", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Hobbies & Interests</Label>
                    <Textarea
                      value={profile.hobbiesInterests}
                      onChange={(e) => handleProfileUpdate("hobbiesInterests", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {isEditing && (
            <div className="flex justify-end gap-4 pt-4">
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
