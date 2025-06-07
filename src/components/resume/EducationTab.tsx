
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  gpa: string;
  relevantCoursework: string[];
  honors: string;
}

interface EducationTabProps {
  data: Education[];
  onUpdate: (data: Education[]) => void;
}

export const EducationTab = ({ data, onUpdate }: EducationTabProps) => {
  const degreeTypes = [
    "Bachelor's Degree",
    "Master's Degree",
    "PhD",
    "Associate Degree",
    "Certificate",
    "Diploma",
    "High School Diploma"
  ];

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      location: "",
      graduationDate: "",
      gpa: "",
      relevantCoursework: [""],
      honors: ""
    };
    onUpdate([...data, newEducation]);
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    onUpdate(data.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id: string) => {
    onUpdate(data.filter(edu => edu.id !== id));
  };

  const addCoursework = (eduId: string) => {
    updateEducation(eduId, 'relevantCoursework', 
      [...data.find(edu => edu.id === eduId)?.relevantCoursework || [], ""]);
  };

  const updateCoursework = (eduId: string, index: number, value: string) => {
    const education = data.find(edu => edu.id === eduId);
    if (education) {
      const newCoursework = [...education.relevantCoursework];
      newCoursework[index] = value;
      updateEducation(eduId, 'relevantCoursework', newCoursework);
    }
  };

  const removeCoursework = (eduId: string, index: number) => {
    const education = data.find(edu => edu.id === eduId);
    if (education) {
      const newCoursework = education.relevantCoursework.filter((_, i) => i !== index);
      updateEducation(eduId, 'relevantCoursework', newCoursework);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Education</h2>
          <p className="text-muted-foreground">Add your educational background</p>
        </div>
        <Button onClick={addEducation} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Education
        </Button>
      </div>

      {data.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No education added yet</p>
            <Button onClick={addEducation} variant="outline">
              Add Your Education
            </Button>
          </CardContent>
        </Card>
      ) : (
        data.map((education, index) => (
          <Card key={education.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Education #{index + 1}</CardTitle>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => removeEducation(education.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Degree Type *</Label>
                  <Select value={education.degree} onValueChange={(value) => updateEducation(education.id, 'degree', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select degree type" />
                    </SelectTrigger>
                    <SelectContent>
                      {degreeTypes.map((degree) => (
                        <SelectItem key={degree} value={degree}>
                          {degree}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Institution *</Label>
                  <Input
                    placeholder="University of California"
                    value={education.institution}
                    onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    placeholder="Berkeley, CA"
                    value={education.location}
                    onChange={(e) => updateEducation(education.id, 'location', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Graduation Date</Label>
                  <Input
                    type="month"
                    value={education.graduationDate}
                    onChange={(e) => updateEducation(education.id, 'graduationDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>GPA (Optional)</Label>
                  <Input
                    placeholder="3.8/4.0"
                    value={education.gpa}
                    onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Honors & Awards</Label>
                  <Input
                    placeholder="Magna Cum Laude, Dean's List"
                    value={education.honors}
                    onChange={(e) => updateEducation(education.id, 'honors', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Relevant Coursework</Label>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => addCoursework(education.id)}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Course
                  </Button>
                </div>
                {education.relevantCoursework.map((course, courseIndex) => (
                  <div key={courseIndex} className="flex gap-2">
                    <Input
                      placeholder="Data Structures and Algorithms"
                      value={course}
                      onChange={(e) => updateCoursework(education.id, courseIndex, e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeCoursework(education.id, courseIndex)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};
