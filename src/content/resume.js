import { projects } from "./projects";

const quietly = projects.find((project) => project.slug === "quietly");
const easeProp = projects.find((project) => project.slug === "easeprop");
const devMatch = projects.find((project) => project.slug === "devmatch");

export const resume = {
  education: [
    { id: "apu", institution: "Asia Pacific University of Technology & Innovation", abbreviation: "APU", period: "2023 - 2026", program: "Bachelor's in Software Engineering", cgpa: "3.6" },
    { id: "dmu", institution: "De Montfort University", abbreviation: "DMU", period: "2023 - 2026", program: "Bachelor's in Software Engineering", cgpa: "3.6" },
  ],
  experience: [
    {
      id: "razer-software-engineering-intern",
      role: "Software Engineering Intern",
      company: "Razer",
      startDate: "2025-04-01",
      endDate: "2025-09-30",
      dateLabel: "April 2025 - September 2025",
      highlights: [
        "Developed and enhanced .NET web application features through change requests and bug fixes, including front-end and back-end behaviour, server-side validation, and IPv4, IPv6, and CIDR validation.",
        "Supported manual and automated testing: tracked defects, verified fixes, and worked with developers and UAT users to meet requirements.",
        "Implemented AWS X-Ray observability for .NET applications and used CloudWatch to troubleshoot tracing, deployment, and application issues.",
        "Supported releases and production deployments through deployment verification, root-cause analysis, hotfix delivery, and Git branch and merge-conflict resolution.",
      ],
      technologies: [".NET", "AWS X-Ray", "CloudWatch", "Git", "Playwright"],
      image: { src: "/experience/razer-internship.jpg", alt: "Razer internship" },
      link: "https://www.linkedin.com/posts/heng-jun-yong-815455349_razer-internship-softwareengineering-activity-7376271775535484930-bSkz",
    },
  ],
  skills: [
    { id: "languages", label: "Languages", items: ["C#", "Java", "TypeScript", "SQL", "Dart", "Python", "C++"] },
    { id: "frameworks", label: "Frameworks & technologies", items: ["ASP.NET", "Next.js", "Flutter", "Firebase"] },
    { id: "cloud", label: "Cloud", items: ["AWS S3", "RDS", "Cognito", "X-Ray", "CloudWatch", "Bedrock", "SNS", "SQS", "SES"] },
    { id: "devops-testing", label: "DevOps & testing", items: ["Git", "GitHub", "Jenkins", "GitHub Actions", "Playwright"] },
    { id: "concepts", label: "Concepts", items: ["OOP", "SDLC", "Agile", "CI/CD"] },
  ],
  selectedProjects: [quietly, easeProp].filter(Boolean),
  achievements: [
    { id: "quietly-fyp-showcase", title: "1st Runner-Up, Final Year Project Showcase", description: "Recognised for Quietly among more than 100 Software Engineering students." },
    { id: "great-ai-hackathon-final-round", title: "Final Round, Great AI Hackathon 2025", description: "Advanced to the final round as team leader for StudyHub." },
    ...(devMatch ? [{ id: "devmatch-third-place", title: "Third Place, DevMatch Hackathon 2024", description: "Contributed front-end development to the third-place team." }] : []),
  ],
  languages: ["Chinese (Native)", "English (Native)", "Malay (Advanced)", "Cantonese (Advanced)"],
};
