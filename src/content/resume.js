import { projects } from "./projects";

const skill3 = projects.find((project) => project.slug === "skill3");

export const resume = {
  education: {
    institution: "Asia Pacific University of Technology & Innovation",
    abbreviation: "APU",
    program: "Software Engineering",
    status: "Year 3 student",
    current: "Year 3 Software Engineering student at Asia Pacific University.",
  },
  experience: [
    {
      id: "razer-software-engineering-intern",
      role: "Software Engineering Intern",
      company: "Razer Malaysia",
      startDate: "2025-04-28",
      endDate: "2025-09-12",
      dateLabel: "April 28, 2025 – September 12, 2025",
      description: "Contributed to maintaining critical company internal websites and spearheaded groundbreaking research in automation testing frameworks. As one of the pioneering team members, I played a crucial role in advancing the company's testing infrastructure and improving development workflows.",
      highlights: [
        "Maintained and enhanced internal web applications ensuring optimal performance and reliability.",
        "Pioneered automation testing research, becoming one of the first team members to implement modern testing frameworks.",
        "Collaborated with senior engineers to establish best practices for automated testing workflows.",
      ],
      technologies: ["Jenkins", "AWS CloudWatch", ".NET", "Playwright", "MySQL"],
      image: {
        src: "/experience/razer-internship.jpg",
        alt: "Razer Malaysia internship",
      },
      link: "https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.linkedin.com%2Fposts%2Fheng-jun-yong-815455349_razer-internship-softwareengineering-activity-7376271775535484930-bSkz%3Futm_source%3Dshare%26utm_medium%3Dmember_desktop%26rcm%3DACoAAFcY-1EBpJovRjnKxnAk0EW3enccJRkR-h8%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExNnhFTmpZUFVTQVlmb0t2NwEep079nhqC55fL2CwfzMou435TLnBVxjopqGDLNFHujP8M6ttDmpX-rsrWQKk_aem_Ao15Vsg2JtkgSTqiC6tZHg&h=AT3vV1RZv57DZwvkJAqZqm7oo7n0q9R8wL4HjyAen-_C_nCCImipPYOafyOuW6W4onV6MJxyGWZIbaW5w4Dc15VxTziv95ni429jM63jfaMrctTwTvBQTCH3Ya4W53_aBa5OTvzh90iJCYiEBFylDA",
    },
  ],
  skills: [
    { id: "development", label: "Development", items: ["Next.js", "TypeScript", ".NET"] },
    { id: "cloud", label: "Cloud", items: ["AWS ECS", "AWS Bedrock", "AWS CloudWatch"] },
    { id: "testing", label: "Testing", items: ["Playwright"] },
    { id: "data", label: "Data", items: ["MySQL"] },
    { id: "tools-platforms", label: "Tools & platforms", items: ["Jenkins", "Figma", "Maschain"] },
  ],
  achievements: skill3?.achievement
    ? [{ id: "skill3-buildstation-2024", project: skill3.title, ...skill3.achievement }]
    : [],
};
