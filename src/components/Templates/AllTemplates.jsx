import React from 'react';
import { useSelector } from 'react-redux';
import DOMPurify from 'dompurify';



// Shared Components
const ResumeSection = ({ title, children, className }) => (
  <section className="mb-6">
    <h2 className={`uppercase tracking-wider mb-3 border-b-2 border-gray-400 pb-1 ${className}`}>
      {title}
    </h2>
    {children}
  </section>
);


export const SafeHTML = ({ html }) => (
  <div
    className="safe-html-content"
    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
  />
);

const ListItem = ({ children }) => (
  <li className="mb-1">{children}</li>
);

// Shared styles
const sharedStyles = `
  .safe-html-content ul, .safe-html-content ol {
    list-style-position: inside;
    padding-right:1em;

  }
  .safe-html-content ul {
    list-style-type: disc;
  }
  .safe-html-content ol {
    list-style-type: decimal;
  }
  .safe-html-content li {
    margin-bottom: 0.5em;
  }
  .safe-html-content p {
    margin-bottom: 0.5em;
  }
`;

// Template 1

export const Template1 = ({ data, formData }) => {

  const {description} = useSelector((state) => state.resume);
  console.log("🚀 ~ Template1 ~ description:", description)



  const resume = {
    personalInfo: { ...data?.personalInfo, ...formData?.personalInfo },
    experience: formData?.experience || data?.experience || [],
    education: formData?.education || data?.education || [],
    projects: formData?.projects || data?.projects || [],
    technicalSkills: { ...data?.technicalSkills, ...formData?.technicalSkills },
    achievementsAndCertifications: formData?.achievementsAndCertifications || data?.achievementsAndCertifications || []
  };

  console.log(resume);

  return (
    <div className="p-6 bg-white overflow-y-auto h-screen">
    
      <style jsx="true" global="true" >{`
      @import url('https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        body {
          font-family: 'Tinos', sans-serif;
          color: #000;
          line-height: 1.2;
        }
        .safe-html-content ul {
          list-style-type: disc;
          padding-left: 1.5em;
        }
        .safe-html-content li {
          margin-bottom: 0.25em;
        }
      `}</style>
      <div id='resume-template-2' className="max-w-4xl resume-content mx-auto">
        <header className="text-center pb-4 mb-4">
          <h1 className="text-3xl font-bold mb-1">{resume.personalInfo.name}</h1>
          <div className="text-sm flex justify-center items-center flex-wrap gap-2">
            <p>{resume.personalInfo.phone}</p>
            <p>•</p>
            <p>{resume.personalInfo.email}</p>
            <p>•</p>
            <a href={resume.personalInfo.linkedin} className="hover:underline">linkedin.com</a>
            <p>•</p>
            <a href={resume.personalInfo.github} className=" hover:underline">github.com</a>
            <p>•</p>
            <a href={resume.personalInfo.website} className=" hover:underline">vanshchavda.me</a>
          </div>
        </header>


        <ResumeSection title="Work Experience">
          {resume?.experience && resume?.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-bold text-lg">{exp?.company} - {exp?.title}</h3>
              <p className="text-sm italic mb-2">{exp?.location} ({exp?.duration})</p>
              <SafeHTML html={exp?.description} />
            </div>
          ))}
        </ResumeSection>


        <ResumeSection title="Education">
          {resume?.education?.map((edu, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold">{edu?.institution}</h3>
                <p className="text-sm">{edu?.duration}</p>
              </div>
              <p>{edu?.degree}</p>
              <p className="text-sm">{edu?.location}</p>
            </div>
          ))}
        </ResumeSection>

        <ResumeSection title="Projects">
          {resume?.projects.map((proj, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold">{proj?.name}</h3>
                <p className="text-sm">
                  <a href={proj?.link} className="hover:underline">View</a>
                </p>
              </div>
              <p className="text-sm mb-1">
                <strong>Tech Stack:</strong> {proj?.technologies?.join(', ')}
              </p>
              <div className="text-sm">
                <SafeHTML html={proj?.description} />
              </div>
            </div>
          ))}
        </ResumeSection>

        <ResumeSection title="Technical Skills">
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(resume.technicalSkills).map(([category, skills]) => (
              <div key={category}>
                <h3 className="font-bold capitalize">{category}:</h3>
                <p className="text-sm">{skills.join(', ')}</p>
              </div>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection title="Achievements and Certifications">
          <ul className="list-disc pl-5 text-sm">
            {resume?.achievementsAndCertifications?.map((ach, index) => (
              <ListItem key={index}>
                <span className="font-bold">{ach?.title}</span>
                {ach?.year && ` – ${ach.year}`}
                {ach?.description && <span> – <SafeHTML html={ach?.description} /></span>}
              </ListItem>
            ))}
          </ul>
        </ResumeSection>
      </div>
    </div>
  )
};

// Template 2
export const Template2 = ({ data, formData }) => {
  const resume = {
    personalInfo: { ...data?.personalInfo, ...formData?.personalInfo },
    experience: formData?.experience || data?.experience || [],
    projects: formData?.projects || data?.projects || [],
    technicalSkills: { ...data?.technicalSkills, ...formData?.technicalSkills },
    education: formData?.education || data?.education || [],
    achievementsAndCertifications: formData?.achievementsAndCertifications || data?.achievementsAndCertifications || []
  };




  return (
    <div className="p-8 bg-white overflow-y-auto h-screen">
      <style jsx="true" global="true" >{`
        ${sharedStyles}
        body {
          font-family: 'Arial', sans-serif;
          color: #000;
          line-height: 1.6;
          
        }
      `}</style>
      <div className="max-w-4xl  mx-auto space-y-6">
        <header className="text-center border-black pb-4 mb-6">
          <h1 className="text-4xl font-bold mb-2">{resume.personalInfo.name}</h1>
          <p className="text-2xl mb-4">{resume.personalInfo.title}</p>
          <div className="text-sm">
            <p>{resume.personalInfo.phone} | {resume.personalInfo.email}</p>
            <p>
              <a href={resume.personalInfo.linkedin} className="hover:underline">LinkedIn</a> |
              <a href={resume.personalInfo.github} className="hover:underline ml-2">GitHub</a> |
              <a href={resume.personalInfo.website} className="hover:underline ml-2">Portfolio</a>
            </p>
          </div>
        </header>

        <ResumeSection title="Professional Experience">
          {resume.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-bold text-lg">{exp.company} - {exp.title}</h3>
              <p className="text-sm italic mb-2">{exp.location} ({exp.duration})</p>
              <SafeHTML html={exp.description} />
            </div>
          ))}
        </ResumeSection>

        <ResumeSection title="Technical Projects">
          {resume.projects.map((proj, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-bold text-lg">{proj.name}</h3>
              <p className="text-sm mb-1">
                <strong>Tech Stack:</strong> {proj.technologies.join(', ')}
              </p>
              <p className="text-sm mb-2">
                <strong>Link:</strong> <a href={proj.link} className="hover:underline">{proj.link}</a>
              </p>
              <SafeHTML html={proj.description} />
            </div>
          ))}
        </ResumeSection>

        <ResumeSection title="Skills & Technologies">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <h3 className="font-bold">Languages</h3>
              <p>{resume.technicalSkills.languages.join(', ')}</p>
            </div>
            <div>
              <h3 className="font-bold">Frameworks</h3>
              <p>{resume.technicalSkills.frameworks.join(', ')}</p>
            </div>
            <div>
              <h3 className="font-bold">Databases</h3>
              <p>{resume.technicalSkills.backend.join(', ')}</p>
            </div>
            <div>
              <h3 className="font-bold">Tools</h3>
              <p>{resume.technicalSkills.tools.join(', ')}</p>
            </div>
          </div>
        </ResumeSection>

        <ResumeSection title="Education">
          {resume.education.map((edu, index) => (
            <div key={index} className="mb-2">
              <h3 className="font-bold">{edu.institution}</h3>
              <p>{edu.degree}</p>
              <p className="text-sm">{edu.location}, {edu.duration}</p>
            </div>
          ))}
        </ResumeSection>

        <ResumeSection title="Achievements & Certifications">
          <ul className="list-disc pl-5">
            {resume.achievementsAndCertifications.map((ach, index) => (
              <ListItem key={index}>
                <span className="font-bold">{ach.title}</span>
                {ach.year && ` (${ach.year})`}
                <SafeHTML html={ach.description} />
              </ListItem>
            ))}
          </ul>
        </ResumeSection>
      </div>
    </div>
  );
};

// Template 3
export const Template3 = ({ data, formData }) => {
  const { description } = useSelector((state) => state.resume);

  const resume = {
    personalInfo: { ...data?.personalInfo, ...formData?.personalInfo },
    experience: formData?.experience || data?.experience || [],
    projects: formData?.projects || data?.projects || [],
    technicalSkills: { ...data?.technicalSkills, ...formData?.technicalSkills },
    education: formData?.education || data?.education || [],
    achievementsAndCertifications: formData?.achievementsAndCertifications || data?.achievementsAndCertifications || []
  };

  return (
    <div className="p-8 bg-white overflow-y-auto h-screen">
      <style jsx="true" global="true" >{`
        ${sharedStyles}
        body {
          font-family: 'Helvetica', 'Arial', sans-serif;
          color: #000;
          line-height: 1.6;
        }
      `}</style>
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">{resume.personalInfo.name}</h1>
          <p className="text-xl mb-4">{resume.personalInfo.title}</p>
          <div className="flex justify-center items-center gap-2 text-sm">
            <p>{resume.personalInfo.phone}</p>•
            <p>{resume.personalInfo.email}</p> •
            <a href={resume.personalInfo.linkedin} className="hover:underline">LinkedIn</a>•
            <a href={resume.personalInfo.github} className="hover:underline">GitHub</a>
          </div>
        </header>

        <ResumeSection title="Work Experience">
          {resume.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-lg">{exp.title}</h3>
                <span className="text-sm">{exp.duration}</span>
              </div>
              <p className="text-md italic mb-2">{exp.company}, {exp.location}</p>
              <div className="mt-2">
                <SafeHTML html={exp.description} />
              </div>
            </div>
          ))}
        </ResumeSection>

        <ResumeSection title="Projects">
          {resume.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-bold text-lg">
                {project.name}
                {project.link && (
                  <a href={project.link} className="ml-2 float-end text-sm hover:underline">
                    View
                  </a>
                )}
              </h3>
              <p className="text-sm mb-2">Technologies: {project.technologies.join(', ')}</p>
              {description ? <SafeHTML html={project.description} /> : <p>{project.description}</p>}
            </div>
          ))}
        </ResumeSection>

        <ResumeSection title="Skills">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <h3 className="font-bold mb-1">Languages</h3>
              <p>{resume.technicalSkills?.languages?.join(', ')}</p>
            </div>
            <div>
              <h3 className="font-bold mb-1">Frameworks</h3>
              <p>{resume.technicalSkills?.frameworks?.join(', ')}</p>
            </div>
            <div>
              <h3 className="font-bold mb-1">Backend & Databases</h3>
              <p>{resume.technicalSkills?.backend?.join(', ')}</p>
            </div>
            <div>
              <h3 className="font-bold mb-1">Tools</h3>
              <p>{resume.technicalSkills?.tools?.join(', ')}</p>
            </div>
          </div>
        </ResumeSection>

        <ResumeSection title="Education">
          {resume.education.map((edu, index) => (
            <div key={index} className="mb-2">
              <h3 className="font-bold">{edu.institution}</h3>
              <p>{edu.degree}</p>
              <p className="text-sm">{edu.location}, {edu.duration}</p>
            </div>
          ))}
        </ResumeSection>

        <ResumeSection title="Achievements & Certifications">
          <ul className="list-disc pl-5">
            {resume.achievementsAndCertifications.map((achievement, index) => (
              <ListItem key={index}>
                <span className="font-bold">{achievement.title}</span>
                {achievement.year && ` (${achievement.year})`}
                {achievement.description && `: ${achievement.description}`}
              </ListItem>
            ))}
          </ul>
        </ResumeSection>
      </div>
    </div>
  );
};


// Shared utility functions
const formatDate = (date) => {
  if (!date) return '';
  const options = { year: 'numeric', month: 'long' };
  return new Date(date).toLocaleDateString('en-US', options);
};


// Export all templates



