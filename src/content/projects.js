export const projects = [
  {
    slug: "quietly",
    title: "Quietly",
    eyebrow: "Final Year Project",
    description: "A mobile application that automates Do Not Disturb behaviour with configurable rules for time, location, calendar events, activity, and user-defined profiles.",
    highlights: [
      "Built intelligent notification management with priority app alerts, emergency-keyword bypass, and rule prioritisation.",
      "Placed 1st Runner-Up at the university Final Year Project Showcase among 100+ Software Engineering students.",
    ],
    featuredTech: ["Flutter", "Mobile Development"],
    tech: ["Flutter", "Mobile Development"],
    visualLabel: "FYP 2026",
    links: {
      github: "https://github.com/fujianmian/DND",
    },
  },
  {
    slug: "easeprop",
    title: "EaseProp",
    eyebrow: "Property Management Web Application",
    description: "A property management web application integrated with AWS services for application workflows, messaging, identity, and secure configuration.",
    highlights: [
      "Integrated Amazon S3, RDS, SNS, SQS, SES, Cognito, and Secrets Manager.",
      "Implemented AWS X-Ray and CloudWatch for continuous monitoring, error tracking, and automated alerting.",
    ],
    featuredTech: ["ASP.NET", "AWS", "CloudWatch"],
    tech: ["ASP.NET", "AWS S3", "RDS", "Cognito", "X-Ray", "CloudWatch"],
    visualLabel: "AWS / ASP.NET",
    links: {
      github: "https://github.com/kairui1012/SuperNiubi_AWS_PROJECT",
    },
  },
  {
    slug: "studyhub",
    title: "StudyHub",
    eyebrow: "Great AI Hackathon 2025 · Team Leader",
    description: "An AI-powered learning platform created during the Great AI Hackathon, with a cloud-backed architecture for generating learning content.",
    highlights: [
      "Led a four-member team, coordinated development work, and owned the backend architecture.",
      "Integrated Cognito, RDS, S3, Route 53, and Amazon Bedrock; developed and debugged the AI learning assistant.",
    ],
    featuredTech: ["Next.js", "AWS", "Amazon Bedrock"],
    tech: ["Next.js", "AWS Cognito", "RDS", "S3", "Route 53", "Amazon Bedrock"],
    image: { src: "/projects/studyhub.jpg", alt: "StudyHub project interface", width: 2528, height: 1463 },
    links: {
      github: "https://github.com/fujianmian/TrialGreatHack",
      demoVideo: "https://youtu.be/px2lVRKZ2GU",
    },
  },
  {
    slug: "devmatch",
    title: "DevMatch Hackathon",
    eyebrow: "2024 · Front-End Developer",
    description: "A hackathon project focused on designing and developing responsive, usable user interfaces with Next.js.",
    highlights: [
      "Contributed responsive front-end implementation with a strong focus on usability and user experience.",
      "Helped the team secure third place in the hackathon.",
    ],
    featuredTech: ["Next.js", "UI Development"],
    tech: ["Next.js", "Responsive Design", "User Experience"],
    image: { src: "/projects/skill3.jpg", alt: "DevMatch hackathon project interface", width: 2557, height: 1459 },
  },
  {
    slug: "google-workspace-attendance",
    title: "Attendance System",
    eyebrow: "Google Workspace Hackathon 2024 · Full-Stack Developer",
    description: "An attendance system with geographical position tracking, developed with Google Apps Script and Google Forms.",
    highlights: ["Combined Google Workspace tools to support location-aware attendance workflows."],
    featuredTech: ["Google Apps Script", "Google Forms"],
    tech: ["Google Apps Script", "Google Forms", "Geolocation"],
    visualLabel: "GOOGLE WORKSPACE",
  },
];
