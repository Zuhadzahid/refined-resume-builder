
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Eye, Download, Save, Moon, Sun } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalInfoTab } from "@/components/resume/PersonalInfoTab";
import { ExperienceTab } from "@/components/resume/ExperienceTab";
import { EducationTab } from "@/components/resume/EducationTab";
import { SkillsTab } from "@/components/resume/SkillsTab";
import { ProjectsTab } from "@/components/resume/ProjectsTab";
import { ResumePreview } from "@/components/resume/ResumePreview";

const Index = () => {
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      professionalSummary: ""
    },
    experience: [],
    education: [],
    skills: {
      technical: [],
      soft: [],
      languages: []
    },
    projects: []
  });

  const handleSave = () => {
    // Auto-save functionality - in a real app, this would save to database
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    toast({
      title: "Resume Saved",
      description: "Your resume has been saved successfully.",
    });
  };

  const handleDownloadPDF = () => {
    toast({
      title: "PDF Download",
      description: "PDF download functionality will be implemented with backend integration.",
    });
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const updateResumeData = (section: string, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  if (showPreview) {
    return (
      <ResumePreview 
        resumeData={resumeData} 
        onBack={() => setShowPreview(false)}
        onDownload={handleDownloadPDF}
      />
    );
  }

  return (
    <div className={`min-h-screen bg-background transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">ATS Resume Builder</h1>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={toggleTheme}
              size="sm"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowPreview(true)}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              Show Preview
            </Button>
            <Button 
              variant="outline" 
              onClick={handleDownloadPDF}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-card rounded-lg shadow-lg border">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-muted rounded-t-lg">
              <TabsTrigger value="personal" className="text-sm">Personal Info</TabsTrigger>
              <TabsTrigger value="experience" className="text-sm">Experience</TabsTrigger>
              <TabsTrigger value="education" className="text-sm">Education</TabsTrigger>
              <TabsTrigger value="skills" className="text-sm">Skills</TabsTrigger>
              <TabsTrigger value="projects" className="text-sm">Projects</TabsTrigger>
            </TabsList>

            <div className="p-6">
              <TabsContent value="personal">
                <PersonalInfoTab 
                  data={resumeData.personalInfo}
                  onUpdate={(data) => updateResumeData('personalInfo', data)}
                />
              </TabsContent>

              <TabsContent value="experience">
                <ExperienceTab 
                  data={resumeData.experience}
                  onUpdate={(data) => updateResumeData('experience', data)}
                />
              </TabsContent>

              <TabsContent value="education">
                <EducationTab 
                  data={resumeData.education}
                  onUpdate={(data) => updateResumeData('education', data)}
                />
              </TabsContent>

              <TabsContent value="skills">
                <SkillsTab 
                  data={resumeData.skills}
                  onUpdate={(data) => updateResumeData('skills', data)}
                />
              </TabsContent>

              <TabsContent value="projects">
                <ProjectsTab 
                  data={resumeData.projects}
                  onUpdate={(data) => updateResumeData('projects', data)}
                />
              </TabsContent>
            </div>

            {/* Save Button at Bottom */}
            <div className="border-t p-4 bg-muted/50 rounded-b-lg">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Changes are auto-saved • Last saved: just now
                </p>
                <Button onClick={handleSave} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Resume
                </Button>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;
