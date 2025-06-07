
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Skills {
  technical: string[];
  soft: string[];
  languages: string[];
}

interface SkillsTabProps {
  data: Skills;
  onUpdate: (data: Skills) => void;
}

export const SkillsTab = ({ data, onUpdate }: SkillsTabProps) => {
  const [newSkill, setNewSkill] = useState({ technical: "", soft: "", languages: "" });

  const addSkill = (category: keyof Skills) => {
    if (newSkill[category].trim()) {
      onUpdate({
        ...data,
        [category]: [...data[category], newSkill[category].trim()]
      });
      setNewSkill({ ...newSkill, [category]: "" });
    }
  };

  const removeSkill = (category: keyof Skills, index: number) => {
    onUpdate({
      ...data,
      [category]: data[category].filter((_, i) => i !== index)
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent, category: keyof Skills) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(category);
    }
  };

  const skillCategories = [
    {
      key: 'technical' as keyof Skills,
      title: 'Technical Skills',
      description: 'Programming languages, frameworks, tools, and technologies',
      placeholder: 'e.g., JavaScript, React, Python, AWS'
    },
    {
      key: 'soft' as keyof Skills,
      title: 'Soft Skills',
      description: 'Personal attributes and interpersonal skills',
      placeholder: 'e.g., Leadership, Communication, Problem Solving'
    },
    {
      key: 'languages' as keyof Skills,
      title: 'Languages',
      description: 'Spoken languages and proficiency levels',
      placeholder: 'e.g., English (Native), Spanish (Fluent)'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Skills</h2>
        <p className="text-muted-foreground">Add your technical and soft skills</p>
      </div>

      {skillCategories.map((category) => (
        <Card key={category.key}>
          <CardHeader>
            <CardTitle className="text-lg">{category.title}</CardTitle>
            <CardDescription>{category.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder={category.placeholder}
                value={newSkill[category.key]}
                onChange={(e) => setNewSkill({ ...newSkill, [category.key]: e.target.value })}
                onKeyPress={(e) => handleKeyPress(e, category.key)}
              />
              <Button 
                onClick={() => addSkill(category.key)}
                disabled={!newSkill[category.key].trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {data[category.key].map((skill, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-destructive" 
                    onClick={() => removeSkill(category.key, index)}
                  />
                </Badge>
              ))}
            </div>

            {data[category.key].length === 0 && (
              <p className="text-sm text-muted-foreground italic">
                No {category.title.toLowerCase()} added yet
              </p>
            )}
          </CardContent>
        </Card>
      ))}

      <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                ATS Optimization Tip
              </p>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Include skills that match the job description exactly as written. Use industry-standard terms and avoid abbreviations when possible.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
