
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  professionalSummary: string;
}

interface PersonalInfoTabProps {
  data: PersonalInfo;
  onUpdate: (data: PersonalInfo) => void;
}

export const PersonalInfoTab = ({ data, onUpdate }: PersonalInfoTabProps) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onUpdate({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Enter your basic personal details that will appear on your resume
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                value={data.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={data.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                placeholder="+1 (555) 123-4567"
                value={data.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                placeholder="New York, NY"
                value={data.location}
                onChange={(e) => handleChange('location', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website/Portfolio</Label>
              <Input
                id="website"
                placeholder="https://johndoe.com"
                value={data.website}
                onChange={(e) => handleChange('website', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn Profile</Label>
              <Input
                id="linkedin"
                placeholder="https://linkedin.com/in/johndoe"
                value={data.linkedin}
                onChange={(e) => handleChange('linkedin', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Professional Summary</CardTitle>
          <CardDescription>
            Write a compelling summary that highlights your key qualifications and career objectives
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="professionalSummary">Professional Summary *</Label>
            <Textarea
              id="professionalSummary"
              placeholder="Experienced software developer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable applications and leading cross-functional teams..."
              className="min-h-[120px]"
              value={data.professionalSummary}
              onChange={(e) => handleChange('professionalSummary', e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              {data.professionalSummary.length}/500 characters
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
