
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";

interface ResumePreviewProps {
  resumeData: any;
  onBack: () => void;
  onDownload: () => void;
}

export const ResumePreview = ({ resumeData, onBack, onDownload }: ResumePreviewProps) => {
  const { personalInfo, experience, education, skills, projects } = resumeData;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="sticky top-0 bg-white dark:bg-gray-800 border-b shadow-sm z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button onClick={onBack} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Editor
          </Button>
          <h1 className="text-lg font-semibold">Resume Preview</h1>
          <Button onClick={onDownload} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8 space-y-6">
            {/* Header */}
            <div className="text-center border-b pb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {personalInfo.fullName || "Your Name"}
              </h1>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                {personalInfo.email && <span>{personalInfo.email}</span>}
                {personalInfo.phone && <span>{personalInfo.phone}</span>}
                {personalInfo.location && <span>{personalInfo.location}</span>}
              </div>
              {(personalInfo.website || personalInfo.linkedin) && (
                <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-600 mt-2">
                  {personalInfo.website && <span>{personalInfo.website}</span>}
                  {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
                </div>
              )}
            </div>

            {/* Professional Summary */}
            {personalInfo.professionalSummary && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-blue-500 pb-1">
                  Professional Summary
                </h2>
                <p className="text-gray-700 leading-relaxed">{personalInfo.professionalSummary}</p>
              </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-blue-500 pb-1">
                  Work Experience
                </h2>
                <div className="space-y-4">
                  {experience.map((exp: any, index: number) => (
                    <div key={index} className="border-l-2 border-gray-200 pl-4">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-lg font-medium text-gray-900">{exp.jobTitle}</h3>
                        <span className="text-sm text-gray-600">
                          {exp.startDate} - {exp.isCurrentJob ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      <p className="text-md text-blue-600 mb-1">{exp.company}</p>
                      {exp.location && <p className="text-sm text-gray-600 mb-2">{exp.location}</p>}
                      {exp.description && <p className="text-gray-700 mb-2">{exp.description}</p>}
                      {exp.achievements.length > 0 && exp.achievements[0] && (
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          {exp.achievements.filter((ach: string) => ach.trim()).map((achievement: string, achIndex: number) => (
                            <li key={achIndex}>{achievement}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-blue-500 pb-1">
                  Education
                </h2>
                <div className="space-y-3">
                  {education.map((edu: any, index: number) => (
                    <div key={index}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{edu.degree}</h3>
                          <p className="text-blue-600">{edu.institution}</p>
                          {edu.location && <p className="text-sm text-gray-600">{edu.location}</p>}
                        </div>
                        <div className="text-right">
                          {edu.graduationDate && <p className="text-sm text-gray-600">{edu.graduationDate}</p>}
                          {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                        </div>
                      </div>
                      {edu.honors && <p className="text-sm text-gray-700 mt-1">{edu.honors}</p>}
                      {edu.relevantCoursework.length > 0 && edu.relevantCoursework[0] && (
                        <p className="text-sm text-gray-700 mt-1">
                          <span className="font-medium">Relevant Coursework: </span>
                          {edu.relevantCoursework.filter((course: string) => course.trim()).join(', ')}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {(skills.technical.length > 0 || skills.soft.length > 0 || skills.languages.length > 0) && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-blue-500 pb-1">
                  Skills
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {skills.technical.length > 0 && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Technical Skills</h3>
                      <p className="text-sm text-gray-700">{skills.technical.join(', ')}</p>
                    </div>
                  )}
                  {skills.soft.length > 0 && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Soft Skills</h3>
                      <p className="text-sm text-gray-700">{skills.soft.join(', ')}</p>
                    </div>
                  )}
                  {skills.languages.length > 0 && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Languages</h3>
                      <p className="text-sm text-gray-700">{skills.languages.join(', ')}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-blue-500 pb-1">
                  Projects
                </h2>
                <div className="space-y-4">
                  {projects.map((project: any, index: number) => (
                    <div key={index} className="border-l-2 border-gray-200 pl-4">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                        <span className="text-sm text-gray-600">
                          {project.startDate} - {project.endDate}
                        </span>
                      </div>
                      {project.technologies.length > 0 && (
                        <p className="text-sm text-blue-600 mb-2">{project.technologies.join(', ')}</p>
                      )}
                      {project.description && <p className="text-gray-700 mb-2">{project.description}</p>}
                      {project.keyFeatures.length > 0 && project.keyFeatures[0] && (
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          {project.keyFeatures.filter((feature: string) => feature.trim()).map((feature: string, featureIndex: number) => (
                            <li key={featureIndex}>{feature}</li>
                          ))}
                        </ul>
                      )}
                      <div className="flex gap-4 mt-2 text-sm">
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            Live Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
