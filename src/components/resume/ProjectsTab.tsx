
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, ExternalLink } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  startDate: string;
  endDate: string;
  keyFeatures: string[];
}

interface ProjectsTabProps {
  data: Project[];
  onUpdate: (data: Project[]) => void;
}

export const ProjectsTab = ({ data, onUpdate }: ProjectsTabProps) => {
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
      liveUrl: "",
      githubUrl: "",
      startDate: "",
      endDate: "",
      keyFeatures: [""]
    };
    onUpdate([...data, newProject]);
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    onUpdate(data.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    ));
  };

  const removeProject = (id: string) => {
    onUpdate(data.filter(project => project.id !== id));
  };

  const addTechnology = (projectId: string, tech: string) => {
    if (tech.trim()) {
      const project = data.find(p => p.id === projectId);
      if (project) {
        updateProject(projectId, 'technologies', [...project.technologies, tech.trim()]);
      }
    }
  };

  const removeTechnology = (projectId: string, index: number) => {
    const project = data.find(p => p.id === projectId);
    if (project) {
      updateProject(projectId, 'technologies', 
        project.technologies.filter((_, i) => i !== index));
    }
  };

  const addFeature = (projectId: string) => {
    updateProject(projectId, 'keyFeatures', 
      [...data.find(p => p.id === projectId)?.keyFeatures || [], ""]);
  };

  const updateFeature = (projectId: string, index: number, value: string) => {
    const project = data.find(p => p.id === projectId);
    if (project) {
      const newFeatures = [...project.keyFeatures];
      newFeatures[index] = value;
      updateProject(projectId, 'keyFeatures', newFeatures);
    }
  };

  const removeFeature = (projectId: string, index: number) => {
    const project = data.find(p => p.id === projectId);
    if (project) {
      const newFeatures = project.keyFeatures.filter((_, i) => i !== index);
      updateProject(projectId, 'keyFeatures', newFeatures);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Projects</h2>
          <p className="text-muted-foreground">Showcase your personal and professional projects</p>
        </div>
        <Button onClick={addProject} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      </div>

      {data.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No projects added yet</p>
            <Button onClick={addProject} variant="outline">
              Add Your First Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        data.map((project, index) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Project #{index + 1}</CardTitle>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => removeProject(project.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Project Name *</Label>
                  <Input
                    placeholder="E-commerce Platform"
                    value={project.name}
                    onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Technologies Used</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="React, Node.js, MongoDB"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addTechnology(project.id, e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs flex items-center gap-1"
                      >
                        {tech}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => removeTechnology(project.id, techIndex)}
                        />
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={project.startDate}
                    onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={project.endDate}
                    onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Live URL</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="https://project-demo.com"
                      value={project.liveUrl}
                      onChange={(e) => updateProject(project.id, 'liveUrl', e.target.value)}
                    />
                    {project.liveUrl && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(project.liveUrl, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>GitHub URL</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="https://github.com/username/project"
                      value={project.githubUrl}
                      onChange={(e) => updateProject(project.id, 'githubUrl', e.target.value)}
                    />
                    {project.githubUrl && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(project.githubUrl, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Project Description *</Label>
                <Textarea
                  placeholder="Describe what this project does, the problem it solves, and your role in developing it..."
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Key Features</Label>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => addFeature(project.id)}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Feature
                  </Button>
                </div>
                {project.keyFeatures.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex gap-2">
                    <Input
                      placeholder="• Real-time chat functionality"
                      value={feature}
                      onChange={(e) => updateFeature(project.id, featureIndex, e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFeature(project.id, featureIndex)}
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
