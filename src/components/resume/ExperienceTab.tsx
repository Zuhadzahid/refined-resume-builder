
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrentJob: boolean;
  description: string;
  achievements: string[];
}

interface ExperienceTabProps {
  data: Experience[];
  onUpdate: (data: Experience[]) => void;
}

export const ExperienceTab = ({ data, onUpdate }: ExperienceTabProps) => {
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      isCurrentJob: false,
      description: "",
      achievements: [""]
    };
    onUpdate([...data, newExperience]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onUpdate(data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id: string) => {
    onUpdate(data.filter(exp => exp.id !== id));
  };

  const addAchievement = (expId: string) => {
    updateExperience(expId, 'achievements', 
      [...data.find(exp => exp.id === expId)?.achievements || [], ""]);
  };

  const updateAchievement = (expId: string, index: number, value: string) => {
    const experience = data.find(exp => exp.id === expId);
    if (experience) {
      const newAchievements = [...experience.achievements];
      newAchievements[index] = value;
      updateExperience(expId, 'achievements', newAchievements);
    }
  };

  const removeAchievement = (expId: string, index: number) => {
    const experience = data.find(exp => exp.id === expId);
    if (experience) {
      const newAchievements = experience.achievements.filter((_, i) => i !== index);
      updateExperience(expId, 'achievements', newAchievements);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Work Experience</h2>
          <p className="text-muted-foreground">Add your professional work experience</p>
        </div>
        <Button onClick={addExperience} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Experience
        </Button>
      </div>

      {data.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No work experience added yet</p>
            <Button onClick={addExperience} variant="outline">
              Add Your First Experience
            </Button>
          </CardContent>
        </Card>
      ) : (
        data.map((experience, index) => (
          <Card key={experience.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Experience #{index + 1}</CardTitle>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => removeExperience(experience.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Job Title *</Label>
                  <Input
                    placeholder="Senior Software Engineer"
                    value={experience.jobTitle}
                    onChange={(e) => updateExperience(experience.id, 'jobTitle', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Company *</Label>
                  <Input
                    placeholder="Tech Company Inc."
                    value={experience.company}
                    onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    placeholder="San Francisco, CA"
                    value={experience.location}
                    onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Input
                    type="month"
                    value={experience.startDate}
                    onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                  />
                </div>
                {!experience.isCurrentJob && (
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={experience.endDate}
                      onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                    />
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`current-${experience.id}`}
                    checked={experience.isCurrentJob}
                    onCheckedChange={(checked) => 
                      updateExperience(experience.id, 'isCurrentJob', checked)
                    }
                  />
                  <Label htmlFor={`current-${experience.id}`}>Currently working here</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Job Description</Label>
                <Textarea
                  placeholder="Describe your role and responsibilities..."
                  value={experience.description}
                  onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Key Achievements</Label>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => addAchievement(experience.id)}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Achievement
                  </Button>
                </div>
                {experience.achievements.map((achievement, achIndex) => (
                  <div key={achIndex} className="flex gap-2">
                    <Input
                      placeholder="• Increased team productivity by 40% through process optimization"
                      value={achievement}
                      onChange={(e) => updateAchievement(experience.id, achIndex, e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeAchievement(experience.id, achIndex)}
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
